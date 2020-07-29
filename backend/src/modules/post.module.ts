import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import PostService from '../services/post.service'
import PostEntity from '../entities/post.entity'
import PostController from '../controllers/post.controller'

@Module({
    imports: [TypeOrmModule.forFeature([PostEntity])],
    controllers: [PostController],
    providers: [PostService]
})
export default class PostModule {}