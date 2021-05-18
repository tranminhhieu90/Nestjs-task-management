import { AuthCredentialsDto } from './dto/auth_credentials.dto';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) { }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto)
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const username =  await this.userRepository.validateUserPassword(authCredentialsDto);
   if(!username){
     throw new UnauthorizedException('Invalid credentials')
   }
  }
}
