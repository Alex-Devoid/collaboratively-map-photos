import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CameraPage} from '../camera/camera';
import {EventData} from '../../providers/auth-data';

/*
  Generated class for the LandCam page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-land-cam',
  templateUrl: 'land-cam.html'
})
export class LandCamPage {
public Picture: any;
guestName: string = '';
public guestPicture: any;
public languageShow: boolean = false;
public languageHide: boolean = true;


  constructor(public navCtrl: NavController, public navParams: NavParams, public eventData: EventData) {

    //this.Picture = navParams.get('here');
    this.guestPicture = navParams.get('itemss');
  }



  addGuest(guestName) {
this.navCtrl.pop(CameraPage);
      this.eventData.addGuest(guestName, this.guestPicture).then(() => {
        this.guestName = '';
        this.guestPicture = null;
      })



  }





  cancel(){
    this.Picture = null;
    this.navCtrl.pop(CameraPage);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LandCamPage');
  }



}
