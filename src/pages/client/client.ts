import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
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
  client:FormGroup;
  display = 0;
  useId;
  logins:boolean=false;
  loginError: string;
  fname;
  lname;
  email;
  user;
  contactNo;
  password;
   role:string="";
  // gender;
  // age;
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
  
  ids;

  constructor(private f:FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.client = this.f.group({
      email:['',[Validators.required,Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),Validators.maxLength(25)]],
      password:['',[Validators.required,Validators.minLength(6)]],
      fname:['',[Validators.required,Validators.pattern('[a-zA-Z]*'),Validators.maxLength(20)]],
      lname:['',[Validators.required,Validators.pattern('[a-zA-Z]*'),Validators.maxLength(20)]],
      contactNo:['',[Validators.required,Validators.maxLength(10)]],
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientPage');
    
    
  }
  login(){

    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(User =>{
      this.user= User.uid;
      console.log("userrrr",this.user)
      this.navCtrl.push("ViewPage");

    })
  }
  submit(){
    this.display = 1;
  }
  signupClient(){

     firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(user => {
     //this.display = 1;
     this.useId= user.user.uid;
     this.role ="Tenant";
          
          firebase.database().ref('/Tenants_TBL/'+ user.user.uid).set(
            {
              userID:this.useId,
              ContactNo:this.contactNo,
              fname:this.fname,
              lname:this.lname,
              email:this.email,
              password:this.password,
              role: this.role
              
            }
            ).key;
          this.navCtrl.setRoot("WelcomePage",{userId:this.useId,role:this.role});
          
    });
   }
   loginWithGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(User =>{
      
      this.ids = User.user.uid;
      console.log("sssssssss",this.ids);
       
  
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
 
  
      //this.navCtrl.push("WelcomePage",{userId:this.ids,openMenu:1});
    })
   }

  }


