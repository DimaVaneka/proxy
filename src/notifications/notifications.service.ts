import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NewUserEvent } from './events/new.user.event';
import { EventEmitter2 } from '@nestjs/event-emitter'; //new

@Injectable()
export class NotificationsService {
  @OnEvent('new.user')
  async notifyUser(payload: NewUserEvent) {
    console.log(`User with ${payload.email} has been created.`);
  }
}
