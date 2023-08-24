import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWTStrategy } from './strategy/jwt.strategy';
import { JWTRefreshTokenStrategy } from './strategy/jwt-refresh.strategy';

@Module({
  imports: [forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('jwt.accessTokenSecret')
        };
      },
      inject: [ConfigService]
    }),],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy,JWTStrategy,JWTRefreshTokenStrategy],
  exports:[AuthService]
})
export class AuthModule { }
