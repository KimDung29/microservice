const http = require("http");
const cluster = require("cluster");
const os = require("os");
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { SERVER_PORT, CLIENT_PORT } = require("./config/env-config");
const connectdb = require("./database/connectdb");
const router = require("./routes");
const { loggerMiddleware, correlationMiddleware, logger } = require("./logs");

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    logger.info(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        logger.error(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    const app = express();

    app.use(express.json());
    app.use(cookieParser());

    const corsOptions = {
        origin: CLIENT_PORT,
        credentials: true,
    };
    app.use(cors(corsOptions));

    app.use(loggerMiddleware({ logger }));
    app.use(correlationMiddleware);
    app.use(router);

    app.use(
        "/uploads",
        express.static(
            path.join(__dirname, "../../services/c1-product-service/uploads")
        )
    );

    const server = http.createServer(app);

    server.listen(SERVER_PORT, async () => {
        try {
            await connectdb();
            logger.info(
                `Worker ${process.pid} started and server is running on port ${SERVER_PORT}`
            );
        } catch (error) {
            logger.error(
                "Error starting the server:",
                error.message,
                error.stack
            );
        }
    });
}
