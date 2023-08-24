import { Inject } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import localConfig from "src/config/local-config";
import { IJwtPayload } from "../interface/payload.interface";
import { Request } from 'express';

export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @Inject(localConfig.KEY) private readonly configService: ConfigType<typeof localConfig>) {
            super({
            secretOrKey: configService.jwt.accessTokenSecret,
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromExtractors([
                JWTStrategy.extractJWTFromCookie,
            ]),
        });
    }


    private static extractJWTFromCookie(req: Request): string | null {
        if (req?.cookies?.access_token) {
            return req.cookies.access_token;
        }
        return null;
    }
    
    async validate(payload: IJwtPayload) {
        return payload;
    }
}