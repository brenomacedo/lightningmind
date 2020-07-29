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

    async createPost(name: string, description: string, views: number, videoURL: string, userId: number) {
        const post = new PostEntity()
        post.name = name
        post.description = description
        post.userId = userId
        post.videoURL = videoURL
        post.views = 0

        await this.postRepository.save(post)

        return post
    }

    async findPost(id: number) {
        const post = await this.postRepository.findOne(id)
        if(!post) {
            return false
        }
        return post
    }

    async viewPosts() {
        const post = await this.postRepository.find()
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
    
}