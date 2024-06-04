const axios = require("axios");
const createError = require("../utils/createError");
const { NODE_ENV, auth_url } = require("../config/env-config");

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password, isAdmin } = req.body;
        const response = await axios.post(auth_url.register, {
            first_name,
            last_name,
            email,
            password,
            isAdmin,
        });
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send(
            createError(500, "The error occured: ", error.message, error.stack)
        );
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await axios.post(auth_url.login, {
            email,
            password,
        });
        if (response.data.status) {
            res.status(200).send({
                status: 401,
                message: response.data.message,
            });
        }

        const isProduction = NODE_ENV === "production";
        res.cookie("accessToken", response.data.token, {
            httpOnly: true,
            secure: isProduction,
        });
        res.status(200).send(response.data.user);
    } catch (error) {
        res.status(500).send(
            createError(500, "The error occured: ", error.message, error.stack)
        );
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("accessToken");
        res.status(200).send({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).send(
            createError(500, "The error occured: ", error.message, error.stack)
        );
    }
};

const token = async (req, res) => {
    try {
        const { token } = req.body;
        const response = await axios.post(auth_url.token, { token });

        const isProduction = NODE_ENV === "production";
        res.cookie("accessToken", response.data.token, {
            httpOnly: true,
            secure: isProduction,
        });

        res.status(200).send(response.data.user);
    } catch (error) {
        res.status(500).send(
            createError(500, "The error occured: ", error.message, error.stack)
        );
    }
};

const verifyToken = async (req, res) => {
    try {
        const token = req.cookies.accessToken;
        const response = await axios.post(auth_url.verifyToken, { token });

        res.status(200).send(response.data.status);
    } catch (error) {
        res.status(500).send(
            createError(500, "The error occured: ", error.message, error.stack)
        );
    }
};

module.exports = {
    register,
    login,
    logout,
    token,
    verifyToken,
};
