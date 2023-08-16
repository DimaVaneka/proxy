/* eslint-disable prettier/prettier */
import { Strategy,ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SecurityService } from './security.service';
import { UserSessionDto } from './dtos/user-session.dto';
import { ErrorCodes } from 'src/shared/enums/error-codes.enum';
import * as passport from 'passport';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy, "jwt-strategy") {
    readonly name = "jwt-strategy";

    constructor(
        private readonly configService: ConfigService,
        private readonly securityService: SecurityService
      ) {
        super(
          {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            secretOrKey: configService.get("app.jwt_secret")
          },
          async (req, payload, next) => await this.verify(req, payload, next)
        );
      }

    public async verify(req, payload: UserSessionDto, done){
        const user = await this.securityService.getUserById(payload.id);

        if(!user){
            return done(ErrorCodes.NotExists_User, false);
        }

        done(null, payload);

    }
}
