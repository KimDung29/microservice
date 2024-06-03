const Refresh_Token = require("../database/models/refresh-token");
const { logger } = require("../logs");

const createRefreshTokenService = async (id, refreshToken) => {
    try {
        await Refresh_Token.create({
            userId: id,
            value: refreshToken,
        });
        logger.info("Refresh_Token has been created successfully.");
    } catch (error) {
        logger.error("Error: " + error.message + " " + error.stack);
    }
};

const refreshTokenCheck = async (id) => {
    try {
        const uniqueItem = await Refresh_Token.findOne({
            where: { userId: id },
        });
        if (!uniqueItem) {
            return false;
        }
        return uniqueItem.dataValues;
    } catch (error) {
        logger.error("There was an error occur: ", error.message, error.stack);
    }
};

module.exports = {
    createRefreshTokenService,
    refreshTokenCheck,
};
