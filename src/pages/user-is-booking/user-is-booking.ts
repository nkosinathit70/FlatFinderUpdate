import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TANENTS } from '../../mocks/person.mocks';

/**
 * Generated class for the UserIsBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-is-booking',
  templateUrl: 'user-is-booking.html',
})
export class UserIsBookingPage {
  name: string;
  peopleList=TANENTS;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserIsBookingPage');
  }

}
