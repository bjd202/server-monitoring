import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
    class Process extends Model<InferAttributes<Process>, InferCreationAttributes<Process>> {
        declare id: number | null;

        declare hostname: string;

        declare pid: number
        declare parentPid: number
        declare name: string
        declare cpu: number
        declare cpuu: number
        declare cpus: number
        declare mem: number
        declare priority: number
        declare memVsz: number
        declare memRss: number
        declare nice: number
        declare started: string
        declare state: string
        declare tty: string
        declare user: string
        declare command: string
        declare path: string
        declare params: string

        declare createdAt: Date | null;
        declare updatedAt: Date | null;
    }

    Process.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        hostname: DataTypes.STRING,

        pid: DataTypes.INTEGER,
        parentPid: DataTypes.INTEGER,
        name: DataTypes.STRING,
        cpu: DataTypes.FLOAT,
        cpuu: DataTypes.FLOAT,
        cpus: DataTypes.FLOAT,
        mem: DataTypes.FLOAT,
        priority: DataTypes.INTEGER,
        memVsz: DataTypes.INTEGER,
        memRss: DataTypes.INTEGER,
        nice: DataTypes.INTEGER,
        started: DataTypes.STRING,
        state: DataTypes.STRING,
        tty: DataTypes.STRING,
        user: DataTypes.STRING,
        command: DataTypes.STRING,
        path: DataTypes.STRING,
        params: DataTypes.STRING,

        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'process',
            freezeTableName: true
        }
    )

    return Process
}