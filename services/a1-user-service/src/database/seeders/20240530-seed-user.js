"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("Users", [
            {
                first_name: "Admin",
                last_name: "Doe",
                email: "admin@gmail.com",
                password:
                    "$2a$10$qnQ4hoYkWV/tdXqIrKffjeG9WPSpmBtl1TuRX.mISkENuOkToR6ga",
                role: "admin",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                first_name: "Client",
                last_name: "Smith",
                email: "client@gmail.com",
                role: "client",
                password:
                    "$2a$10$qnQ4hoYkWV/tdXqIrKffjeG9WPSpmBtl1TuRX.mISkENuOkToR6ga",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
