import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AnData } from '../../providers/an-data';
import { MyPagePage } from '../my-page/my-page'

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public navCtrl: NavController, public anData: AnData) {

  }






goToList(){
  this.anData.createAnonymousUser().then( () => {
    this.navCtrl.setRoot(MyPagePage);
  });
}


  }
