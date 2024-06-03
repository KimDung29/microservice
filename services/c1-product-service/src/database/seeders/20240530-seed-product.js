"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Products",
            [
                {
                    name: "Product 1",
                    description: "Description for product 1",
                    color: ["Red", "Blue"],
                    product_size: ["S", "M", "L"],
                    quantity: 100,
                    price: 29.99,
                    avatar: "1717423607851-comestic-5.jpeg",
                    images: [
                        "1717423607851-comestic-6.jpeg",
                        "1717423607852-comestic-4.jpeg",
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Product 2",
                    description: "Description for product 2",
                    color: ["Green", "Yellow"],
                    product_size: ["M", "L"],
                    quantity: 50,
                    price: 49.99,
                    avatar: "1717423631889-comestic-2.jpeg",
                    images: [
                        "1717423631889-comestic-3.jpeg",
                        "1717423631890-comestic-1.jpeg",
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Products", null, {});
    },
};
