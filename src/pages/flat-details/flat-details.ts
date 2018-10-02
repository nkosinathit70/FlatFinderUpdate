import { TANENTS } from './../../mocks/person.mocks';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the FlatDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-flat-details',
  templateUrl: 'flat-details.html',
})
export class FlatDetailsPage {
  flat:any;
  userId;
  cellphone;
  bookingDate;
  time;
  fname;
  lname;
  contactNo;
  email;
  date;
  Time;
  landID;
  card = 0;
  bookingList = TANENTS;

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
      //this.count =0;
       firebase.database().ref('/bookingInfo/').on('value', (snapshot) =>
     {
        
      
       snapshot.forEach((snap) => 
       { 
       
       // firebase.database().ref('/Flats/').push({landID:this.landID,contactNo:this.contactNo,fname:this.fname,downloadUrl: this.fire.downloadUrl,flatname:this.flatName, description:this.description,Address:this.Address, Price: this.Price});
          this.bookingInfo.tenantID = snap.val().tenantID;
          this.bookingInfo.fname = snap.va().fname;
          this.bookingInfo.lname = snap.va().lname;
          this.bookingInfo.contactNo = snap.va().contactNo;
          this.bookingInfo.email=snap.va().email;
          this.bookingInfo.date=snap.va().date;
          this.bookingInfo.time=snap.va().time;
          this.bookingInfo.landID= snap.va().landID;
        
          this.bookingList.push(this.bookingInfo);
 
         return false;
       });
       
     });
     
    this.flat = this.navParams.get('flat');
    console.log(this.navParams.get('flat'));
    this.userId = this.navParams.get("userId");
    console.log(" booker  =",this.flat.landID);
    console.log(" tenanent  =",this.userId);


  }
  checkStatus(){

     if(this.userId){
      this.card = 1;
     }
     else{
    this.navCtrl.push("ClientPage");

     }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FlatDetailsPage');
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
    this.bookingList.push(this.bookingInfo);
    var database = firebase.database();
    database.ref('/bookingInfo').push(this.bookingInfo);
  }else{
    this.navCtrl.push("ClientPage");

  }
  
  }
  
  removeBookings(booking){
    var database = firebase.database();
    database.ref('/bookingInfo/').remove();
    
  
    //this.bookingList = [];
  
  
  }
}
