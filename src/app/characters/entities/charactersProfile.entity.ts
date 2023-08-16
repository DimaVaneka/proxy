import {
  Entity,
  Property,
  Enum,
  OneToMany,
  OneToOne,
  PrimaryKey,
} from '@mikro-orm/core';
import { UUIDEntity } from 'src/shared/entities/uuid.entity';
import { CharactersStatuses } from '../enums/characters-statuses';
import { CharactersGender } from '../enums/characters-gender';
import { CharactersProperty } from '../types/characters-property.type';
import { CharacterEntity } from '../entities/characters.entity';
import { CharactersProfileRepo } from '../repos/characters-profile.repo';

@Entity({
  tableName: 'characters_profiles',
  customRepository: () => CharactersProfileRepo,
})
export class CharactersProfileEntity {
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
  created: Date;

  @OneToOne(() => CharacterEntity, {
    lazy: true,
    mappedBy: 'profile',
  })
  user!: CharacterEntity;
}
