import { Get, Post, Put, Delete, Controller, Req, Res } from "@nestjs/common"
import { Request, Response } from 'express'
import userService from '../services/user.service'

@Controller()
export default class userController {
    constructor(private readonly userService: userService) {}

    
}