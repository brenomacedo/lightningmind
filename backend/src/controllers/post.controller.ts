import { Get, Post, Put, Delete, Controller, Req, Res, UseGuards, UploadedFile, UseInterceptors } from "@nestjs/common"
import JwtAuthGuard from '../auth/jwt-auth.guard'
import { Request, Response, request } from 'express'
import postService from '../services/post.service'
import { FileInterceptor } from "@nestjs/platform-express"
import * as multer from "multer"
import * as path from 'path'
import * as crypto from 'crypto'

@Controller()
export default class postController {
    constructor(private readonly postService: postService) {}

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file', {
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path.resolve(__dirname, '..', '..', 'uploads', 'videos'))
            },
            filename: (req, file: any, cb) => {
                const hash = crypto.randomBytes(16).toString('hex')
                const newfile = `${hash}-${file.originalname}`
                file.key = newfile
                cb(null, newfile)
            }
        }),
        dest: path.resolve(__dirname, '..', '..', 'uploads', 'videos'),
        fileFilter: (req, file, cb) => {
            if(file.mimetype === 'video/mp4') {
                cb(null, true)
            } else {
                cb(new Error('Invalid file type'), false)
            }
        },
        limits: {
            fileSize: 1024 * 1024 * 20
        }
    }))

    @Post("/post/create")
    async createPost(@Req() request: Request, @Res() response: Response, @UploadedFile() file: any) {
        const { description, userId } = request.body
        const post = await this.postService.createPost(description, file.key, userId)
        return response.status(200).json(post)
    }

    @Get("/post/find/:id")
    async findPost(@Req() request: Request, @Res() response: Response) {
        const post = await this.postService.findPosts(Number(request.params.id))
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

    @Delete("/post/delete/:id")
    async deletePost(@Req() request: Request, @Res() response: Response) {
        const { id } = request.params
        await this.postService.deletePost(Number(id))
        response.status(200).json({ message: "post deleted!" })
    }

    @Put("/post/like/:userid/:postid")
    async likePost(@Req() request: Request, @Res() response: Response) {
        const { postid, userid } = request.params
        const post = await this.postService.likePost(Number(userid), Number(postid))
        response.status(200).json(post)
    }
    
}