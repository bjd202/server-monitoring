"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class Disk extends sequelize_1.Model {
    }
    Disk.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        hostname: sequelize_1.DataTypes.STRING,
        fs: sequelize_1.DataTypes.STRING,
        type: sequelize_1.DataTypes.STRING,
        size: sequelize_1.DataTypes.BIGINT,
        used: sequelize_1.DataTypes.BIGINT,
        available: sequelize_1.DataTypes.BIGINT,
        use: sequelize_1.DataTypes.FLOAT,
        mount: sequelize_1.DataTypes.STRING,
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: sequelize_1.DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'disk',
        freezeTableName: true
    });
    return Disk;
};
