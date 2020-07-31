import { Controller, Request, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
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
}