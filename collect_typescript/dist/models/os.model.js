"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class Os extends sequelize_1.Model {
    }
    Os.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        platform: sequelize_1.DataTypes.STRING,
        distro: sequelize_1.DataTypes.STRING,
        release: sequelize_1.DataTypes.STRING,
        kernel: sequelize_1.DataTypes.STRING,
        arch: sequelize_1.DataTypes.STRING,
        hostname: sequelize_1.DataTypes.STRING,
        serial: sequelize_1.DataTypes.STRING,
        build: sequelize_1.DataTypes.STRING,
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: sequelize_1.DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'os',
        freezeTableName: true
    });
    return Os;
};
