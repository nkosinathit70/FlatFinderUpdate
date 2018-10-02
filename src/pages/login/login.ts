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

  password;
  ids;

  constructor(private fb:FormBuilder,public navCtrl: NavController, public navParams: NavParams) {

    this.login = this.fb.group({
     
      email:['',Validators.compose([Validators.maxLength(25),Validators.pattern('^[a-zA-Z0-9@]'),Validators.required])],
      password:['',Validators.compose([Validators.minLength(8),Validators.pattern('^[a-zA-Z0-9!@#$%^&*]'),Validators.required])]
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logins(email:string,password:string){
  /*  firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(user => {
      
      this.ids = user.user.uid;
     
     // this.navCtrl.push("WelcomePage",{userId:this.ids});
        this.navCtrl.setRoot("WelcomePage",{user: user.user.uid,openMenu:1});
     
    });*/
   
    
    firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(user => {
      
      this.ids = user.user.uid;
     
     // this.navCtrl.push("WelcomePage",{userId:this.ids});
        this.navCtrl.setRoot("WelcomePage",{userId: user.user.uid,openMenu:1});

    
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    
   }
   reset(){
    this.navCtrl.push("ResetPage");
     
   }
   ViewPage(){
     this.navCtrl.push("ViewPage")
   }
   loginWithGoogle(){

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(User =>{
      
      this.ids = User.user.uid;
      
      
     
      this.navCtrl.push("WelcomePage",{userId:this.ids,openMenu:1});
    })
   }

}
