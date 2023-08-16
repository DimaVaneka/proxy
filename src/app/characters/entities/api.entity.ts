import { Property, Enum, OneToOne, Entity, PrimaryKey } from '@mikro-orm/core';
import { UUIDEntity } from 'src/shared/entities/uuid.entity';
import { CharactersGender } from '../enums/characters-gender';
import { CharactersStatuses } from '../enums/characters-statuses';
import { CharacterEntity } from './characters.entity';
import { CharactersProperty } from '../types/characters-property.type';
import { ApiRepo } from '../repos/api.repo';

@Entity({
  abstract: true,
})
export class ApiEntity {
  @PrimaryKey()
  id: number;

  @Property({ name: 'name' })
  name!: string;

  @Enum({ name: 'status', array: false, items: () => CharactersStatuses })
  status!: CharactersStatuses;

  @Property({ name: 'species', type: 'text' })
  species!: string;

  @Property({ name: 'type' })
  type!: string | null;

  @Enum({ name: 'gender', array: false, items: () => CharactersGender })
  gender!: string;

  @Property({ name: 'origin', type: 'JSON' })
  origin!: CharactersProperty;

  @Property({ name: 'location', type: 'JSON' })
  location!: CharactersProperty;

  @Property({ name: 'image' })
  image!: string;

  @Property({ name: 'episode', type: 'JSON' })
  episode!: string[];

  @Property({ name: 'url' })
  url!: string;

  @Property()
  created!: Date;
}
