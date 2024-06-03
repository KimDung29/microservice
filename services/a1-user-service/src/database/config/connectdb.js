const { logger } = require("../../logs");
const dbConfig = require("./dbConfig");
const sequelize = require("./sequelize");

const connectdb = async () => {
    try {
        await sequelize.authenticate();
        logger.info(
            `Connection to db "${dbConfig.database}" has been established successfully.`
        );
    } catch (error) {
        logger.error(
            "Unable to connect to the database:",
            error.message,
            error.stack
        );
    }
};
module.exports = connectdb;
