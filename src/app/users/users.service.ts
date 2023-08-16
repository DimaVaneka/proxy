/* eslint-disable prettier/prettier */
import { NewUserForm } from './dtos/new-user.form';
import { UserRepo } from './repos/user.repo';

/* eslint-disable prettier/prettier */
export class UsersService {
    constructor(
        private readonly repo_users: UserRepo) {

    }

    async getUsers() {
        return await this.repo_users.getList();
    }

    async getUserByEmail(email: string) {
        return await this.repo_users.getByEmail(email);
    }

    async getUserInfo(userId: string) {
        return await this.repo_users.getById(userId)
    }

    async addNewUser(dto: NewUserForm) {
        return await this.repo_users.addOneClient(dto);
    }

}
