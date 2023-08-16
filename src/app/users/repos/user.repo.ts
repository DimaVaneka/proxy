/* eslint-disable prettier/prettier */
import { EntityRepository } from '@mikro-orm/postgresql';
import { UserEntity } from '../entities/user.entity';
import { UserSignInForm } from 'src/app/auth/dtos/user-sign-in.form';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepo extends EntityRepository<UserEntity> {
  async getList() {
    return await this.findAll();
  }

  async getById(id: string) {
    return await this.findOne({ id });
  }

  async getByEmail(email: string){
    return await this.findOne({email});
  }

  async getByEmailAndPassword(email: string, password: string){
    return await this.findOne({ email, password });
  }

  async addOneClient(dto : UserSignInForm){
    const newUser = this.create({
        email: dto.email,
        password: dto.password,
    });
    await this.em.persistAndFlush(newUser);
    return newUser;
  }
}
