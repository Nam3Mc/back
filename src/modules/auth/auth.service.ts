import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/dtos/auth.dto';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository
  ){}

  signUp(data: CreateUserDto ) {
    return this.authRepository.singUp(data)
  }

  signIn(authData: AuthDto) {
    return this.authRepository.sigIn(authData)
  }
}
