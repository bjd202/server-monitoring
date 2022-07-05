import dotenv from "dotenv";

dotenv.config()

const config = {
    DB_DATABASE: process.env.DB_DATABASE || 'collect',
    DB_USERNAME: process.env.DB_USERNAME || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'P@ssw0rd',
    DB_HOST: process.env.DB_HOST || '127.0.0.1',
    DB_PORT: (typeof process.env.DB_PORT === 'string' ? 
        parseInt(process.env.DB_PORT) : 
        3306
    ) || 3306,
    DB_DIALECT: process.env.DB_DIALECT as any || 'mysql',
}

export default config