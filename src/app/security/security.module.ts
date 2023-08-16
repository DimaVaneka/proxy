/* eslint-disable prettier/prettier */
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserEntity } from "../users/entities/user.entity";
import { JwtStrategyService } from "./jwt.strategy.service";
import { SecurityService } from "./security.service";
import { UserRepo } from "../users/repos/user.repo";


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt-strategy' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('app.jwt_secret'),
          signOptions: { expiresIn: '14d' },
        };
      },
      inject: [ConfigService],
    }),
    MikroOrmModule.forFeature({
      entities: [UserEntity],
    }),
  ],
  providers: [JwtStrategyService, SecurityService, UserRepo],
  exports: [SecurityService],
})
export class SecurityModule {}
