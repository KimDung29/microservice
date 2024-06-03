const  User  = require("../database/models/user");
const { logger } = require("../logs");

const existenceCheckService = async ({ email }) => {
    try {
        const uniqueItem = await User.findOne({ where: { email: email } });
        if (!uniqueItem) {
            return false;
        }
        return uniqueItem.dataValues;
    } catch (error) {
        logger.error("There was an error occur: ", error.message, error.stack);
    }
};

const createService = async ({
    first_name,
    last_name,
    email,
    password,
    role,
}) => {
    try {
        const uniqueItem = await User.findOne({ where: { email } });
        if (uniqueItem) {
            return "The email exsisted!";
        } else {
            await User.create({
                first_name,
                last_name,
                email,
                password,
                role,
            });
            return "New data has created successfully.";
        }
    } catch (error) {
        logger.error(
            "There was an error occur: " + error.message + error.stack
        );
        // throw new Error(
        //     "There was an error occured: " + error.message + error.stack
        // );
    }
};
const updateService = async ({ first_name, last_name, email }) => {
    try {
        const uniqueItem = await User.findOne({ where: { email } });
        if (!uniqueItem.isNewRecord) {
            await User.create({ first_name, last_name, email });
            return "";
        } else {
            return "The account hasnt found!";
        }
    } catch (error) {
        logger.error("There was an error occur: " + error);
    }
};

module.exports = {
    createService,
    updateService,
    existenceCheckService,
};
