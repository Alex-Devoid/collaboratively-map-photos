import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

// Import pages
import { HomePage } from '../pages/home/home';
import { CameraPage } from '../pages/camera/camera';
import { MyPagePage } from '../pages/my-page/my-page';
import { LandingPage } from '../pages/landing/landing';
// import { AnonymousListPage } from '../pages/anonymous-list/anonymous-list';
import { LoginPage } from '../pages/login/login';
import {LandCamPage} from '../pages/land-cam/land-cam';


// Import providers
import { EventData } from '../providers/auth-data';
import { AnData } from '../providers/an-data';
import { ConnectivityService } from '../providers/connectivity-service';
import { AngularFireModule } from 'angularfire2';
import { IonicImageViewerModule } from 'ionic-img-viewer';
//import { GoogleMapsCluster } from '../providers/google-maps-cluster';

export const firebaseConfig = {
apiKey: "API_KEY",
authDomain: "XXXXX.firebaseapp.com",
databaseURL: "https://XXXXX.firebaseio.com",
storageBucket: "XXXXX.appspot.com",
messagingSenderId: "XXXXXX"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CameraPage,
    MyPagePage,
    LandingPage,
    // AnonymousListPage,
    LoginPage,
    LandCamPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    IonicImageViewerModule

  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
    HomePage,
    CameraPage,
    MyPagePage,
    LandingPage,
    // AnonymousListPage,
    LoginPage,
    LandCamPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventData,
    AnData,
    ConnectivityService
    //GoogleMapsCluster
  ]
})
export class AppModule {}
