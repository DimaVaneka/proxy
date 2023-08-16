import { Module } from '@nestjs/common';
import { NotificatonsService } from '../notificatons/notificatons.service';
import { NotificationsService } from './notifications.service';

@Module({
  controllers: [],
  providers: [NotificatonsService],
  exports: [NotificationsModule],
})
export class NotificationsModule {}
