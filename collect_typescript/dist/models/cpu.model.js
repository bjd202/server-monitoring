"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class Cpu extends sequelize_1.Model {
    }
    Cpu.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        hostname: sequelize_1.DataTypes.STRING,
        manufacturer: {
            type: sequelize_1.DataTypes.STRING,
        },
        brand: {
            type: sequelize_1.DataTypes.STRING,
        },
        vendor: {
            type: sequelize_1.DataTypes.STRING,
        },
        cores: {
            type: sequelize_1.DataTypes.INTEGER
        },
        // technically, `createdAt` & `updatedAt` are added by Sequelize and don't need to be configured in Model.init
        // but the typings of Model.init do not know this. Add the following to mute the typing error:
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: sequelize_1.DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'cpu',
        freezeTableName: true
    });
    return Cpu;
};
