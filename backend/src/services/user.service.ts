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

        await this.userRepository.save(user)

        return user
    }

    async findUser(id: number) {
        const user = await this.userRepository.findOne(id, {
            select: ["id", "name", "description", "email"]
        })

        if(!user) {
            return false
        }

        return user
    }

    async login(login: string, password: string) {
        const user = await this.userRepository.findOne({
            where: {
                login: login
            }
        })

        if(!user) {
            return false
        }

        if(!await bcrypt.compare(password, user.password)) {
            return false
        }

        delete user.password

        return user
    }
}