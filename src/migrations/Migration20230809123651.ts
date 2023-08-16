import { Migration } from '@mikro-orm/migrations';

export class Migration20230809123651 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "characters_profiles" ("id" serial primary key, "name" varchar(255) not null, "status" text check ("status" in (\'Alive\', \'unknown\', \'Dead\')) not null, "species" text not null, "type" varchar(255) not null, "gender" text check ("gender" in (\'Male\', \'Female\', \'unknown\')) not null, "origin" jsonb not null, "location" jsonb not null, "image" varchar(255) not null, "episode" jsonb not null, "url" varchar(255) not null, "created" timestamptz(0) not null);');

    this.addSql('create table "character_entity" ("id" serial primary key, "name" varchar(255) not null, "created" timestamptz(0) not null, "profile_id" int not null);');
    this.addSql('alter table "character_entity" add constraint "character_entity_profile_id_unique" unique ("profile_id");');

    this.addSql('create table "user" ("id" uuid not null, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "email" varchar(255) not null, "phone" varchar(255) null, "password" varchar(255) not null, constraint "user_pkey" primary key ("id"));');

    this.addSql('alter table "character_entity" add constraint "character_entity_profile_id_foreign" foreign key ("profile_id") references "characters_profiles" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "character_entity" drop constraint "character_entity_profile_id_foreign";');

    this.addSql('drop table if exists "characters_profiles" cascade;');

    this.addSql('drop table if exists "character_entity" cascade;');

    this.addSql('drop table if exists "user" cascade;');
  }

}
