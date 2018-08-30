import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AnData } from '../../providers/an-data';

@Component({
  selector: 'page-anonymous-list',
  templateUrl: 'anonymous-list.html',
})
export class AnonymousListPage {
  public apartments: number[];
  constructor(public navCtrl: NavController, public anData: AnData,
    public alertCtrl: AlertController) {
      this.apartments = [1, 2, 3, 4, 5];
  }


}
