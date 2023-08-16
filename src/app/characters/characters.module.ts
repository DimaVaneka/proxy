/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { ApiRepo } from './repos/api.repo';
import { ConfigModule } from '@nestjs/config';
import { CharactersProfileRepo } from './repos/characters-profile.repo';
import { CharactersProfileEntity } from './entities/charactersProfile.entity';
import { ApiEntity } from './entities/api.entity';
import { CharacterEntity } from './entities/characters.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({ baseURL: process.env.RICK_AND_MORTY_API }),
    MikroOrmModule.forFeature({
      entities: [CharactersProfileEntity, CharacterEntity],
    }),
  ],
  controllers: [CharactersController],
  providers: [CharactersService, ApiRepo, CharactersProfileRepo],
})
export class CharactersModule {}
