import { Get, Post, Put, Delete, Controller } from "@nestjs/common"
import userService from '../services/user.service'

@Controller()
export default class userController {
    constructor(private readonly userService: userService) {}

    @Get("/test")
    async findAll() {
        return this.userService.findAll()
    }
}