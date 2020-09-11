import { Controller, Req, Res, Post, UseGuards, Get } from '@nestjs/common'
import { Request, Response } from 'express'
import JwtAuthGuard from '../auth/jwt-auth.guard'
import LocalAuthGuard from '../auth/local-auth.guard'
import AuthService from 'src/services/auth.service'

@Controller()
export default class AppController {

    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/auth/login')
    async login(@Req() request: any) {
        return this.authService.login(request.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/auth/verify')
    async verify(@Req() request: any, @Res() response: Response) {
        const user = await this.authService.verifyUser(request.user.userId.id)
        return response.status(200).json(user)
    }
}