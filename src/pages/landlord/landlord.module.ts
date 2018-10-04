import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LandlordPage } from './landlord';

@NgModule({
  declarations: [
    LandlordPage,
  ],
  imports: [
    IonicPageModule.forChild(LandlordPage),
  ],
})
export class LandlordPageModule {}
