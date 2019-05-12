import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {DemoService} from './_services/demo.service';
import { Network } from '@ionic-native/network/ngx';
import {ToastService} from './_services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Menù 2',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private network: Network,
    public ds: DemoService,
    private _toast: ToastService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // @@@@@@@@@@@@@@@@@@@@@@@@@@@@ CHECK CONNESSIONE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      this.ds.checkConnection();
      // watch network for a disconnection
      const disconnectSubscription = this.network.onDisconnect().subscribe(() => {
          this._toast.present('Rete disconnessa !');
          this.ds.checkConnection();
      });
      // stop disconnect watch
      // disconnectSubscription.unsubscribe();
      // watch network for a connection
      const connectSubscription = this.network.onConnect().subscribe(() => {
          this._toast.present('Rete connessa !');
          this.ds.checkConnection();
      });
      // stop connect watch
      // connectSubscription.unsubscribe();
      // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    });
  }
}
