import { Injectable, Post } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import PostEntity from '../entities/post.entity'

@Injectable()
export default class postService {

    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>
    ) {}

    async createPost(description: string, videoURL: string, userId: number) {
        const post = new PostEntity()
        post.name = 'test'
        post.description = description
        post.userId = userId
        post.videoURL = videoURL
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
        if(!post) {
            return false
        }
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
                name: Like(`%${searchQ}%`)
            }
        })

        return post
    }

    async deletePost(id: number) {
        await this.postRepository.delete({ id })
    }
    
}