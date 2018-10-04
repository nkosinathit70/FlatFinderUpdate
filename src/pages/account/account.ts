import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
role;
userID;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userID = this.navParams.get("userID");
    this.role = this.navParams.get("role");
    console.log(this.role);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  goTologin(){
    this.navCtrl.setRoot("LoginPage", {role: this.role});
  }

}
