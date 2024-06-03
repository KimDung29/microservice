const express = require("express");
const cors = require("cors");
// const cookieParser = require("cookie-parser");
const router = require("./routes");
const { loggerMiddleware, correlationMiddleware, logger } = require("./logs");
const connectdb = require("./database/config/connectdb");
const { SERVER_PORT, CLIENT_PORT } = require("./config/env-config");

const app = express();

app.use(express.json());
// app.use(cookieParser());

const corsOptions = {
    origin: CLIENT_PORT,
    credentials: true,
};
app.use(cors(corsOptions));

app.use(loggerMiddleware({ logger }));
app.use(correlationMiddleware);
app.use("/api/products", router);

app.listen(SERVER_PORT, async () => {
    try {
        await connectdb();
        logger.info(`Product Service is running on port ${SERVER_PORT}`);
    } catch (error) {
        logger.error("Error starting the server:", error.message, error.stack);
    }
});
