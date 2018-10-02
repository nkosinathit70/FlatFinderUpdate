import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CancelPage } from './cancel';

@NgModule({
  declarations: [
    CancelPage,
  ],
  imports: [
    IonicPageModule.forChild(CancelPage),
  ],
})
export class CancelPageModule {}
