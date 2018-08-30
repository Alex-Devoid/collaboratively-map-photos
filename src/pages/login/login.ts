import {
  NavController,
  LoadingController,
  AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AnData } from '../../providers/an-data';
import { MyPagePage } from '../my-page/my-page';
import firebase from 'firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  check: any;

  constructor(public nav: NavController, public anData: AnData, public formBuilder: FormBuilder,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    this.nav.setRoot(MyPagePage);
    console.log("signed in")
      // No user is signed in.
    }
  });



    /**
     * Creates a ControlGroup that declares the fields available, their values and the validators that they are going
     * to be using.
     *
     * I set the password's min length to 6 characters because that's Firebase's default, feel free to change that.
     */
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6),
        Validators.required])]
    });
  }


  goToList(){

    this.anData.createAnonymousUser().then( () => {
      this.nav.setRoot(MyPagePage);
    });
  }

  /**
   * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
   */
  // elementChanged(input){
  //   let field = input.inputControl.name;
  //   this[field + "Changed"] = true;
  // }

  /**
   * If the form is valid it will call the AuthData service to log the user in displaying a loading component while
   * the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  // loginUser(){
  //
  //   this.submitAttempt = true;
  //
  //   if (!this.loginForm.valid){
  //     console.log(this.loginForm.value);
  //   } else {
  //     this.anData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( anData => {
  //       this.loading.dismiss().then( () => {
  //           this.nav.setRoot(MyPagePage);
  //       });
  //
  //
  //     }, error => {
  //       this.loading.dismiss().then( () => {
  //         let alert = this.alertCtrl.create({
  //           message: error.message,
  //           buttons: [
  //             {
  //               text: "Ok",
  //               role: 'cancel'
  //             }
  //           ]
  //         });
  //         alert.present();
  //       });
  //     });
  //
  //     this.loading = this.loadingCtrl.create({
  //       dismissOnPageChange: true,
  //     });
  //     this.loading.present();
  //   }
  // }



}
