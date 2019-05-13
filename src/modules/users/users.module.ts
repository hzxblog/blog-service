import { Module, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { encrypt } from '../../utils/crypto';
import config from '../../config';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule implements OnModuleInit {
  constructor(private readonly userService: UsersService) {}

  async onModuleInit(): Promise<void> {
    await this.initAdmin();
  }

  private async initAdmin() {
    const auth = await this.userService.findOne({ username: config.DEFAULT_USERNAME });
    if (!auth) {
      const password = encrypt(config.DEFAULT_PASSWORD);

      await this.userService.create({
        username: config.DEFAULT_USERNAME,
        password,
        email: '524042331@qq.com',
        name: '韩志雄',
        age: 26,
        phone: 15972017584,
        address: '湖北省武汉市',
        work_years: 3,
      });
    }
  }
}
