"use strict";
/** @type {import('sequelize-cli').Migration} */

const tableName = "Products";

module.exports = {
    async up(queryInterface, Sequelize) {
        const { DataTypes } = Sequelize;
        await queryInterface.createTable(tableName, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
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
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable(tableName);
    },
};
