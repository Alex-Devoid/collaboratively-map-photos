import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from 'ionic-native';
import firebase from 'firebase';
import { Platform, DomController } from 'ionic-angular';


@Injectable()
export class EventData {
  public currentUser: any;
  public eventList: any;
  public profilePictureRef: any;


  constructor(public http: Http, public platform: Platform, public domCtrl: DomController) {
    this.currentUser = firebase.auth().currentUser.uid;
    this.eventList = firebase.database().ref(`border-mapping-app`);
    this.profilePictureRef = firebase.storage().ref();

  }
  addGuest(guestName, Picture = null): any {
   this.platform.ready().then(() => {
     Geolocation.getCurrentPosition().then((position) => {
        var time = new Date(position.timestamp);
        var hours = time.getHours(),
    minutes = time.getMinutes(),
    // seconds = time.getSeconds(),
    month = time.getMonth() + 1,
    day = time.getDate(),
    year = time.getFullYear() % 100;

var formattedDate = "Date: " + month + "-" + day + "-" + year + " Time: " + hours + ":" + minutes



  return this.profilePictureRef.child('images/' + new Date().getTime())
        .putString(Picture, 'base64', {contentType: 'image/jpeg'})
          .then((savedPicture) => {
            this.eventList
            .push({Photo: savedPicture.downloadURL,
                  Description: guestName,
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                  time: formattedDate,
                  Uid: this.currentUser
                });

          }).catch((error) => {
        console.log('Error getting location', error);
      });
        }).catch((error) => {
      console.log('Error getting location', error);
    });


  }).catch((error) => {
console.log('Error getting location', error);
});
    }

}
