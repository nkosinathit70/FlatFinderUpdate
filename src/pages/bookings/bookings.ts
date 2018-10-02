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
  fname;
  lname;
  contactNo;
  email;
  bookingDate;
  time;
  flat;
  
  bookings=[];
  bookingInfo={
    userID:'',
  key:'',
   fname:'',
   lname:'',
   contactNo:'',
   email:'',
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
      fname:['',[Validators.required,Validators.pattern('[a-zA-Z]*'),Validators.maxLength(20)]],
      lname:['',[Validators.required,Validators.pattern('[a-zA-Z]*'),Validators.maxLength(20)]],
      contactNo:['',[Validators.required,Validators.pattern('[a-zA-Z]*'),Validators.maxLength(20)]],
      email:['',[Validators.required,Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),Validators.maxLength(25)]],
      // bookingDate:[Validators.required,Validators.maxLength(10)],
      // time:['',[Validators.required,Validators.maxLength(10)]],
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
    console.log(snap.val().fname + ' key ' + snap.key)
      this.bookings.push({fname:snap.val().fname, key:snap.key,lname:snap.val().lname,contactNo:snap.val().contactNo,email:snap.val().email,
      bookingDate:snap.val().bookingDate,time:snap.val().time});



      
   return false;
  });
  });
}
writeBooking(){
  console.log(this.fname,this.lname,this.contactNo,this.email,this.bookingDate,this.time);
  this.bookingInfo.userID = this.userId;
  this.bookingInfo.fname =this.fname;
  this.bookingInfo.lname =this.lname;
  this.bookingInfo.contactNo=this.contactNo;
  this.bookingInfo.email=this.email;
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
ViewPage(){
  this.navCtrl.push("WelcomePage");
}
}


