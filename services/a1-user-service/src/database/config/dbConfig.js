require("dotenv").config();

const envFile =
    process.env.NODE_ENV === "production"
        ? ".env.production"
        : process.env.NODE_ENV === "test"
          ? ".env.test"
          : ".env.development";

require("dotenv").config({ path: envFile });

// Database
const dbConfig = {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.DB_NAME || "shopping",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
};

module.exports = dbConfig;
