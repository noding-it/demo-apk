import { Component } from '@angular/core';
import { DemoService } from '../_services/demo.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    constructor(public ds: DemoService,
                private barcodeScanner: BarcodeScanner,
                private speechRecognition: SpeechRecognition
    ) { }

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

    scanSpeech() {
        // Check permission
        this.speechRecognition.hasPermission().then((hasPermission: boolean) => {
            if (!hasPermission) {
                // Request permissions
                this.speechRecognition.requestPermission().then(
                        () => {
                            this.startSpeech();
                        },
                        () => console.log('Denied')
                    );
            } else {
                this.startSpeech();
            }
        });

        /*const modal = this.modal.present(BarcodeReaderPage, undefined);
        modal.then((result) => {
            if (result.data !== undefined && result.data !== null) {
                this.ultimaLettura = result.data;
                this.totaleLetture += 1;
            }
        });*/
    }

    startSpeech() {
        this.speechRecognition.isRecognitionAvailable().then((available: boolean) => {
                if (available) {
                    this.speechRecognition.startListening({}).subscribe((matches: string[]) => {
                            try {
                                const barcode = matches.toString().match(/\d+/).toString();
                                console.log('barcode', barcode);
                                this.ultimaLettura = barcode;
                                this.totaleLetture += 1;
                                this.speechRecognition.stopListening();
                            } catch (e) {
                                console.log(e);
                            }
                        },
                        (onerror) => console.log('error:', onerror));
                }
            });
    }
}
