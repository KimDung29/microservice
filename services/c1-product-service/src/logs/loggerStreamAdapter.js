const loggerStreamAdapter = {
    toStream: (logger) => {
        return {
            write(message) {
                logger.info(message.trim());
            },
        };
    },
};

module.exports = loggerStreamAdapter;
