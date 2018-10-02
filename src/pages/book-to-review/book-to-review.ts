import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BookToReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-book-to-review',
  templateUrl: 'book-to-review.html',
})
export class BookToReviewPage {
  userId;
  fname;
  lname;
  contactNo;
  email;
  bookingDate;
  time;
  
  bookings=[];
  cuisine={
    userID:'',
   fname:'',
   lname:'',
   contactNo:'',
   email:'',
   bookingDate:'',
   time:''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    firebase.database().ref('/cuisine/').on("value",(snapshot)=>{

      snapshot.forEach((snap)=>{
 
     console.log(snap.val());
 
        this.bookings.push(snap.val());
       return false;
      });
     });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookToReviewPage');
  }
  writeBooking(){
    console.log(this.fname,this.lname,this.contactNo,this.email,this.bookingDate);
    this.cuisine.fname =this.fname;
    this.cuisine.lname =this.lname;
    this.cuisine.contactNo=this.contactNo;
    this.cuisine.email=this.email;
    this.cuisine.bookingDate=this.bookingDate;
    this.cuisine.time=this.time;
    var database = firebase.database();
    database.ref('/cuisine').push(this.cuisine);
    }
    Cancel(){
      this.navCtrl.push("CancelPage")
    }

}
