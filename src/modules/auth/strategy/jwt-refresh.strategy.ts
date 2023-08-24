import { Inject, Injectable } from "@nestjs/common";
import { ConfigService, ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { IJwtPayload } from "../interface/payload.interface";
import localConfig from "src/config/local-config";

@Injectable()
export class JWTRefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh-token'
) {
    constructor(
        @Inject(localConfig.KEY) private readonly configService: ConfigType<typeof localConfig>
    ) {
        super({
            secretOrKey: configService.jwt.refreshTokenSecret,
            passReqToCallback: true,
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.cookies?.refresh_token
            }])
        });
    }

    async validate(payload: IJwtPayload) {
        return payload;
    }
}