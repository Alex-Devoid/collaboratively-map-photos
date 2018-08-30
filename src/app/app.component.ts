import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { MyPagePage } from '../pages/my-page/my-page'
import { LoginPage } from '../pages/login/login';
import firebase from 'firebase';





@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any;
  zone: NgZone;



  constructor(platform: Platform) {
    this.zone = new NgZone({});
    firebase.initializeApp({
    apiKey: "AIzaSyDSQHNZt-A_QQEtCdeN3uW6wq_uwg-N8nw",
    authDomain: "border-mapping-app.firebaseapp.com",
    databaseURL: "https://border-mapping-app.firebaseio.com",
    storageBucket: "border-mapping-app.appspot.com",
    messagingSenderId: "547659347386"
  });


  const unsubscribe = firebase.auth().onAuthStateChanged((user, error) => {
    this.zone.run( () => {
      if (user) {
        this.rootPage = MyPagePage;
        console.log(user.uid)
        unsubscribe();

    } if (error) {
      console.log(error);

    } if(!user) {
        this.rootPage = LoginPage;
        unsubscribe();
      }
    });
  });

    platform.ready().then(() => {

    
      StatusBar.styleDefault();
    });
  }
}
