import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import bcrypt from 'bcryptjs'
import UserEntity from '../entities/user.entity'

@Injectable()
export default class userService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async createUser(name: string, description: string, login: string, password: string, email: string) {
        const user = new UserEntity()
        // const cryptedPassword = await bcrypt.hash(password, 10)
        user.name = name
        user.description = description
        user.login = login
        user.password = password
        user.email = email
        user.image = 'profile.png'

        await this.userRepository.save(user)

        return user
    }

    async findUser(email: string) {
        const user = await this.userRepository.findOne({
            where: {
                email
            }
        })

        if(!user) {
            return false
        }

        return user
    }
}