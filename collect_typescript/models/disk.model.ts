import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
    class Disk extends Model<InferAttributes<Disk>, InferCreationAttributes<Disk>> {
        declare id: number | null;
        
        declare hostname: string
        declare fs: string
        declare type: string
        declare size: number
        declare used: number
        declare available: number
        declare use: number
        declare mount: string

        declare createdAt: Date | null;
        declare updatedAt: Date | null;
    }
      
    Disk.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        hostname: DataTypes.STRING,
        fs: DataTypes.STRING,
        type: DataTypes.STRING,
        size: DataTypes.BIGINT,
        used: DataTypes.BIGINT,
        available: DataTypes.BIGINT,
        use: DataTypes.FLOAT,
        mount: DataTypes.STRING,
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: DataTypes.DATE,
        }, 
        { 
            sequelize,
            modelName: 'disk',
            freezeTableName: true
        }
    );

    return Disk
}
