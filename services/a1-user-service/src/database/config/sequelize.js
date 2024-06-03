const Sequelize = require("sequelize");
const dbConfig = require("./dbConfig");

const { username, password, host, database, port } = dbConfig;

const sequelize = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: "postgres",
    migrationStorageTableName: "sequelize_meta",
});

module.exports = sequelize;
