import { Injectable, Post } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import PostEntity from '../entities/post.entity'
import * as fs from 'fs'
import * as path from 'path'
import UserEntity from 'src/entities/user.entity'

@Injectable()
export default class postService {

    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async createPost(description: string, videoURL: string, userId: number) {
        const post = new PostEntity()
        post.description = description
        post.userId = userId
        post.videoURL = videoURL
        post.usersLikes = ''
        post.views = 0

        await this.postRepository.save(post)

        return post
    }

    async findPosts(id: number) {
        const post = await this.postRepository.find({
            where: {
                userId: id
            },
            relations: ['user'],
            order: {
                id: "DESC"
            }
        })
        post.forEach(p => {
            p.user.password = undefined
        })
        return post
    }

    async viewPosts() {
        const post = await this.postRepository.find({
            relations: ['user'],
            order: {
                id: "DESC"
            }
        })
        post.forEach(p => {
            p.user.password = undefined
        })
        return post
    }

    async searchPost(searchQ: string) {
        const post = await this.postRepository.find({
            where: {
                description: Like(`%${searchQ}%`)
            },
            relations: ['user']
        })
        post.forEach(p => {
            p.user.password = undefined
        })
        return post
    }

    async deletePost(id: number) {
        const post = await this.postRepository.findOne(id)
        fs.unlink(path.resolve(__dirname, '..', '..', 'uploads', 'video', post.videoURL), (err) => {
            if(err) {
                console.log('video doesnt exist')
            }
        })
        await this.postRepository.delete({ id })
    }

    async likePost(userId: number, postId: number) {
        const post = await this.postRepository.findOne(postId)
        const likesArray = post.usersLikes.split(" ")
        const likesArrayWithId = likesArray.concat(String(userId))
        const newString = likesArrayWithId.join(" ")
        post.usersLikes = newString
        await this.postRepository.save(post)
        return post
    }

    async removeLike(userId: number, postId: number) {
        const post = await this.postRepository.findOne(postId)
        const likesArray = post.usersLikes.split(" ")
        const likesArrayWithoutId = likesArray.filter(userLike => userLike !== String(userId))
        const newString = likesArrayWithoutId.join(" ")
        post.usersLikes = newString
        await this.postRepository.save(post)
        return post
    }

    async getFavorites(id: number) {
        const user = await this.userRepository.findOne(1)
        const favorites = user.favorites
        const favoritesString = favorites.trim()
        const favoritesArray = favoritesString.split(' ').map(f => Number(f))
        const posts = await this.postRepository.findByIds(favoritesArray, {
            relations: ['user']
        })
        return posts
    }
}