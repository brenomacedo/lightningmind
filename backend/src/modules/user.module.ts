import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import UserService from '../services/user.service'
import UserEntity from '../entities/user.entity'
import UserController from '../controllers/user.controller'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService]
})
export default class PhotoModule {}