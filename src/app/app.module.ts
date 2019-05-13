import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Network } from '@ionic-native/network/ngx';
import { Device } from '@ionic-native/device/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BarcodeReaderPage } from './_ui/barcode-reader.page';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@NgModule({
  declarations: [AppComponent, BarcodeReaderPage],
  entryComponents: [BarcodeReaderPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    SpeechRecognition,
    Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Device
  ],
  exports: [BarcodeReaderPage],
  bootstrap: [AppComponent]
})
export class AppModule {}
