
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'
/**
 * Generated class for the ClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;

@IonicPage()
@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
})
export class ClientPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  clientList = {
    id: "",
    fname: "",
    lname: "",
    contactNo: "",
    email:"",
    role: "",
    
  }
  
retrieveData(){
  
 firebase.database().ref('/Clients_TBL/').on('value', (snapshot) =>
 {
    
  
   snapshot.forEach((snap) => 
   { 
    
    this.clientList.id = snap.key
    this.clientList.contactNo = snap.val().contactNo;
    this.clientList.fname = snap.val().fname;
    this.clientList.lname = snap.val().lname;
    this.clientList.role  = snap.val().role;
    this.clientList.email = snap.val().email;

    return false;
    }
   )}
 )}
}