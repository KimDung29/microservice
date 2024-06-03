const Joi = require("joi");
const createError = require("./createError");
const { logger } = require("../logs");

// Define a schema for validating id
const idSchema = Joi.number().integer().positive().required();

const validateID = (id, res) => {
    const { error: idError } = idSchema.validate(id);
    if (idError) {
        logger.error("ID validation error:", idError.details);
        res.status(200).send(
            createError(
                400,
                `ID validation error: ${idError.details[0].message}`
            )
        );
        return false;
    }
    return true;
};

const validateFields = (fieldSchema, value, res) => {
    const { error } = fieldSchema.validate(value);
    if (error) {
        const errorMessage = error.details
            .map((detail) => detail.message)
            .join(", ");
        logger.error("Validation error:", error.details);
        res.status(200).send(createError(400, `${errorMessage}`));
        return false;
    }
    return true;
};

module.exports = {
    validateID,
    validateFields,
};
