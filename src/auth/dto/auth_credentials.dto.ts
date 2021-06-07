import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password to weak' })
  password: string;
}

export class LoginCredentialsDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password to weak' })
  password: string;
}