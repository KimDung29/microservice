"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const RefreshTokenDefine = (sequelize, DataTypes) => {
    class Refresh_Token extends Model {
        static associate(models) {
            Refresh_Token.belongsTo(models.User, {
                foreignKey: "userId",
                onDelete: "SET NULL",
            });
        }
    }

    Refresh_Token.init(
        {
            value: DataTypes.TEXT,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Refresh_Token",
        }
    );

    return Refresh_Token;
};

const Refresh_Token = RefreshTokenDefine(sequelize, DataTypes);

module.exports = Refresh_Token;
