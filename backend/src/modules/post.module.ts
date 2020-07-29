import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import PostService from '../services/post.service'
import UserEntity from '../entities/user.entity'
import UserController from '../controllers/user.controller'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [PostService]
})
export default class PostModule {}