// import dotenv from "dotenv";

// dotenv.config()

import config from "./config";
import { Sequelize } from "sequelize";


const sequelize = new Sequelize(
    config.DB_DATABASE || 'collect', 
    config.DB_USERNAME || 'root', 
    config.DB_PASSWORD || 'P@ssw0rd', 
    {
        host: config.DB_HOST || '127.0.0.1',
        port: config.DB_PORT || 3306,
        dialect: config.DB_DIALECT || 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
        timezone: 'Asia/Seoul',
    }
);

console.log(`DB_DATABASE : ${config.DB_DATABASE}`)
console.log(`DB_USERNAME : ${config.DB_USERNAME}`)
console.log(`DB_HOST : ${config.DB_HOST}`)
console.log(`DB_PORT : ${config.DB_PORT}`)
console.log(`DB_DIALECT : ${config.DB_DIALECT}`)

export default sequelize