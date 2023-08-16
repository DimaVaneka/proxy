/* eslint-disable prettier/prettier */

import { NewUserForm } from './dtos/new-user.form';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { Controller, Param, Body, Get, Post, BadRequestException } from '@nestjs/common';


@Controller("users")
export class UsersController {

    constructor(private readonly usersService: UsersService) {

    }

    @Get()
    async getUsers() {
        const entities = await this.usersService.getUsers();
        const users = UserDto.fromEntities(entities);
        return users;
    }

    @Get(":userId")
    async getUserInfo(@Param("userId") userId: string) {
        const entity = await this.usersService.getUserInfo(userId);
        const user = UserDto.fromEntity(entity);
        return user;
    }

    @Post()
    async addUser(@Body() body: NewUserForm[]) {
        const [form] = body;

        const dto = NewUserForm.from(form)
        const errors = await NewUserForm.validate(dto);

        if (errors) {
            throw new BadRequestException({ message: "errors.invalid-form.user-new ", errors });
        }

        const entity = await this.usersService.addNewUser(dto);
        const user = UserDto.fromEntity(entity);
        return user;
    }


}
