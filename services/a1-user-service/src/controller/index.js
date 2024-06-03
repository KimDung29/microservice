const { logger } = require("../logs");
const {
    existenceCheckService,
    createService,
    updateService,
} = require("../service");
const createError = require("../utils/createError");

const existenceCheck = async (req, res) => {
    try {
        const { email } = req.body;
        const isExisted = await existenceCheckService({ email });

        if (!isExisted) {
            res.status(200).send({
                status: 404,
                message: "The email doesnt exist.",
            });
        }
        res.status(200).send({ status: 201, data: isExisted });
    } catch (error) {
        logger.error("There was an error occur: " + error);
        // res.status(500).send("Error: ", error.message, error.stack);
    }
};

const create = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;

        const response = await createService({ firstName, lastName, email });
        if (!response) {
            res.status(200).send({
                status: 409,
                message: "The email is existed.",
            });
        }
        res.status(200).send(response);
    } catch (error) {
        logger.error("There was an error occur: " + error);
        // res.status(500).send("Error: ", error.message, error.stack);
    }
};

const update = async (req, res) => {
    const { firstName, lastName, email } = req.body;

    const result = await updateService({ firstName, lastName, email });
    res.send(result);
};

module.exports = {
    existenceCheck,
    create,
    update,
};
