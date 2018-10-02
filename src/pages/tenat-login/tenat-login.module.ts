import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TenatLoginPage } from './tenat-login';

@NgModule({
  declarations: [
    TenatLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(TenatLoginPage),
  ],
})
export class TenatLoginPageModule {}
