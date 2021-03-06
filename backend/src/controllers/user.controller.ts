import { Get, Post, Put, Delete, Controller, Req, Res, UseInterceptors, UploadedFile } from "@nestjs/common"
import { FileInterceptor } from '@nestjs/platform-express'
import { Request, Response } from 'express'
import userService from '../services/user.service'
import * as multer from 'multer'
import * as crypto from 'crypto'
import * as path from 'path'

@Controller()
export default class userController {
    constructor(private readonly userService: userService) {}

    @Post("/user/create")
    async createUser(@Req() request: Request, @Res() response: Response) {
        const { name, email, password } = request.body
        const user = await this.userService.createUser(name, password, email)
        return response.status(200).json(user)
    }

    @Put('/user/upload/:id')
    @UseInterceptors(FileInterceptor('file', {
        dest: path.resolve(__dirname, '..', '..', 'uploads'),
        storage: multer.diskStorage({
            filename: (req, file: any, cb) => {
                const newFilename = crypto.randomBytes(16).toString('hex')
                file.newName = `${newFilename}-${file.originalname}`
                cb(null, file.newName)
            },
            destination: (req, file, cb) => {
                cb(null, path.resolve(__dirname, '..', '..', 'uploads'))
            }
        }),
        limits: {
            fileSize: 1024 * 1024 * 2
        },
        fileFilter: (req, file, cb) => {
            const types = [
                'image/jpg',
                'image/jpeg',
                'image/png'
            ]

            if(types.includes(file.mimetype)) {
                cb(null, true)
            } else {
                cb(new Error('invalid type'), false)
            }
        }
    }))
    async uploadFile(@UploadedFile() file: any, @Req() request: Request, @Res() response: Response) {
        const { id } = request.params
        const res = await this.userService.updateUserImage(Number(id), file.newName)
        return response.status(200).json(res)
    }

    @Put('/user/update/:id')
    async updateUser(@Req() request: Request, @Res() response: Response) {
        const { id } = request.params
        const { name, password, currentPassword } = request.body
        const resp = await this.userService.updateUser(Number(id), name, password, currentPassword)
        if(resp.status) {
            return response.status(200).json(resp.payload)
        } else {
            return response.status(500).json({ message: "incorrect password" })
        }
    }

    @Put('/user/premium/:id')
    async updateUserPremium(@Req() request: Request, @Res() response: Response) {
        const { id } = request.params
        await this.userService.updateUserPremium(Number(id))
        response.status(200).json({ message: "premium set successfuly!" })
    }

    @Put('/user/favorites/add/:userid/:postid')
    async addUserFavorite(@Req() request: Request, @Res() response: Response) {
        const { userid, postid } = request.params
        const res = await this.userService.setUserFavorite(Number(userid), Number(postid))
        return response.status(200).json(res)
    }

    @Put('/user/favorites/remove/:userid/:postid')
    async removeUserFavorite(@Req() request: Request, @Res() response: Response) {
        const { userid, postid } = request.params
        const res = await this.userService.removeUserFavorite(Number(userid), Number(postid))
        return response.status(200).json(res)
    }
}