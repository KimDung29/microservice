require("dotenv").config();

const envFile =
    process.env.NODE_ENV === "production"
        ? ".env.production"
        : process.env.NODE_ENV === "test"
          ? ".env.test"
          : ".env.development";

require("dotenv").config({ path: envFile });

// Server
const SERVER_PORT = process.env.SERVER_PORT || 8080;
const NODE_ENV = process.env.NODE_ENV;
const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const SERVICE_CATEGORY = process.env.SERVICE_CATEGORY;
const SERVICE = process.env.SERVICE;

const CLIENT_PORT = process.env.CLIENT_PORT;

// Service
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

const user_url = {
    getList: `${USER_SERVICE_URL}/getList`,
    getSingle: `${USER_SERVICE_URL}/getSingle`,
    create: `${USER_SERVICE_URL}/create`,
    update: `${USER_SERVICE_URL}/update`,
    deleteItem: `${USER_SERVICE_URL}/deleteItem`,
};

const auth_url = {
    register: `${AUTH_SERVICE_URL}/register`,
    login: `${AUTH_SERVICE_URL}/login`,
    token: `${AUTH_SERVICE_URL}/token`,
    verifyToken: `${AUTH_SERVICE_URL}/verifyToken`,
};

const product_url = {
    getList: `${PRODUCT_SERVICE_URL}`,
    getSingle: `${PRODUCT_SERVICE_URL}/getSingle`,
    create: `${PRODUCT_SERVICE_URL}/create`,
    update: `${PRODUCT_SERVICE_URL}/update`,
    deleteItem: `${PRODUCT_SERVICE_URL}/deleteItem`,
};

module.exports = {
    SERVER_PORT,
    NODE_ENV,
    SECRET_KEY,
    REFRESH_TOKEN_SECRET,
    SERVICE_CATEGORY,
    SERVICE,
    CLIENT_PORT,
    user_url,
    auth_url,
    product_url,
};
