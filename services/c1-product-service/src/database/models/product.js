"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const ProductDefine = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            // Define associations here
            // Product.hasMany(models.Invoice, { foreignKey: "productId" }); // Assuming each product can have multiple invoices
        }
    }

    Product.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            color: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
            },
            product_size: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            avatar: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            images: {
                type: DataTypes.ARRAY(DataTypes.TEXT),
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Product",
        }
    );

    return Product;
};

const Product = ProductDefine(sequelize, DataTypes);

module.exports = Product;
