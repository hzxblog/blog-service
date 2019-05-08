import { Controller, Post, Body, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, changePwdDto } from './dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { decrypt, encrypt } from '../../utils/crypto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto): Promise<any> {
    return await this.authService.createToken(body);
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(@Body() body: changePwdDto, @Request() req): Promise<any> {
    const { password, newPassword, confirmPassword } = body;
    // @ts-ignore
    const { username } = this.jwtService.decode(req.headers.authorization.split(' ')[1]);
    const user: any = await this.userService.findOne({ username });
    if (user && password === decrypt(user.password) && confirmPassword === newPassword) {
      await this.userService.updateOne(user._id, {
        password: encrypt(confirmPassword)
      });
      return {
        message: '修改密码成功'
      };
    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: '密码错误或确认密码错误',
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
