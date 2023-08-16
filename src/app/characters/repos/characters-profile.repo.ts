import { Injectable } from '@nestjs/common';
import { CharactersProfileEntity } from '../entities/charactersProfile.entity';
import { ApiEntity } from '../entities/api.entity';
import { CharacterEntity } from '../entities/characters.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';

@Injectable()
export class CharactersProfileRepo extends EntityRepository<CharactersProfileEntity> {
  constructor(private readonly manager: EntityManager) {
    super(manager, CharactersProfileEntity);
  }
  async addProfiles(apiEntity: ApiEntity[]) {
    console.log(apiEntity);
    const charactersProfiles = apiEntity.map((characterApi) => {
      return this.create({
        name: characterApi.name,
        status: characterApi.status,
        species: characterApi.species,
        type: characterApi.type,
        gender: characterApi.gender,
        origin: characterApi.origin,
        location: characterApi.location,
        image: characterApi.image,
        episode: characterApi.episode,
        url: characterApi.url,
        created: characterApi.created,
        user: {
          name: characterApi.name,
          created: characterApi.created,
        },
      });
    });
    return this.em.persistAndFlush(charactersProfiles);
  }
}
