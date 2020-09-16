import { Controller, Req, Res, Post, UseGuards, Get } from '@nestjs/common'
import { Request, Response } from 'express'
import JwtAuthGuard from '../auth/jwt-auth.guard'
import LocalAuthGuard from '../auth/local-auth.guard'
import AuthService from 'src/services/auth.service'
import stripe from 'stripe'
import * as dotenv from 'dotenv'
import { v4 as uuid } from 'uuid'

dotenv.config()

const Stripe = new stripe(String(process.env.KEY), {
    apiVersion: "2020-08-27"
})

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

    @Post('/premium/buy')
    async buyPremium(@Req() request: Request, @Res() response: Response) {
        const { product, token } = request.body
        const idempotencyKey = uuid()
        return Stripe.customers.create({
            email: token.email,
            source: token.id
        }).then(customer => {
            Stripe.charges.create({
                amount: product.price * 100,
                currency: 'brl',
                customer: customer.id,
                receipt_email: token.email,
                description: `purchase of ${product.name}`,
                shipping: {
                    name: token.card.name,
                    address: {
                        country: token.card.address_country,
                        line1: 'react client'
                    }
                }
            }, { idempotencyKey })
        }).then(result => {
            response.status(200).json(result)
        }).catch(err => {
            response.status(500).json(err)
        })
    }
}