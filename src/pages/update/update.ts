import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase
@IonicPage()
@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {
  bookingDate;
  time;
  value:string;
  booking;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.booking = this.navParams.get('booking');
   
    this.value = this.booking.bookingDate;
   this.value = this.booking.time;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePage');
  }
  update(){
 
    var database = firebase.database();
    database.ref('bookingInfo/' + this.booking.key).set({bookingDate:this.bookingDate,time:this.time});
     this.navCtrl.push("BookingsPage");
 }
 
}
