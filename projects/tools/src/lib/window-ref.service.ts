import { Injectable } from '@angular/core';

// https://stackoverflow.com/a/37176929
// This interface is optional, showing how you can add strong typings for custom globals.
// Just use "Window" as the type if you don't have custom global stuff
export interface ICustomWindow extends Window {
    ERMrest: any;
}

function getWindow (): any {
    return window;
}

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {
    get nativeWindow (): ICustomWindow {
        return getWindow();
    }
}
