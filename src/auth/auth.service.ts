import { JwtPayload } from './jwt-payload.inerface';
import {
  AuthCredentialsDto,
  LoginCredentialsDto,
} from './dto/auth_credentials.dto';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    loginCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const email = await this.userRepository.validateUserPassword(
      loginCredentialsDto,
    );
    if (!email) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
