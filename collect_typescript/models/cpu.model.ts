import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
    class Cpu extends Model<InferAttributes<Cpu>, InferCreationAttributes<Cpu>> {
        declare id: number | null;
        declare hostname: string;
        declare manufacturer: string;
        declare brand: string;
        declare vendor: string;
        declare cores: number;
        declare createdAt: Date | null;
        declare updatedAt: Date | null;
    }
      
    Cpu.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        hostname: DataTypes.STRING,
        manufacturer: {
            type: DataTypes.STRING,
        },
        brand: {
            type: DataTypes.STRING,
        },
        vendor: {
            type: DataTypes.STRING,
        },
        cores: {
            type: DataTypes.INTEGER
        },
        // technically, `createdAt` & `updatedAt` are added by Sequelize and don't need to be configured in Model.init
        // but the typings of Model.init do not know this. Add the following to mute the typing error:
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: DataTypes.DATE,
        }, 
        { 
            sequelize,
            modelName: 'cpu',
            freezeTableName: true
        }
    );

    return Cpu
}
