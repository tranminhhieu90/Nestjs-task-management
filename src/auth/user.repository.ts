import { AuthCredentialsDto } from './dto/auth_credentials.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { EntityRepository, Repository } from "typeorm";
import { ConflictException, HttpCode, HttpStatus, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User>{
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    const { firstName, lastName, email, password } = authCredentialsDto;
    const user = new User();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.isVerified = false;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      return {
        statusCode : HttpStatus.OK,
        data: 'Registered Successfully'
      }
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string>{
    const {email, password} = authCredentialsDto;
    const user = await this.findOne({email});

    if(user && await user.validatePassword(password)){
      return email
    } else {
      return null
    }
  }
  private async hashPassword(password: string, salt: string): Promise<string>{
    return bcrypt.hash(password,salt)
  }
}