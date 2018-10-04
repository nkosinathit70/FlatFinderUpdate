import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
/**
 * Generated class for the ResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;

@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {
  reset: FormGroup;
  email;
  welcom={
    email:"",
  }

  isenabled:boolean=false;

  constructor(public navCtrl: NavController,private fb:FormBuilder, public navParams: NavParams) {
   
    this.reset=this.fb.group({
      email:['',[Validators.required]]
    }) 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPage');
  }
  onreset(){
   
    var auth = firebase.auth();
    var emailAddress = this.email;
    
    auth.sendPasswordResetEmail(emailAddress).then(function() {
      this.navCtrl.push("LoginPage");
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
  }

  back(){
    this.navCtrl.setRoot("LoginPage");
  }
}
