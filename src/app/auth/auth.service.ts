/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserSignInForm } from './dtos/user-sign-in.form';
import { ErrorCodes } from 'src/shared/enums/error-codes.enum';
import UserSignUpForm from './dtos/user-sign-up.form';
import { SecurityService } from '../security/security.service';
import { UserRepo } from '../users/repos/user.repo';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { NewUserEvent } from 'src/notifications/events/new.user.event';

@Injectable()
export class AuthService {
 constructor(private readonly repo_users : UserRepo,
   private readonly securityService : SecurityService,
   private eventEmitter: EventEmitter2,
   ){
 }

 @OnEvent('new.user')
 async notifyUser(payload: NewUserEvent) {
   console.log(`User with ${payload.email} has been created.`);
 }

 async signIn(form : UserSignInForm){
    const entity = await this.repo_users.getByEmailAndPassword(form.email, form.password);
    if(!entity){
        throw new BadRequestException({message : ErrorCodes.NotExists_User})
    }

    return await this.securityService.generateToken(entity);
 }

 async signUp(form : UserSignUpForm){
    const entity = await this.repo_users.addOneClient(form);

    this.eventEmitter.emit('new.user', new NewUserEvent(form.email,form.password, form.passwordConfirm))
    return await this.securityService.generateToken(entity);
 }

}
