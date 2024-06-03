const Joi = require("joi");

const {
    getListService,
    getSingleService,
    createService,
    updateService,
    deleteItemService,
} = require("../service");
const { logger } = require("../logs");
const createError = require("../utils/createError");
const { validateID, validateFields } = require("../utils/validate-input-data");

// Define a schema for validation
const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    quantity: Joi.number().integer().positive().required(),
    price: Joi.number().integer().positive().required(),
    color: Joi.string().required(),
    product_size: Joi.string().required().min(1).messages({
        "string.empty": '"Size" is not allowed to be empty',
    }),
    avatar: Joi.string().required(),
    images: Joi.string().required(),
    serviceName: Joi.string(),
});

const getList = async (req, res) => {
    try {
        const { page = 1, size = 10, color, product_size } = req.query;
        const products = await getListService({
            page,
            size,
            color,
            product_size,
        });
        res.status(200).send(products);
    } catch (error) {
        logger.error(
            "Error fetching products in controller:",
            error.message,
            error.stack
        );
        res.status(500).send(createError(500, "Error fetching products"));
    }
};

const getSingle = async (req, res) => {
    try {
        const { id } = req.params;
        if (!validateID(id, res)) return;

        const product = await getSingleService(id);
        res.status(200).send(product);
    } catch (error) {
        logger.error(
            "Error fetching product in controller:",
            error.message,
            error.stack
        );
        res.status(500).send(createError(500, "Error fetching product"));
    }
};

const create = async (req, res) => {
    try {
        if (!validateFields(productSchema, req.body.item, res)) return;

        const {
            name,
            description,
            quantity,
            price,
            color,
            product_size,
            avatar,
            images,
        } = req.body.item;

        const response = await createService({
            name,
            description,
            quantity,
            price,
            color,
            product_size,
            avatar,
            images,
        });
        res.status(200).send({
            message: "The product has been created successfully.",
        });
    } catch (error) {
        res.status(404).send(
            createError(
                404,
                "Error creating product",
                error.message,
                error.stack
            )
        );
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        if (!validateID(id, res)) return;
        if (!validateFields(productSchema, req.body, res)) return;

        const updatedProduct = await updateService(id, req.body);
        if (!updatedProduct) {
            res.status(404).send(createError(404, "Product not found"));
            return;
        }
        res.status(200).send({ message: "Product updated successfully" });
    } catch (error) {
        logger.error("Error updating product:", error.message, error.stack);
        res.status(500).send(createError(500, "Error updating product"));
    }
};

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        if (!validateID(id, res)) return;

        const deletedProduct = await deleteItemService(id);
        if (!deletedProduct) {
            res.status(404).send(createError(404, "Product not found"));
            return;
        }
        res.status(200).send({ message: "Product deleted successfully" });
    } catch (error) {
        logger.error("Error deleting product:", error.message, error.stack);
        res.status(500).send(createError(500, "Error deleting product"));
    }
};

module.exports = {
    getList,
    getSingle,
    create,
    update,
    deleteItem,
};
