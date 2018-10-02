import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserIsBookingPage } from './user-is-booking';

@NgModule({
  declarations: [
    UserIsBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(UserIsBookingPage),
  ],
})
export class UserIsBookingPageModule {}
