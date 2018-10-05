
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides} from 'ionic-angular'
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
  @ViewChild('mySlider') slider: Slides;
  selectedSegment: string;
  slides: any;
  flatList = [];
  slid1=0;
  slid2=0;
  flatsdiv=1;
  slideNo =1;
  landID;
  userId;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.selectedSegment = 'first';
    this.slides = [
      {
        id: "flats",
        title: "First Slide"
      },
      {
        id: "profile",
        title: "Second Slide"
      },
      {
        id: "bookings",
        title: "Third Slide"
      }
    ];
    this.getImage();
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


 onSegmentChanged(segmentButton) {
  console.log("Segment changed to", segmentButton.value);
  const selectedIndex = this.slides.findIndex((slide) => {
    return slide.id === segmentButton.value;
  });
  this.slider.slideTo(selectedIndex) ;
}

getImage(){
  //this.count =0;
   firebase.database().ref('/Flats/').on('value', (snapshot) =>
 {
    
  
   snapshot.forEach((snap) => 
   { 
     //Initializing Item;
     /*this.item._key = snap.key;
     this.item.name = snap.val().c_itemName;*/
     //Adding Item to itemsList
       
     
    
    
    this.flatList.push({landID:snap.val().landID,contactNo:snap.val().contactNo,downloadUrl:snap.val().downloadUrl,flatname: snap.val().flatname, description:snap.val().description,Address: snap.val().Address, Price : snap.val().Price,_key : snap.val()._key});
   // firebase.database().ref('/Flats/').push({landID:this.landID,contactNo:this.contactNo,fname:this.fname,downloadUrl: this.fire.downloadUrl,flatname:this.flatName, description:this.description,Address:this.Address, Price: this.Price});

   console.log(snap.val().downloadUrl);
    console.log(this.flatList);
  
     return false;
   });
   
  // console.log("count = "+this.count);
 });
 }

 onSlideChanged(slider) {
  console.log('Slide changed');
  const currentSlide = this.slides[slider.getActiveIndex()];
  this.selectedSegment = currentSlide.id;

  if(currentSlide.id == "flats"){
    this.slideNo = 1;
    console.log("This is slide 1");
  }else  if(currentSlide.id == "profile"){
    this.slideNo = 2;
    console.log("This is slide 2");
  }else  if(currentSlide.id == "bookings"){
    this.slideNo = 3;
    console.log("This is slide 3");
  }

}


 
getFlatDetails(flat:any){
  console.log(flat.fname);
   this.landID = flat.landID;
   this.navCtrl.push("FlatDetailsPage",{flat:flat,landID:this.landID,userId:this.userId});
 }

}

 
