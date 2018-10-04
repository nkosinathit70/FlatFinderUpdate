import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
/**
 * Generated class for the TenatLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-tenat-login',
  templateUrl: 'tenat-login.html',
})
export class TenatLoginPage {
  email:string;
  password:string;
  login: FormGroup;
  userId;
  role;
  constructor(private fb:FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.login = this.fb.group({
     
      email:['',Validators.compose([Validators.maxLength(25),Validators.pattern('^[a-zA-Z0-9@]'),Validators.required])],
      password:['',Validators.compose([Validators.minLength(8),Validators.pattern('^[a-zA-Z0-9!@#$%^&*]'),Validators.required])]
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TenatLoginPage');
  }

  
  logins(){
    firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(user => {
     // console.log('sign up page');
    this.userId = user.user.uid;
    this.role = "Tenant";
   firebase.database().ref('/Tenants_TBL/'+this.userId).set({

     userID:this.userId,

      role: this.role
    

})
   this.navCtrl.setRoot("WelcomePage",{userId:this.userId,role:this.role});  
    }).key
    
    
   }
   reset(){
    this.navCtrl.push("ResetPage");
     
   }

}
