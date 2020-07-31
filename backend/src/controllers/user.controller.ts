import { Get, Post, Put, Delete, Controller, Req, Res } from "@nestjs/common"
import { Request, Response } from 'express'
import userService from '../services/user.service'

@Controller()
export default class userController {
    constructor(private readonly userService: userService) {}

    @Post("/user/create")
    async createUser(@Req() request: Request, @Res() response: Response) {
        const { name, description, email, login, password } = request.body
        const user = await this.userService.createUser(name, description, login, password, email)
        return response.status(200).json(user)
    }
}