import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MysqlModule } from '../mysql/mysql.module';
import { userProviders } from './user.providers';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [MysqlModule,forwardRef(() => AuthModule)],
  providers: [...userProviders, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
