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

    @Post("/user/login")
    async login() {

    }

    @Get("/user/find/:id")
    async findUser(@Req() request: Request, @Res() response: Response) {
        const user = await this.userService.findUser(Number(request.params.id))
        if(!user) {
            return response.status(400).send("user not found")
        }

        return response.status(200).json(user)
    }
}