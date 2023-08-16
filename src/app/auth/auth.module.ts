/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from '../users/entities/user.entity';
import { SecurityModule } from '../security/security.module';
import { AuthController } from './auth.controller';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [
        UserEntity
      ],
    }),
    SecurityModule,
    NotificationsModule
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
