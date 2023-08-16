import { ApiEntity } from '../entities/api.entity';
import { CharactersProperty } from '../types/characters-property.type';

export class OriginDto {
  name: string;
  url: string;
}

export class LocationDto {
  name: string;
  url: string;
}

export class CharacterDto {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: CharactersProperty;
  location: CharactersProperty;
  image: string;
  episode: string[];
  url: string;
  created: Date;

  public static fromEntity(entity?: ApiEntity) {
    if (!entity) {
      return;
    }

    const dto = new CharacterDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.status = entity.status;
    dto.species = entity.species;
    dto.type = entity.type;
    dto.gender = entity.gender;
    dto.origin = this.mapOriginEntityToDto(entity.origin);
    dto.location = this.mapLocationEntityToDto(entity.location);
    dto.image = entity.image;
    dto.episode = entity.episode;
    dto.url = entity.url;
    dto.created = entity.created;

    return dto;
  }

  private static mapOriginEntityToDto(
    origin: CharactersProperty,
  ): CharactersProperty | undefined {
    if (!origin) {
      return undefined;
    }

    const originDto = new OriginDto();
    originDto.name = origin.name;
    originDto.url = origin.url;

    return originDto;
  }

  private static mapLocationEntityToDto(
    location: CharactersProperty,
  ): CharactersProperty | undefined {
    if (!location) {
      return undefined;
    }

    const locationDto = new LocationDto();
    locationDto.name = location.name;
    locationDto.url = location.url;

    return locationDto;
  }

  public static fromEntities(entities?: ApiEntity[]) {
    if (!entities?.map) {
      return;
    }

    return entities.map((entity) => this.fromEntity(entity));
  }
}
