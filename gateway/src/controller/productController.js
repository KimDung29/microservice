const axios = require("axios");
const createError = require("../utils/createError");
const { product_url } = require("../config/env-config");

const getList = async (req, res) => {
    try {
        const response = await axios.get(product_url.getList);
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send(
            createError(500, "The error occured: ", error.message, error.stack)
        );
    }
};

const create = async (req, res) => {
    try {
        const { name, description, quantity, price, color, product_size } =
            req.body;
        const avatar = req.files.avatar ? req.files.avatar[0].path : null;
        const images = req.files.images
            ? req.files.images.map((file) => {
                  const position = file.path.search("uploads") + 8;
                  return file.path.slice(position);
              })
            : [];
        const positionAvatar = avatar.search("uploads") + 8;
        const item = {
            name,
            description,
            quantity,
            price,
            color,
            product_size,
            avatar: avatar.slice(positionAvatar),
            images: images.join(","),
        };
        const response = await axios.post(product_url.create, { item });

        if (response.data.status) {
            res.status(200).send(createError(400, response.data.message));
        } else {
            res.status(200).send(response.data.message);
        }
    } catch (error) {
        res.status(500).send(
            createError(500, "The error occured: ", error.message, error.stack)
        );
    }
};

const getSingle = async (req, res) => {};
const update = async (req, res) => {};
const deleteItem = async (req, res) => {};

module.exports = {
    getList,
    getSingle,
    create,
    update,
    deleteItem,
};
