"use strict";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createError = require("../utils/createError");
const { default: axios } = require("axios");
const { createRefreshTokenService, refreshTokenCheck } = require("../service");
const {
    SECRET_KEY,
    REFRESH_TOKEN_SECRET,
    user_url,
} = require("../config/env-config");
const { logger } = require("../logs");

// Create new account
const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password, isAdmin } = req.body;
        const existenceCheck = await axios.post(user_url.existenceCheck, { email });

        if (existenceCheck.data.status === 201) {
            return res
                .status(200)
                .send(
                    createError(409, "The email has already been registered!")
                );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await axios.post(user_url.create, {
            first_name,
            last_name,
            email,
            role: isAdmin ? "admin" : "client",
            password: hashedPassword,
        });

        return res.status(200).send({
            message: "Your registration has been created successfully",
        });
    } catch (error) {
        logger.error("Error: ", error.message, error.stack);
        return res
            .status(500)
            .send(
                createError(
                    500,
                    "An error occurred during registration: " + error.message,
                    error.stack
                )
            );
    }
};

const createToken = (user, SECRET_KEY, expiresIn) => {
    const token = jwt.sign(
        {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
        },
        SECRET_KEY,
        { expiresIn: expiresIn }
    );
    return token;
};

// Log in account
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existenceCheck = await axios.post(user_url.existenceCheck, { email });

        if (existenceCheck.data.status === 404) {
            return res
                .status(200)
                .send(createError(409, "The email doesn't exist!"));
        }
        const user = existenceCheck.data.data;
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res
                .status(200)
                .send(createError(403, "The password was wrong !"));
        }

        const isExisted = await refreshTokenCheck(user.id);

        let refreshToken;
        if (!isExisted) {
            logger.error("The token doesnt exist");
            refreshToken = createToken(user, REFRESH_TOKEN_SECRET);
            await createRefreshTokenService(user.id, refreshToken);
        } else {
            refreshToken = isExisted.value;
        }

        const accessToken = createToken(user, SECRET_KEY, "1d");

        res.status(200).send({
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                token: refreshToken, // This will be send to client to save in redux persist
            },
            token: accessToken, // This will be send to gateway service to save in client's cookie
        });
    } catch (error) {
        logger.error("Error: ", error.message, error.stack);
        res.status(500).send(
            createError(500, "The error occured: ", error.message, error.stack)
        );
    }
};

// Create new token based on refresh token
const token = async (req, res) => {
    try {
        const { token } = req.body;
        let user;

        if (!token) {
            logger.error("The token is not validated!");
            return res.status(200).send(createError(401, "Not authenticated!"));
        }

        jwt.verify(token, REFRESH_TOKEN_SECRET, async (err, payload) => {
            if (err)
                return res
                    .status(200)
                    .send(createError(401, "The token has expired"));
            user = payload;
        });

        const existingRefreshToken = await refreshTokenCheck(user.id);
        if (!existingRefreshToken) {
            logger.error(
                "The account does not have refreshToken data in the database!"
            );
            return res.status(403).send(createError(401, "Not authenticated!"));
        }

        const newUserValue = { ...user, token: existingRefreshToken.value };

        const newAccessToken = createToken(user, SECRET_KEY, "1d");

        res.status(200).send({ user: newUserValue, token: newAccessToken });
    } catch (error) {
        logger.error("Error: ", error.message, error.stack);
        res.status(500).send(
            createError(500, "The error occured: ", error.message, error.stack)
        );
    }
};

const verifyToken = (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            logger.error("The token is not validated!");
            return res
                .status(200)
                .send(createError(401, "Your account is not unauthorized!"));
        }

        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err)
                return res
                    .status(200)
                    .send(createError(403, "The token has expired"));
            logger.info("The token is validated");
            res.sendStatus(200);
        });
    } catch (error) {
        logger.error("Error: ", error.message, error.stack);
        res.status(500).send(
            createError(500, "The error occured: ", error.message, error.stack)
        );
    }
};

module.exports = {
    register,
    login,
    token,
    verifyToken,
};
