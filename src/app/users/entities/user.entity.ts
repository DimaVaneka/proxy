/* eslint-disable prettier/prettier */
import { UUIDEntity } from 'src/shared/entities/uuid.entity';
import { UserRepo } from 'src/app/users/repos/user.repo';
import { Entity, EntityRepositoryType, Property } from '@mikro-orm/core';

@Entity({ tableName: 'user', customRepository: () => UserRepo })
export class UserEntity extends UUIDEntity {
    [EntityRepositoryType]?: UserRepo;

    @Property({name : "email"})
    email!: string;

    @Property({name: "phone", nullable: true})
    phone?: string;

    @Property({name: "password"})
    password!: string;
}

