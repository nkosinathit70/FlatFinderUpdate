import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

/**
 * Generated class for the BookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;

@IonicPage()
@Component({
  selector: 'page-bookings',
  templateUrl: 'bookings.html',
})
export class BookingsPage {
  userId;
  doBookings: FormGroup;
  bookingDate;
  time;
  flat;
  
  bookings=[];
  bookingInfo={
    userID:'',
  key:'',
   bookingDate:'',
   time:''
  }
  constructor(private fb:FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.userId = this.navParams.get("userId");
    if(this.userId){
      this.flat = this.navParams.get("flat");
    }
    console.log("boooking user ID =",this.userId);
    this.doBookings=this.fb.group({
     
     bookingDate:[Validators.required],
     time:['',[Validators.required]],
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingsPage');
  
  this.bookings = [];

  firebase.database().ref('/bookingInfo/').on("value",(snapshot)=>{
    // this.bookings=[];
    snapshot.forEach((snap)=>{

   console.log(snap.val());

    // this.bookings.push(snap.val());
    console.log(snap.val().bookingDate + ' key ' + snap.key)
      this.bookings.push({bookingDate:snap.val().bookingDate, key:snap.key,time:snap.val().time});



      
   return false;
  });
  });
}
writeBooking(){
  console.log(this.bookingDate,this.time);
  this.bookingInfo.userID = this.userId;
  this.bookingInfo.bookingDate=this.bookingDate;
  this.bookingInfo.time=this.time;
  var database = firebase.database();
  database.ref('/bookingInfo').push(this.bookingInfo);


}

removeBookings(booking){
  var database = firebase.database();
  database.ref('/bookingInfo/').remove();
  

  this.bookings = [];


}
update(booking){
  this.navCtrl.push("UpdatePage",{booking:booking});
}  
ViewPage(){
  this.navCtrl.push("WelcomePage");
}
}


