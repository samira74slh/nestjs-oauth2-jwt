import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { Request, Response } from 'express';
import { USER } from './decorator/user.decorator';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) { }

  @UseGuards(GoogleOAuthGuard)
  @Get('/google')
  async googleAuth() { }

  @UseGuards(GoogleOAuthGuard)
  @Get('/google/callback')
  async googleCallbackUrl(@USER() { id, role, email }: User, @Req() req: Request, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.getToken({ id: id, email: email, role: role });
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      sameSite: true,
      secure: false,
      expires: new Date(Date.now() + 1 * 5 * 60 * 1000),//5min
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: true,
      secure: false,
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000),//60min
    });
    this.logger.verbose('access_token:' + accessToken);
    this.logger.verbose('refresh_token:' + refreshToken);
    res.sendStatus(200);
  }
}
