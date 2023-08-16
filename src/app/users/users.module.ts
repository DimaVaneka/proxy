/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SecurityModule } from '../security/security.module';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [UserEntity],
    }),
    SecurityModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
