import { Get, Post, Put, Delete, Controller, Req, Res } from "@nestjs/common"
import { Request, Response } from 'express'
import postService from '../services/post.service'

@Controller()
export default class postController {
    constructor(private readonly postService: postService) {}

    
    
}