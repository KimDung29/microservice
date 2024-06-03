const correlator = require("correlation-id");
const { v4: uuidv4 } = require("uuid");

const correlationMiddleware = async function (req, res, next) {
    let correlationId;

    // Check if the correlation id exists and is a string
    if (typeof req.headers["correlation-id"] === "string") {
        // If it's a string, use it as the correlation id
        correlationId = req.headers["correlation-id"];
    } else if (Array.isArray(req.headers["correlation-id"])) {
        // If it's an array, use the first element as the correlation id
        correlationId = req.headers["correlation-id"][0];
    }

    // If correlation ID is not provided, generate a new one
    if (!correlationId) {
        correlationId = uuidv4();
        // Optionally, you can add the correlation ID to the response headers
        res.setHeader("correlation-id", correlationId);
    }

    // Set the correlation id
    correlator.withId(correlationId, async () => {
        next();
    });
};

module.exports = correlationMiddleware;
