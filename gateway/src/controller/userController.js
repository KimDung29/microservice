const axios = require("axios");
const createError = require("../utils/createError");
const { user_url } = require("../config/env-config");

const getList = async (req, res) => {
    try {
        const response = await axios.get(user_url.getList);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(
            createError(500, "The error occured: ", error.message, error.stack)
        );
    }
};

const getSingle = async (req, res) => {};
const create = async (req, res) => {};
const update = async (req, res) => {};
const deleteItem = async (req, res) => {};

module.exports = {
    getList,
    getSingle,
    create,
    update,
    deleteItem,
};
