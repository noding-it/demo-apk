import { Component } from '@angular/core';
import { DemoService } from '../_services/demo.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    constructor(public ds: DemoService,
                private barcodeScanner: BarcodeScanner) { }

    public ultimaLettura: string;
    public totaleLetture = 0;

    scanBarcode(continua: boolean) {
        this.barcodeScanner.scan({resultDisplayDuration: 0}).then(barcodeData => {
            // console.log('Barcode data', barcodeData);
            if (!barcodeData.cancelled) {
                this.ultimaLettura = barcodeData.text;
                this.totaleLetture += 1;
                if (continua) {
                    this.scanBarcode(true);
                }
            }
        }).catch(err => {
            console.log('Error', err);
        });
    }
}
