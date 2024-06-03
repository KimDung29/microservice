const Sequelize = require("sequelize");
const { logger } = require("../logs");
const dbConfig = require("./dbConfig");

const { username, password, host, database } = dbConfig;

async function createDatabase() {
    const sequelize = new Sequelize("", username, password, {
        host: host,
        dialect: "postgres",
        logging: false,
    });

    try {
        // Connect to the PostgreSQL server
        await sequelize.authenticate();

        // Check if the database exists
        const [result] = await sequelize.query(
            `SELECT 1 FROM pg_database WHERE datname = '${database}';`
        );

        if (result.length === 0) {
            // Database does not exist, create it
            await sequelize.query(`CREATE DATABASE ${database};`);
            logger.info(`Database "${database}" created successfully.`);
        } else {
            logger.debug(`Database "${database}" already exists.`);
        }
    } catch (error) {
        logger.error("Error creating database:", error);
    } finally {
        await sequelize.close();
    }
}

createDatabase();
