const createError = require("../utils/createError");

const checkRole = (req, res, next) => {
    const { user } = req;
    const userRole = user.role;

    if (userRole !== "admin")
        next(createError(403, "Your role is not allowed to perform actions!"));

    next();
};

module.exports = checkRole;
