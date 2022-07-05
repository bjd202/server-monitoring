import { AutoIncrement, Column, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";


@Table({
    tableName: 'user',
    freezeTableName: true
})
export class Users extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @Unique
    @Column
    username: string

    @Column
    password: string

    @Column
    createdAt: Date

    @Column
    updatedAt: Date
}