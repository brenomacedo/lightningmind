import { Module } from '@nestjs/common'
import UserModule from './user.module'
import AuthService from 'src/services/auth.service'
import { PassportModule } from '@nestjs/passport'
import LocalStrategy from 'src/auth/local.strategy'
import AppController from 'src/controllers/app.controller'
import { JwtModule } from '@nestjs/jwt'
import { jwtConst } from 'src/auth/consts'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtStrategy } from 'src/auth/jwt.strategy'
import UserEntity from 'src/entities/user.entity'

@Module({
    imports: [UserModule, PassportModule, JwtModule.register({
        secret: jwtConst.secret,
        signOptions: { expiresIn: 86400 },
    }), TypeOrmModule.forFeature([UserEntity])],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AppController],
    exports: [AuthService]
})
export default class AuthModule {}