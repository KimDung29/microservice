const Sequelize = require("sequelize");
const { logger } = require("../logs");
const dbConfig = require("./dbConfig");

const { database, username, password, host, port } = dbConfig;

const sequelize = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: "postgres",
});

const connectdb = async () => {
    try {
        await sequelize.authenticate();
        logger.info(
            `Connection to database "${database}" has been established successfully.`
        );
    } catch (error) {
        logger.error("Unable to connect to the database:", error);
    }
};
module.exports = connectdb;
