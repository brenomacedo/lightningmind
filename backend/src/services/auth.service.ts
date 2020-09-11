import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import UserService from './user.service'
import UserEntity from 'src/entities/user.entity'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'

interface IUser {
    id: number
    name: string
    description: string
    login: string
    email: string
    image: string
}

@Injectable()
export default class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findUser(email)
        // if(!await bcrypt.compare(user.password, pass)) {
        //     return null
        // }
        if(user && user.password === pass) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    async login(user: IUser) {
        const payload = { sub: {...user} }
        
        return {
            access_token: this.jwtService.sign(payload.sub),
            user: payload.sub
        }
    }

    async verifyUser(id: number) {
        const user = await this.userRepository.findOne(id)
        return user
    }
}