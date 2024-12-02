import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { AuthDto } from 'src/dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post("signup")
  signUp(@Body() data: CreateUserDto ) {
    const user = this.authService.signUp(data)
    return user
  }

  @Post("signin")
  signIn(@Body() authData: AuthDto) {
    return this.authService.signIn(authData)
  }
}
