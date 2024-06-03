"use strict";
const tableName = "Refresh_Tokens";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(tableName, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            value: {
                type: Sequelize.TEXT,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "Users",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });

        await queryInterface.addIndex(tableName, ["userId"]);
    },

    async down(queryInterface, Sequelize) {
        // Drop the Invoices table
        await queryInterface.dropTable(tableName);
    },
};
