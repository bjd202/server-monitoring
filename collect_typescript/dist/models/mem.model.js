"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class Memory extends sequelize_1.Model {
    }
    Memory.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        hostname: sequelize_1.DataTypes.STRING,
        total: sequelize_1.DataTypes.BIGINT,
        free: sequelize_1.DataTypes.BIGINT,
        used: sequelize_1.DataTypes.BIGINT,
        active: sequelize_1.DataTypes.BIGINT,
        available: sequelize_1.DataTypes.BIGINT,
        swaptotal: sequelize_1.DataTypes.BIGINT,
        swapused: sequelize_1.DataTypes.BIGINT,
        swapfree: sequelize_1.DataTypes.BIGINT,
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: sequelize_1.DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'memory',
        freezeTableName: true
    });
    return Memory;
};
