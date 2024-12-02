import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
  ],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
  exports: [AccountRepository]
})
export class AccountModule {}
