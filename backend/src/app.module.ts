import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import UserEntity from './entities/user.entity'
import UserModule from './modules/user.module'

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "lm",
    entities: [UserEntity]
  }), UserModule]
})
export class AppModule {}
