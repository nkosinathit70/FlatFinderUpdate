import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvertisePage } from './advertise';

@NgModule({
  declarations: [
    AdvertisePage,
  ],
  imports: [
    IonicPageModule.forChild(AdvertisePage),
  ],
})
export class AdvertisePageModule {}
