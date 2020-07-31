import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common'
import JwtAuthGuard from '../auth/jwt-auth.guard'
import LocalAuthGuard from '../auth/local-auth.guard'
import AuthService from 'src/services/auth.service'

@Controller()
export default class AppController {

    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/auth/login')
    async login(@Request() request: any) {
        return this.authService.login(request.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('test')
    async test() {
        return 'ola'
    }
}