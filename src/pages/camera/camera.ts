import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, Content, Platform, DomController } from 'ionic-angular';
import {Camera} from 'ionic-native';
import {EventData} from '../../providers/auth-data';
import {LandCamPage} from '../land-cam/land-cam';
import firebase from 'firebase';
import {LoginPage} from '../login/login';


@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {
  @ViewChild(Content) content: Content;
  currentEvent: any;
  guestName: string = '';
  public guestPicture: string;
  guestLngLat: any;
  photo: any;
  public fireAuth1: any;


  constructor( public platform: Platform, public navCtrl: NavController, public eventData: EventData, zone : NgZone, public domCtrl:  DomController) {
    this.fireAuth1 = firebase.auth();



  }





    cancel(){
      this.guestPicture = null;
    }

    go() {
      this.navCtrl.push(LandCamPage)
    }

    logout() {
      this.fireAuth1.signOut().then( () => {
        this.navCtrl.push(LoginPage);
      });
    }








takePicture(){
 this.platform.ready().then(() => {
  Camera.getPicture({
    quality: 50,
    destinationType : Camera.DestinationType.DATA_URL,
     sourceType : Camera.PictureSourceType.CAMERA,
    encodingType: Camera.EncodingType.JPEG,
    targetWidth: 600,
    targetHeight: 400,
    correctOrientation: true,
    saveToPhotoAlbum: false
  }).then((imageData) => {
this.guestPicture =  imageData;
//this.photo = "data:image/PNG;base64," + imageData;

  this.navCtrl.push(LandCamPage, {itemss: this.guestPicture
                                  //here: this.photo
                                });


   }, (err) => {
      console.log(err);
   });

 });
}


}
