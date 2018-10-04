import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { errorHandler } from '@angular/platform-browser/src/browser';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  users: FormGroup;
  display=0;
  role = "";


  
  signup:boolean=false;
  logins:boolean=false;
  
  fname;
  lname;
  email;
  password;
  contactNo;
  userId;
  Bookings = [];

 
  landlord={
    fname:"",
    lname:"",
    contactNo:"",
    email: "",
    password:"",
  }

  client = {
    fname:"",
    lname:"",
    contactNo:"",
    email: "",
    password:"",

  }

  loginError: string;

  constructor(private fb:FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.users=this.fb.group({
      email:['',[Validators.required,Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),Validators.maxLength(25)]],
      password:['',[Validators.required,Validators.minLength(6)]],
      fname:['',[Validators.required,Validators.pattern('[a-zA-Z]*'),Validators.maxLength(20)]],
      lname:['',[Validators.required,Validators.pattern('[a-zA-Z]*'),Validators.maxLength(20)]],
      contactNo:['',[Validators.required,Validators.maxLength(10)]],
     })

     this.role = this.navParams.get("role");

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


  loginDirect(){
    this.navCtrl.setRoot("LoginPage")

  }

  userSignup(){

    if(this.role == "Landlord"){
      firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(user => {
        this.userId = user.user.uid;
     
      firebase.database().ref('/Landlords_TBL/' + user.user.uid ).set(
         {
  
          userID:this.userId,
          fname:this.fname,
          lname:this.lname,
          contactNo:this.contactNo,
          email: this.email,
          password:this.password,
          role: this.role,
          
  
          Bookings:{}
  
        }
      )
      this.navCtrl.setRoot("AccountPage",{userId:this.userId,role:this.role});
      }).key 
    }else if(this.role == "Client"){
          firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(user => {
            this.userId = user.user.uid;
            
          firebase.database().ref('/Clients_TBL/' + user.user.uid ).set(
            {
      
              userID:this.userId,
              fname:this.fname,
              lname:this.lname,
              contactNo:this.contactNo,
              email: this.email,
              password:this.password,
              role: this.role,
              Bookings:{}
      
            }
          )
          this.navCtrl.setRoot("AccountPage",{userId:this.userId,role:this.role})         
        }).key
        }

    }
   
  
    loginl(){
     this.navCtrl.setRoot("LoginPage");
    }
    reset(){
      this.navCtrl.push("ResetPage");
    }

    
  back(){
    this.navCtrl.setRoot("WelcomePage");
  }
   


   

}
