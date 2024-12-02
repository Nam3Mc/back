import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { UserModule } from '../user/user.module';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [UserModule, AccountModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  exports: [AuthRepository]
})
export class AuthModule {}
