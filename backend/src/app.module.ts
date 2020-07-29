import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import UserEntity from './entities/user.entity'
import PostEntity from './entities/post.entity'
import UserModule from './modules/user.module'
import PostModule from './modules/post.module'

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "lm",
    entities: [UserEntity, PostEntity]
  }), UserModule, PostModule]
})
export class AppModule {}
