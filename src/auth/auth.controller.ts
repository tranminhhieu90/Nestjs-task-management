import { AuthCredentialsDto, LoginCredentialsDto } from './dto/auth_credentials.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }
  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto)
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) loginCredentialsDto: LoginCredentialsDto): Promise<{accessToken: string}> {
    return this.authService.signIn(loginCredentialsDto)
  }
}
