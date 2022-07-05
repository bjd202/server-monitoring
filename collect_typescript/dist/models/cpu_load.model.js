"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class CpuLoad extends sequelize_1.Model {
    }
    CpuLoad.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        hostname: sequelize_1.DataTypes.STRING,
        avgLoad: sequelize_1.DataTypes.FLOAT,
        currentLoad: sequelize_1.DataTypes.FLOAT,
        currentLoadUser: sequelize_1.DataTypes.FLOAT,
        currentLoadSystem: sequelize_1.DataTypes.FLOAT,
        currentLoadNice: sequelize_1.DataTypes.FLOAT,
        currentLoadIdle: sequelize_1.DataTypes.FLOAT,
        currentLoadIrq: sequelize_1.DataTypes.FLOAT,
        rawCurrentLoad: sequelize_1.DataTypes.BIGINT,
        rawCurrentLoadUser: sequelize_1.DataTypes.BIGINT,
        rawCurrentLoadSystem: sequelize_1.DataTypes.BIGINT,
        rawCurrentLoadNice: sequelize_1.DataTypes.BIGINT,
        rawCurrentLoadIdle: sequelize_1.DataTypes.BIGINT,
        rawCurrentLoadIrq: sequelize_1.DataTypes.BIGINT,
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: sequelize_1.DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'cpu_load',
        freezeTableName: true
    });
    return CpuLoad;
};
