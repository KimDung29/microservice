const Log4js = require("log4js");
const correlator = require("correlation-id");
const { chain } = require("lodash");
const { NODE_ENV, SERVICE_CATEGORY, SERVICE } = require("../config/env-config");

const isObjectType = (value) => {
    return ["object"].includes(typeof value);
};

Log4js.addLayout("json", (config) => (logEvent) => {
    const { startTime, data, level, context } = logEvent;

    const formatted = chain(data)
        .map((message) => {
            if (typeof message === "string") {
                return message;
            }

            if (isObjectType(message)) {
                const json = JSON.stringify(message);
                return json.replace(/"([^"]+)":/g, "$1:");
            }
        })
        .join(config.separator);

    const newLog = {
        timestamp: startTime,
        level: level.levelStr,
        message: formatted,
        logType: "APP",
        serviceCategory: SERVICE_CATEGORY,
        service: SERVICE,
        correlationId: correlator.getId(),
        ...context,
    };
    return JSON.stringify(newLog);
});

Log4js.addLayout("stdout", (config) => (logEvent) => {
    const { startTime, data, level } = logEvent;

    const message = data.length > 0 ? data.join(config.separator) : "";
    const correlationId = correlator.getId();

    const time = `[${startTime.toISOString()}] [${level.levelStr}] ${correlationId}`;
    const result = `${time}` ? `[${correlationId}]` : "";

    return `${result} ${message}`;
});

const logLevel = NODE_ENV === "production" ? "info" : "debug";

Log4js.configure({
    appenders: {
        out: {
            type: "stdout",
            layout: {
                type: "pattern",
                pattern:
                    "%[[%d]%] - %[%p%] - %x{correlationId} - %[%C%] - %[%M%] - %x{message}",
                tokens: {
                    correlationId: () => {
                        return correlator.getId() || "";
                    },
                    message: (logEvent) => {
                        const { data } = logEvent;
                        return chain(data)
                            .map((m) => {
                                if (typeof m === "object") {
                                    return JSON.stringify(m, null, 4);
                                }
                                return m;
                            })
                            .join("");
                    },
                },
            },
        },
        file: {
            type: "file",
            filename: `logs/${NODE_ENV}.log`,
            layout: { type: "json", separator: "," },
        },
    },
    // pm2: true,
    categories: {
        default: {
            appenders: ["out", "file"],
            level: logLevel,
            enableCallStack: true,
        },
    },
    disableClustering: true,
});
const getLogger = Log4js.getLogger();
module.exports = getLogger;
