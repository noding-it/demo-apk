import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor(public device: Device) {
      this.speech = ('webkitSpeechRecognition' in window);
  }

    public online = false;
    public speech = false;
    public connectionType: string;

    public checkConnection(): boolean {
        const networkState = navigator['connection'].type || navigator['connection'].effectiveType;

        const Connection = window['Connection'] || {
            'CELL'     : 'cellular',
            'CELL_2G'  : '2g',
            'CELL_3G'  : '3g',
            'CELL_4G'  : '4g',
            'ETHERNET' : 'ethernet',
            'NONE'     : 'none',
            'UNKNOWN'  : 'unknown',
            'WIFI'     : 'wif'
        };

        const states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';

        this.online = !(networkState === Connection.NONE);
        this.connectionType = states[networkState];
        // this.presentToast('Connection type: ' + states[networkState], 5000);

        return this.online;
    }
}
