import { Injectable } from '@nestjs/common';
import { Users } from 'src/models/users.model';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService){}

    

    async validateUser(username: string, password: string): Promise<any> {
        console.log(username, password)

        const saltOrRounds = 10
        //const hash = await bcrypt.hash(password, saltOrRounds)
        //const salt = await bcrypt.genSalt()

        const user = await this.usersService.findOne(username)
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)
        if(user && isMatch){
            const {password, ...result} = user
            return result
        }

        return null
    }

}
