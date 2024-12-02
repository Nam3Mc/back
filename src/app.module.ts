import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from '../config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from "@nestjs/jwt"
import { UserModule } from './modules/user/user.module';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { PropertyModule } from './modules/property/property.module';
import { ImageModule } from './modules/image/image.module';
import { ContractModule } from './modules/contract/contract.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ typeOrmConfig ],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ( 
        configService.get('typeorm') )
    }),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: "1h" },
      secret: process.env.JWT_SECRET,
    }),
    UserModule,
    AccountModule,
    AuthModule,
    PropertyModule,
    ImageModule,
    ContractModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
