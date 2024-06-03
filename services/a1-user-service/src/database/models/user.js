"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const UserDefine = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // Define associations here
            // User.hasMany(models.Invoice, { foreignKey: 'adminId' });
        }
    }

    User.init(
        {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: DataTypes.STRING,
            role: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};

const User = UserDefine(sequelize, DataTypes);

module.exports =  User ;
