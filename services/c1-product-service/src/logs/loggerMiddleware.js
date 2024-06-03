const morgan = require("morgan");
const os = require("os");
const { NODE_ENV } = require("../config/env-config");
const loggerStreamAdapter = require("./loggerStreamAdapter");

morgan.token("hostname", function getHostname() {
    return os.hostname();
});
morgan.token("pid", function getPid() {
    return process.pid.toString();
});

const loggerMiddleware = ({ logger }) => {
    const format = NODE_ENV === "production" ? "combined" : "dev";

    return morgan(format, {
        stream: loggerStreamAdapter.toStream(logger),
    });
};

module.exports = loggerMiddleware;
