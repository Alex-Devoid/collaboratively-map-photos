import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, ViewController, Platform } from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service';

import { Geolocation } from 'ionic-native';
import firebase from 'firebase';
import * as MarkerClusterer from 'node-js-marker-clusterer';
import 'rxjs/add/operator/map';



declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'

})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;

  public items: any;
  map: any;
  mapInitialised: boolean = false;
  apiKey = 'API_KEY'
  locations: any;
  ltLg: any;
  ContentPlace: any;

  x = [];
  currentUser: any;
  markerCluster: any;
  photoView: any;
  a: any;
  b: any;
  mapOptions: any;
  timeC: any;
  move: any;

  constructor(public platform: Platform, public nav: NavController, public connectivityService: ConnectivityService, public viewCtrl: ViewController) {
  this.items = firebase.database().ref(`border-mapping-app`);
  this.currentUser = firebase.auth().currentUser.uid;

  var time = new Date().getTime()
  console.log(time);
    this.loadGoogleMaps();


  }


  ionViewWillEnter() {
      this.viewCtrl.showBackButton(false);
  };

  loadGoogleMaps(){

    this.addConnectivityListeners();

  if(typeof google == "undefined" || typeof google.maps == "undefined"){

    console.log("Google maps JavaScript needs to be loaded.");
    this.disableMap();

    if(this.connectivityService.isOnline()){
      console.log("online, loading map");

      //Load the SDK
      (<any>window).mapInit = () => {
        this.initMap();
        this.enableMap();
      }

      let mapScript = document.createElement("script");
      mapScript.id = "MapgoogleMaps";

      mapScript.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';

      document.body.appendChild(mapScript);

    }
  }
  else {

    if(this.connectivityService.isOnline()){
      console.log("showing map");
      this.initMap();
      this.enableMap();
    }
    else {
      console.log("disabling map");
      this.disableMap();
    }

  }

  }

  initMap(){

    this.mapInitialised = true;

    Geolocation.getCurrentPosition().then((position) => {
let lat = position.coords.latitude;
let lng = position.coords.longitude;


	   let mapOptions = {
	      center: new google.maps.LatLng(lat, lng),
	      zoom: 15,
	      mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
          zoomControlOptions: {
              position: google.maps.ControlPosition.LEFT_CENTER
          }

	    }
	    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.markerCluster = new MarkerClusterer(this.map, this.x, {imagePath: 'assets/m', maxZoom: 10});

      this.items.on('child_added', (snapshots) => {

        snapshots.forEach((snapshot) => {
          let positionNew = snapshots.val()
          let latLng = new google.maps.LatLng(positionNew.lat, positionNew.lng)

          function move(user) {
                if(user == snapshots.Uid){
                  return true
                }else{
                  return false

                }
            }

          let marker2 = new google.maps.Marker({
              draggable: move(this.currentUser),
              animation: google.maps.Animation.DROP,
              position: latLng
            })


    this.markerCluster.addMarker(marker2)
        marker2.setMap(this.map);

    this.a = snapshots.val().Photo;
    this.b = snapshots.val().Description;
    this.timeC = snapshots.val().time;
    console.log(this.a)


    let card = `<img height="125" width="125" src=${this.a} imageViewer />`;
    let ContentPlace = card + `<p>${this.b}</p>` + "<br>" + this.timeC ;

          var infoWindow = new google.maps.InfoWindow({

              content: " "
            });


      google.maps.event.addListener(marker2, 'click', () => {
      infoWindow.close();
      infoWindow.setContent(ContentPlace);
      infoWindow.open(this.map, marker2);
      });
      marker2.setMap(this.map);


        });

    });


        }).catch((error) => {
          console.log('Error getting location', error);
        });

}

  disableMap(){
    console.log("disable map");
  }

  enableMap(){


    console.log("enable map");
  }

  addConnectivityListeners(){

    let onOnline = () => {

      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){

          this.loadGoogleMaps();

        } else {

          if(!this.mapInitialised){
            this.initMap();
          }

          this.enableMap();
        }
      }, 2000);

    };

    let onOffline = () => {
      this.disableMap();
    };

    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);

  }


  addMarker(){


  // let marker = new google.maps.Marker({
  //   map: this.map,
  //   animation: google.maps.Animation.DROP,
  //   position: this.map.getCenter()
  // });


  let content = '<h4>Information!</h4>' + this.items.Photo ;



  Geolocation.getCurrentPosition().then((position) => {

    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var timestamp = position.timestamp;
    console.log(new Date(position.timestamp));
        this.items.push({
        lat: lat,
        lng: lng,
        timestamp: timestamp,
        content: content
        });
        console.log(this.items.lng)

    });


  }
}
