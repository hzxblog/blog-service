import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  email: string;
  phone: number;
  age: number;
  address: string;
  work_years: number;
}


export class UpdateUserDto {

  email: string;
  phone: number;
  age: number;
  address: string;
  work_years: number;
}
