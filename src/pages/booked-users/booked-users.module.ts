import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookedUsersPage } from './booked-users';

@NgModule({
  declarations: [
    BookedUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(BookedUsersPage),
  ],
})
export class BookedUsersPageModule {}
