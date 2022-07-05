"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    DB_DATABASE: process.env.DB_DATABASE || 'collect',
    DB_USERNAME: process.env.DB_USERNAME || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'P@ssw0rd',
    DB_HOST: process.env.DB_HOST || '127.0.0.1',
    DB_PORT: (typeof process.env.DB_PORT === 'string' ?
        parseInt(process.env.DB_PORT) :
        3306) || 3306,
    DB_DIALECT: process.env.DB_DIALECT || 'mysql',
};
exports.default = config;
