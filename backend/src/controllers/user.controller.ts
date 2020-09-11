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

    @Post('/user/upload')
    @UseInterceptors(FileInterceptor('file', {
        dest: path.resolve(__dirname, '..', '..', 'uploads'),
        storage: multer.diskStorage({
            filename: (req, file, cb) => {
                const newFilename = crypto.randomBytes(16).toString('hex')
                cb(null, `${newFilename}-${file.originalname}`)
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
    uploadFile(@UploadedFile() file: any) {
        return file.originalname
    }
}