import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AccountModule
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports:[ UserRepository]
})
export class UserModule {}
