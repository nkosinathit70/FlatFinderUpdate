import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login: FormGroup;
  display = 0;
  email;
  TenantList = {
    ContactNo:"",
    fname:"",
    lname:"",
    role:"",
    userID:""
  };

  LandLordList = {
    ContactNo:"",
  fname:"",
  lname:"",
  role:"",
  userId:""
  }
  password;
  ids;
  role;
  constructor(private fb:FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
this.role = this.navParams.get("role");
console.log("role",this.role);
    this.login = this.fb.group({
     
      email:['',Validators.compose([Validators.maxLength(25),Validators.pattern('^[a-zA-Z0-9@]'),Validators.required])],
      password:['',Validators.compose([Validators.minLength(8),Validators.pattern('^[a-zA-Z0-9!@#$%^&*]'),Validators.required])]
      
    });


    
   }
   reset(){
    this.navCtrl.push("ResetPage");
     
   }
   ViewPage(){
     this.navCtrl.push("ViewPage")
   }


   loginWithGoogle()
  {

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(User =>
      {
      
        this.ids = User.user.uid;
        var status = false;
       
         
            
            if(this.role==="landlord"){
            
              firebase.database().ref('/Landlords_TBL/').on('value', (snapshot) =>
              {
                
                
                snapshot.forEach((snap) => 
                { 
                  //Initializing Item;
               /* this.item._key = snap.key;
                  this.item.name = snap.val().c_itemName;*/
                  //Adding Item to itemsList
                  this.LandLordList.ContactNo = snap.val().contactNo;
                this.LandLordList.fname = snap.val().fname;
                this.LandLordList.lname =snap.val().lname;
                this.LandLordList.role= snap.val().role;
                this.LandLordList.userId = snap.val().userID;
                // firebase.database().ref('/Flats/').push({landID:this.landID,contactNo:this.contactNo,fname:this.fname,downloadUrl: this.fire.downloadUrl,flatname:this.flatName, description:this.description,Address:this.Address, Price: this.Price});
                if(this.ids === this.LandLordList.userId)
                {
                  console.log("the user is a LandLord",this.LandLordList.userId);
                  this.navCtrl.push("WelcomePage",{userId:this.ids,role: this.LandLordList.role});
                  console.log("status",status);
                }
                    
              
                  status =true;
                  return false;
                });
              });
                               
          }else if(this.role === "Tenants"){
            firebase.database().ref('/Clients_TBL/').on('value', (snapshot) =>
            {
               
              
              snapshot.forEach((snap) => 
              { 
                //Initializing Item;
                /*this.item._key = snap.key;
                this.item.name = snap.val().c_itemName;*/
                //Adding Item to itemsList
             
                
               this.TenantList.ContactNo = snap.val().contactNo;
               this.TenantList.fname = snap.val().fname;
               this.TenantList.lname =snap.val().lname;
               this.TenantList.role = snap.val().role;
               this.TenantList.userID = snap.val().userID;
               // firebase.database().ref('/Flats/').push({landID:this.landID,contactNo:this.contactNo,fname:this.fname,downloadUrl: this.fire.downloadUrl,flatname:this.flatName, description:this.description,Address:this.Address, Price: this.Price});
               if(this.ids === this.TenantList.userID){
                console.log("the user is a Tenant",this.TenantList.userID);
               this.navCtrl.push("WelcomePage",{userId:this.ids,role:  this.TenantList.role});
             }
              
             
                return false;
              });
              
             
            });
          }
              
        } 
     
    
    )}
      
    
    
      }
    


