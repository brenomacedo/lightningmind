import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import PostService from '../services/post.service'
import PostEntity from '../entities/post.entity'
import PostController from '../controllers/post.controller'
import UserEntity from 'src/entities/user.entity'

@Module({
    imports: [TypeOrmModule.forFeature([PostEntity, UserEntity])],
    controllers: [PostController],
    providers: [PostService]
})
export default class PostModule {}