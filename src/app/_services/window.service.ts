import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  //
  // Private
  //
  private _bacordeDecoded = new Subject();

  //
  // Public
  //
  public bacordeDecodedEnd$ = this._bacordeDecoded.asObservable();

  //
  // Method
  //
  private _window(): any {
    return window;
  }

  get nativeWindow(): any {
    return this._window();
  }
}
