/* eslint-disable prettier/prettier */
import {  IsString, IsUUID } from "class-validator";

// ============ entities =============
import { UserEntity } from "src/app/users/entities/user.entity";

export class UserSessionDto {

    @IsUUID()
    id: string;

    @IsString()
    email: string;

    public static from(dto: UserSessionDto): UserSessionDto {
        return {
            id: dto.id,
            email: dto.email,
        };
    }

    public static fromEntity(entity: UserEntity): UserSessionDto {
        return {
            id: entity.id,
            email: entity.email,
        };
    }
}