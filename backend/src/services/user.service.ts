import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as fs from 'fs'
import * as path from 'path'
import UserEntity from '../entities/user.entity'

@Injectable()
export default class userService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async createUser(name: string, password: string, email: string) {
        const user = new UserEntity()
        // const cryptedPassword = await bcrypt.hash(password, 10)
        user.name = name
        user.description = ''
        user.status = "NORMAL"
        user.favorites = ""
        user.password = password
        user.email = email
        user.likedPosts = ''
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

    async updateUserImage(id: number, pathImg: string) {
        
        const user = await this.userRepository.findOne(id)
        fs.unlink(path.resolve(__dirname, '..', '..', 'uploads', user.image), (err) => {
            if(err) {
                console.log('image doesnt exist')
            }
        })
        user.image = pathImg
        await this.userRepository.save(user)
        return { pathImg }
    }

    async updateUser(id: number, name: string, password: string, currentPassword: string) {
        const user = await this.userRepository.findOne(id)
        if(user.password !== currentPassword) {
            return { status: false, payload: {} }
        }

        if(currentPassword) {
            user.password = currentPassword
        }

        user.name = name
        
        await this.userRepository.save(user)
        return { status: true, payload: user }
    }

    async updateUserPremium(id: number) {
        const user = await this.userRepository.findOne(id)
        user.status = "PREMIUM"
        await this.userRepository.save(user)
    }

    async setUserFavorite(userId: number, postId: number) {
        const user = await this.userRepository.findOne(userId)
        const favoritesArray = user.favorites.split(' ')
        const favoritesArrayWithId = favoritesArray.concat(String(postId))
        const newString = favoritesArrayWithId.join(' ')
        user.favorites = newString
        await this.userRepository.save(user)
        return user
    }

    async removeUserFavorite(userId: number, postId: number) {
        const user = await this.userRepository.findOne(userId)
        const favoritesArray = user.favorites.split(' ')
        const favoritesArrayWithoutId = favoritesArray.filter(userFavorite => userFavorite !== String(postId))
        const newString = favoritesArrayWithoutId.join(' ')
        user.favorites = newString
        await this.userRepository.save(user)
        return user
    }
}