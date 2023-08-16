import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersModule } from './app/characters/characters.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import app_config from './config/app.config';
import database_config from './config/database.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from './app/auth/auth.module';
import { UsersModule } from './app/users/users.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationsModule } from './notifications/notifications.module';
import { NotificatonsService } from './notificatons/notificatons.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [app_config, database_config],
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    CharactersModule,
    AuthModule,
    UsersModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, NotificatonsService],
})
export class AppModule {}
