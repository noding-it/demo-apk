import {Component, OnInit} from '@angular/core';
import {ModalService} from '../_services/modal.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import {WindowService} from '../_services/window.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-barcode-reader',
  template: `
    <ion-content class="ion-text-center">
        <!-- <ion-chip (click)="setReader('dynamsoft')">
          <ion-icon name="barcode" color="primary" outline="true"></ion-icon>
          <ion-label>dynamsoft</ion-label>
          <ion-icon name="pin" [hidden]="reader !== 'dynamsoft'"></ion-icon>
        </ion-chip>
        <ion-chip (click)="setReader('quagga')">
          <ion-icon name="barcode" color="warning" outline="true"></ion-icon>
          <ion-label>quagga</ion-label>
          <ion-icon name="pin" [hidden]="reader !== 'quagga'"></ion-icon>
        </ion-chip> -->
      <iframe width="100%" height="100%" frameborder="0" src="https://expo-comatexspa.com/speech/speechRecognition.html" allow="microphone; camera"></iframe><!-- [src]="trustedUrl" -->
    </ion-content>
    <ion-footer>
        <ion-toolbar>
            <ion-row>
                <ion-col><ion-button class="button-block" color="danger" (click)="esci(undefined)">Exit</ion-button></ion-col>
            </ion-row>
        </ion-toolbar>
    </ion-footer>
  `,
  styles: [],
})
export class BarcodeReaderPage implements OnInit {

  constructor(private modal: ModalService,
              private domSanitizer: DomSanitizer,
              private window: WindowService) {

        // definisco il metodo per stare in ascolto sul cambiamento del localstorage
        this.window.nativeWindow.onstorage = (e: StorageEvent) => {
          if (e.key === 'BarcodeText') {
            this.esci(e.newValue);
          }
          // console.log('onstorage !!!', e);
        };
  }

  //
  // Public
  //
  public trustedUrl: SafeResourceUrl;
  public reader: string;

  ngOnInit() {
    // pulisco il localstorage da eventuali vecchie letture
    localStorage.removeItem('BarcodeText');
    // this.setReader('quagga');
  }

  setReader(reader: string) {
    this.reader = reader;
    this.trustedUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(environment[reader + 'BarcodeReaderUrl']);
  }

  // chiudo, dealloco tutti i metodi e passo il risultato al servizio
  esci(data) {
    this.window.nativeWindow.onstorage = null;
    localStorage.removeItem('BarcodeText');
    this.modal.dismiss(data);
  }

}
