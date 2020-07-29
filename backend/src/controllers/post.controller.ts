import { Get, Post, Put, Delete, Controller, Req, Res } from "@nestjs/common"
import { Request, Response, request } from 'express'
import postService from '../services/post.service'

@Controller()
export default class postController {
    constructor(private readonly postService: postService) {}

    @Post("/post/create")
    async createPost(@Req() request: Request, @Res() response: Response) {
        const { name, description, userId, videoURL } = request.body
        const post = await this.postService.createPost(name, description, videoURL, userId)
        return response.status(200).json(post)
    }

    @Get("/post/find")
    async findPost(@Req() request: Request, @Res() response: Response) {
        const post = await this.postService.findPost(Number(request.params.id))
        if(!post) {
            return response.status(400).send("user not found")
        }

        return response.status(200).json(post)
    }

    @Get("/post/view")
    async viewPosts(@Req() request: Request, @Res() response: Response) {
        const post = await this.postService.viewPosts()
        return response.status(200).json(post)
    }

    @Get("/post/search")
    async searchPosts(@Req() request: Request, @Res() response: Response) {
        const post = await this.postService.searchPost(String(request.query.search))
        return response.status(200).json(post)
    }
    
}