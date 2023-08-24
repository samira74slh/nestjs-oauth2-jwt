import { Inject, Injectable } from '@nestjs/common';
import { IJwtPayload } from './interface/payload.interface';
import { JwtService } from '@nestjs/jwt';
import localConfig from 'src/config/local-config';
import { ConfigType } from '@nestjs/config';
import { GetTokenResDto } from './dto/get-token-res.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(localConfig.KEY) private readonly configService: ConfigType<typeof localConfig>,
        private readonly jwtService: JwtService,
    ) { }

    async getAccessToken(payload: IJwtPayload): Promise<string> {
        try {
            return await this.jwtService.signAsync(payload, {
                secret: this.configService.jwt.accessTokenSecret
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getRefreshToken(payload: IJwtPayload): Promise<string> {
        try {
            return await this.jwtService.signAsync(payload, {
                secret: this.configService.jwt.refreshTokenSecret
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getToken(payload: IJwtPayload): Promise<GetTokenResDto> {
        try {
            return {
                accessToken: await this.getAccessToken(payload),
                refreshToken: await this.getRefreshToken(payload)
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}
