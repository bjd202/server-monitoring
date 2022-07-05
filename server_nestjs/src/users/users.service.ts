import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/models/users.model';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectModel(Users)
        private usersModel: typeof Users,
    ){}

    findOne(username: string): Promise<Users | undefined>{
        console.log(username)
        return this.usersModel.findOne({
            where: {
                username: username
            }
        })
    }
}
