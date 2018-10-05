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
  flat:any;
  userId;
  fname;
  lname;
  contactNo;
  email;
  bookingDate;
  time;
  bookingInfo :Person = {
    
    tenantID:"",
    fname:"",
    lname:"",
    contactNo:0,
    email:"",
    date:"",
    time:"",
    landID:""
  }
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
    //console.log(this.fname,this.lname,this.contactNo,this.email,this.bookingDate,this.time);
  if(this.userId){
    this.bookingInfo.tenantID = this.userId;
    this.bookingInfo.fname =this.fname;
    this.bookingInfo.lname =this.lname;
    this.bookingInfo.contactNo=this.contactNo;
    this.bookingInfo.email=this.email;
    this.bookingInfo.date=this.bookingDate;
    this.bookingInfo.time=this.time;
    this.bookingInfo.landID= this.flat.landID;
   // this.bookingList.push(this.bookingInfo);
    var database = firebase.database();
    database.ref('/bookingInfo').push(this.bookingInfo);
  }else{
    this.navCtrl.push("ClientPage");

  }
  
  }
  
  removeBookings(booking){
    var database = firebase.database();
    database.ref('/bookingInfo/').remove();
    
  

}
}
