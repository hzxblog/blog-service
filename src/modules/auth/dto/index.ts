import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class changePwdDto {
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly newPassword: string;

  @IsNotEmpty()
  @IsString()
  readonly confirmPassword: string;
}
