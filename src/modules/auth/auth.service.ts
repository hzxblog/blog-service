import { Injectable, forwardRef, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersService } from '../users/users.service';
import { decrypt } from '../../utils/crypto';
import config from '../../config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken({ username, password }) {
    const user: any = await this.userService.findOne({ username });
    if (user && password === decrypt(user.password)) {
      const payload: JwtPayload = { username };
      const accessToken = this.jwtService.sign(payload);
      return {
        username,
        name: user.name,
        expiresIn: config.SIGN_EXPIRES_IN,
        accessToken,
      };
    }
    throw new HttpException('密码或帐号错误', HttpStatus.BAD_REQUEST);
  }

  async validateUser({ username }: JwtPayload): Promise<any> {
    return await this.userService.findOne({ username });
  }
}
