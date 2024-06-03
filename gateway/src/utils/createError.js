const createError = (statusCode, message, details = "", stack = "") => {
    const err = new Error();
    err.status = statusCode;
    err.message = message;
    err.details = details;
    err.stack = stack;
    return err;
};

module.exports = createError;
