import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import bc from 'bcrypt'
import UserEntity from '../entities/user.entity'

@Injectable()
export default class userService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async createUser(name: string, description: string, login: string, password: string, email: string) {
        const user = new UserEntity()
        user.name = name
        user.descriptiion = description
        user.login = login
        user.password = await bc.hash(password, 10)
        user.email = email

        await this.userRepository.save(user)
    }
}