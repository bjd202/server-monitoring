"use strict";
// import dotenv from "dotenv";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config()
const config_1 = __importDefault(require("./config"));
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(config_1.default.DB_DATABASE || 'collect', config_1.default.DB_USERNAME || 'root', config_1.default.DB_PASSWORD || 'P@ssw0rd', {
    host: config_1.default.DB_HOST || '127.0.0.1',
    port: config_1.default.DB_PORT || 3306,
    dialect: config_1.default.DB_DIALECT || 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    timezone: 'Asia/Seoul',
});
console.log(`DB_DATABASE : ${config_1.default.DB_DATABASE}`);
console.log(`DB_USERNAME : ${config_1.default.DB_USERNAME}`);
console.log(`DB_HOST : ${config_1.default.DB_HOST}`);
console.log(`DB_PORT : ${config_1.default.DB_PORT}`);
console.log(`DB_DIALECT : ${config_1.default.DB_DIALECT}`);
exports.default = sequelize;
