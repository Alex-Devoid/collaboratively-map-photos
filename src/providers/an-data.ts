import { Injectable } from '@angular/core';

import firebase from 'firebase';

@Injectable()
export class AnData {
  public fireAuth: any;
  public userProfile: any;

  constructor() {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/userProfile');
  }



  loginUser(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  createAnonymousUser(): any {
    return this.fireAuth.signInAnonymously();
  }



}
