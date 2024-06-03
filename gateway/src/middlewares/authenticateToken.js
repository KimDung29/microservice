const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/env-config");
const createError = require("../utils/createError");

const authenticateToken = (req, res, next) => {
    // check authorization
    const token = req.cookies.accessToken;
    if (!token) next(createError(401, "You are not authenticated!"));

    jwt.verify(token, SECRET_KEY, (err, payload) => {
        if (err)
            next(res.status(403).send(createError(403, "Token is not valid!")));
        req.user = payload;
        next();
    });
};

module.exports = authenticateToken;
