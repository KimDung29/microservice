const { Op } = require("sequelize");
const Product = require("../database/models/product");
const { logger } = require("../logs");

const getListService = async ({ page, size, color, product_size }) => {
    const offset = (page - 1) * size;
    const limit = parseInt(size);

    const whereClause = {};

    if (color) {
        whereClause.color = {
            [Op.contains]: [color],
        };
    }
    if (product_size) {
        whereClause.product_size = {
            [Op.contains]: [product_size],
        };
    }

    try {
        const { count, rows } = await Product.findAndCountAll({
            where: whereClause,
            offset,
            limit,
        });

        return {
            totalItems: count,
            totalPages: Math.ceil(count / size),
            currentPage: page,
            products: rows,
        };
    } catch (error) {
        logger.error("Error fetching products:", error.message, error.stack);
        throw new Error("Error fetching products");
    }
};

const getSingleService = async (productId) => {
    try {
        const product = await Product.findOne({
            where: { id: productId },
        });
        if (!product) return "The product was not found!";
        return product;
    } catch (error) {
        logger.error("Error fetching product:", error.message, error.stack);
        throw new Error("Error fetching product");
    }
};

const createService = async ({
    name,
    description,
    quantity,
    price,
    color,
    product_size,
    avatar,
    images,
}) => {
    try {
        const res = await Product.create({
            name,
            description,
            quantity,
            price,
            color: color.split(","),
            product_size: product_size.split(","),
            avatar,
            images: images.split(","),
        });
        console.log({ res });
        logger.info("The product has been created successfully.");
        return true;
    } catch (error) {
        logger.error("Error creating product:", error.message, error.stack);
        throw new Error("Error creating product", error.message, error.stack);
    }
};

const updateService = async (productId, data) => {
    try {
        const product = await Product.findOne({ where: { id: productId } });
        if (!product) {
            return null;
        }
        await product.update(data);
        logger.info(
            `The product with id ${productId} has been updated successfully.`
        );
        return product;
    } catch (error) {
        logger.error("Error updating product:", error.message, error.stack);
        throw new Error("Error updating product");
    }
};

const deleteItemService = async (id) => {
    try {
        const product = await Product.findOne({ where: { id: id } });
        if (!product) {
            return null;
        }
        await product.destroy();
        logger.info(`The product with id ${id} has been deleted successfully.`);
        return product;
    } catch (error) {
        logger.error("Error deleting product:", error.message, error.stack);
        throw new Error("Error deleting product");
    }
};

module.exports = {
    getListService,
    getSingleService,
    createService,
    updateService,
    deleteItemService,
};
