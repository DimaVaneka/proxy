import { Entity, Property, Enum, OneToOne, PrimaryKey } from '@mikro-orm/core';
import { UUIDEntity } from 'src/shared/entities/uuid.entity';
import { CharactersProfileEntity } from './charactersProfile.entity';

@Entity()
export class CharacterEntity {
  @PrimaryKey()
  id: number;

  @Property({ name: 'name' })
  name!: string;

  @Property()
  created!: Date;

  @OneToOne(() => CharactersProfileEntity)
  profile!: CharactersProfileEntity;
}
