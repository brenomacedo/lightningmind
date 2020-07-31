import { Module } from '@nestjs/common'
import UserModule from './user.module';
import AuthService from 'src/services/auth.service';

@Module({
    imports: [UserModule],
    providers: [AuthService]
})
export default class AuthModule {}