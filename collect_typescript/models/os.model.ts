import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
    class Os extends Model<InferAttributes<Os>, InferCreationAttributes<Os>> {
        declare id: number | null;

        declare platform: string
        declare distro: string
        declare release: string
        declare kernel: string
        declare arch: string
        declare hostname: string
        declare serial: string
        declare build: string

        declare createdAt: Date | null;
        declare updatedAt: Date | null;
    }
      
    Os.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        platform: DataTypes.STRING,
        distro: DataTypes.STRING,
        release: DataTypes.STRING,
        kernel: DataTypes.STRING,
        arch: DataTypes.STRING,
        hostname: DataTypes.STRING,
        serial: DataTypes.STRING,
        build: DataTypes.STRING,
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: DataTypes.DATE,
        }, 
        { 
            sequelize,
            modelName: 'os',
            freezeTableName: true
        }
    );

    return Os
}
