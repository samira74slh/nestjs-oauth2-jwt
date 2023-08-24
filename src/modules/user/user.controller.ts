import { Controller, Get, Logger, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JWTAuthGuard } from '../auth/guards/jwt.auth.guard';
import { JWTRefreshGuard } from '../auth/guards/jwt.refresh.guard';
import { AuthService } from '../auth/auth.service';
import { USER } from '../auth/decorator/user.decorator';
import { User } from './user.entity';
import { Response } from 'express';

@Controller('user')
export class UserController {
    private logger = new Logger(UserController.name)
    constructor(private readonly userService: UserService,
        private readonly authService: AuthService) { }

    @UseGuards(JWTAuthGuard)
    @Get('protected')
    guardedRoute() {
        return this.userService.getProtectedMessage();
    }

    @UseGuards(JWTRefreshGuard)
    @Get('refresh')
    async refresh(@USER() { id, email, role }: User, @Res() res: Response) {
        const token = await this.authService.getAccessToken({ id: id, email: email, role: role })
        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: true,
            secure: false,
            expires: new Date(Date.now() + 1 * 5 * 60 * 1000),//5min
        });
        this.logger.verbose('access_token:' + token);
        res.sendStatus(200);
    }

    @Get('logout')
    async logout(@Res() res: Response) {
        res.clearCookie('access_token', { path: '/' });
        res.clearCookie('refresh_token', { path: '/' });
        res.redirect('/api/auth/google');
    }
}
