import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
    class Memory extends Model<InferAttributes<Memory>, InferCreationAttributes<Memory>> {
        declare id: number | null;
        declare hostname: string;

        declare total: number;
        declare free: number;
        declare used: number;
        declare active: number;
        declare available: number;
        declare swaptotal: number;
        declare swapused: number;
        declare swapfree: number;

        declare createdAt: Date | null;
        declare updatedAt: Date | null;
    }
      
    Memory.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        hostname: DataTypes.STRING,
        total: DataTypes.BIGINT,
        free: DataTypes.BIGINT,
        used: DataTypes.BIGINT,
        active: DataTypes.BIGINT,
        available: DataTypes.BIGINT,
        swaptotal: DataTypes.BIGINT,
        swapused: DataTypes.BIGINT,
        swapfree: DataTypes.BIGINT,
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: DataTypes.DATE,
        }, 
        { 
            sequelize,
            modelName: 'memory',
            freezeTableName: true
        }
    );

    return Memory
}
