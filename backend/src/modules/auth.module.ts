import { Module } from '@nestjs/common'
import UserModule from './user.module'
import AuthService from 'src/services/auth.service'
import { PassportModule } from '@nestjs/passport'
import LocalStrategy from 'src/auth/local.strategy'

@Module({
    imports: [UserModule, PassportModule],
    providers: [AuthService, LocalStrategy]
})
export default class AuthModule {}