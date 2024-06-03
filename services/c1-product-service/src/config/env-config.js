require("dotenv").config();

const envFile =
    process.env.NODE_ENV === "production"
        ? ".env.production"
        : process.env.NODE_ENV === "test"
          ? ".env.test"
          : ".env.development";

require("dotenv").config({ path: envFile });

// Server
const SERVER_PORT = process.env.SERVER_PORT || 4002;
const NODE_ENV = process.env.NODE_ENV;
const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const SERVICE_CATEGORY = process.env.SERVICE_CATEGORY;
const SERVICE = process.env.SERVICE;

// Client
const CLIENT_PORT = process.env.CLIENT_PORT;

module.exports = {
    SERVER_PORT,
    NODE_ENV,
    SECRET_KEY,
    REFRESH_TOKEN_SECRET,
    SERVICE_CATEGORY,
    SERVICE,
    CLIENT_PORT,
};
