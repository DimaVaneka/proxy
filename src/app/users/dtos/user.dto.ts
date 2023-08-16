/* eslint-disable prettier/prettier */
import { UserEntity } from 'src/app/users/entities/user.entity';
import { UUIDDto } from 'src/shared/dtos/uuid.dto';

export class UserDto extends UUIDDto {
  email!: string;

  phone?: string;

  static fromEntity(entity?: UserEntity) {
    if (!entity) {
      return;
    }
    const it = new UserDto();
    it.id = entity.id;
    it.created = entity.created.valueOf();
    it.updated = entity.updated.valueOf();
    it.email = entity.email;
    it.phone = entity.phone;

    return it;
  }

  static fromEntities(entities?: UserEntity[]) {
    if (!entities?.map) {
      return;
    }
    return entities.map((entity) => this.fromEntity(entity));
  }
}
