import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { CameraPage } from '../camera/camera';
// import { AnonymousListPage } from '../anonymous-list/anonymous-list';

/*
  Generated class for the MyPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-page',
  templateUrl: 'my-page.html'
})
export class MyPagePage {

  tab1Root: any = HomePage;
  tab2Root: any = CameraPage;
  



  constructor(public navCtrl: NavController, private viewCtrl: ViewController) {


  }



  ionViewDidLoad() {


    console.log('Hello MyPagePage Page');
  }

}
