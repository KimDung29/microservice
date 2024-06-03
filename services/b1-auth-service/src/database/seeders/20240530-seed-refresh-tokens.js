"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("Refresh_Tokens", [
            {
                value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZmlyc3ROYW1lIjoiTG9nYW4iLCJsYXN0TmFtZSI6IkNhbWVyb24iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNzIzOTEzMywiZXhwIjoxNzE3ODQzOTMzfQ.QODl5CHDz2iThRiJ7px_SBMFeHFu9ZplFxIWn46yE9s",
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZmlyc3ROYW1lIjoiTG9nYW4iLCJsYXN0TmFtZSI6IkNhbWVyb24iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNzIzOTEzMywiZXhwIjoxNzE3ODQzOTMzfQ.QODl5CHDz2iThRiJ7px_SBMFeHFu9ZplFxIWn46yE9s",
                userId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Refresh_Tokens", null, {});
    },
};
