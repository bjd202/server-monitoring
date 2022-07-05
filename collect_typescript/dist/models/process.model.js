"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class Process extends sequelize_1.Model {
    }
    Process.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        hostname: sequelize_1.DataTypes.STRING,
        pid: sequelize_1.DataTypes.INTEGER,
        parentPid: sequelize_1.DataTypes.INTEGER,
        name: sequelize_1.DataTypes.STRING,
        cpu: sequelize_1.DataTypes.FLOAT,
        cpuu: sequelize_1.DataTypes.FLOAT,
        cpus: sequelize_1.DataTypes.FLOAT,
        mem: sequelize_1.DataTypes.FLOAT,
        priority: sequelize_1.DataTypes.INTEGER,
        memVsz: sequelize_1.DataTypes.INTEGER,
        memRss: sequelize_1.DataTypes.INTEGER,
        nice: sequelize_1.DataTypes.INTEGER,
        started: sequelize_1.DataTypes.STRING,
        state: sequelize_1.DataTypes.STRING,
        tty: sequelize_1.DataTypes.STRING,
        user: sequelize_1.DataTypes.STRING,
        command: sequelize_1.DataTypes.STRING,
        path: sequelize_1.DataTypes.STRING,
        params: sequelize_1.DataTypes.STRING,
        createdAt: sequelize_1.DataTypes.DATE,
        updatedAt: sequelize_1.DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'process',
        freezeTableName: true
    });
    return Process;
};
