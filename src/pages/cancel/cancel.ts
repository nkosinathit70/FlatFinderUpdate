import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController, AlertController } from 'ionic-angular';
/**
 * Generated class for the CancelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cancel',
  templateUrl: 'cancel.html',
})
export class CancelPage {
  person:any = {
    name: ""
    };

  constructor(public actionSheetCtrl:ActionSheetController,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CancelPage');
  }
  DoAction() {
    let buttons:any = null;

	buttons = [
		{
		  text: 'Cancel Booking',
		  icon: 'create',
		  handler: () => {
			this.changeName();
		  }
		}
	];
    

    let actions = this.actionSheetCtrl.create({
      title: 'Actions',
      buttons: buttons
    });

    actions.present();
  }
  
  changeName() {
    let prompt = this.alertCtrl.create({
      title: 'Cancel',
      message: "Cancel",
      inputs: [
        {
          name: 'personName',
          placeholder: 'Your name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: data => {
            
            this.person.name = data.personName.length ? data.personName : "No Name";
          
          }
        }
      ]
    });

    prompt.present();
  }
  


}
