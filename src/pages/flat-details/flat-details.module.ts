import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlatDetailsPage } from './flat-details';

@NgModule({
  declarations: [
    FlatDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FlatDetailsPage),
  ],
})
export class FlatDetailsPageModule {}
