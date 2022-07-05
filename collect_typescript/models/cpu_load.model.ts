import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
    class CpuLoad extends Model<InferAttributes<CpuLoad>, InferCreationAttributes<CpuLoad>> {
        declare id: number | null;
        
        declare hostname: string
        declare avgLoad: number
        declare currentLoad: number
        declare currentLoadUser: number
        declare currentLoadSystem: number
        declare currentLoadNice: number
        declare currentLoadIdle: number
        declare currentLoadIrq: number
        declare rawCurrentLoad: number
        declare rawCurrentLoadUser: number
        declare rawCurrentLoadSystem: number
        declare rawCurrentLoadNice: number
        declare rawCurrentLoadIdle: number
        declare rawCurrentLoadIrq: number

        declare createdAt: Date | null;
        declare updatedAt: Date | null;
    }
      
    CpuLoad.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        hostname: DataTypes.STRING,
        avgLoad: DataTypes.FLOAT,
        currentLoad: DataTypes.FLOAT,
        currentLoadUser: DataTypes.FLOAT,
        currentLoadSystem: DataTypes.FLOAT,
        currentLoadNice: DataTypes.FLOAT,
        currentLoadIdle: DataTypes.FLOAT,
        currentLoadIrq: DataTypes.FLOAT,
        rawCurrentLoad: DataTypes.BIGINT,
        rawCurrentLoadUser: DataTypes.BIGINT,
        rawCurrentLoadSystem: DataTypes.BIGINT,
        rawCurrentLoadNice: DataTypes.BIGINT,
        rawCurrentLoadIdle: DataTypes.BIGINT,
        rawCurrentLoadIrq: DataTypes.BIGINT,
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: DataTypes.DATE,
        }, 
        { 
            sequelize,
            modelName: 'cpu_load',
            freezeTableName: true
        }
    );

    return CpuLoad
}
