import { Injectable } from '@nestjs/common';
import { ApiRepo } from './repos/api.repo';
import { ApiEntity } from './entities/api.entity';
import { CharacterDto } from './dtos/character.dto';
import { CharactersProfileRepo } from './repos/characters-profile.repo';

@Injectable()
export class CharactersService {
  constructor(
    private readonly api: ApiRepo,
    private readonly repo_characters_profile: CharactersProfileRepo,
  ) {}

  public async getCharactersFromPage(page: number, resultsPerPage: number) {
    const pageToGet = await this.getAllCharacters();
    return pageToGet.slice(0, resultsPerPage);
  }

  public async getAllCharacters() {
    const page1 = await this.api.getPage(1);
    return page1;
  }

  public async getOneCharacter(id: string) {
    const character = await this.api.getCharacterById(id);
    return character;
  }

  public async fillWithCharacters() {
    const allCharacters = await this.getAllCharacters();
    await this.repo_characters_profile.addProfiles(allCharacters);
  }
}
