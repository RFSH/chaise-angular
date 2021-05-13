import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { WindowRefService, ICustomWindow } from './window-ref.service';
import * as Q from 'q';

@Injectable({
  providedIn: 'root'
})
export class ErmrestService {
  private window : ICustomWindow;

  constructor ( windowRef: WindowRefService, private http: HttpClient, private zone: NgZone) {
    this.window = windowRef.nativeWindow;
  }


  private appTagToURL(tag: string, location: any, context: string) {
    const appTagMapping: any = {
      "tag:isrd.isi.edu,2016:chaise:record": "/record",
      "tag:isrd.isi.edu,2016:chaise:detailed": "/detailed",
      "tag:isrd.isi.edu,2016:chaise:viewer": "/viewer",
      "tag:isrd.isi.edu,2016:chaise:search": "/search",
      "tag:isrd.isi.edu,2016:chaise:recordset": "/recordset",
      "tag:isrd.isi.edu,2016:chaise:recordedit": "/recordedit"
    };

    const appContextMapping: any = {
        "detailed": "/record",
        "compact": "/recordset",
        "edit": "/recordedit",
        "entry": "/recordedit",
        "*": "/record"
    };

    let getValueFromContext = function(object: any, context: string) : string {
        var partial = context,
            parts = context.split("/");
        while (partial !== "") {
            if (partial in object) { // found the context
                return object[partial];
            }
            parts.splice(-1,1); // remove the last part
            partial = parts.join("/");
        }
        return object["*"];
    }

    var appPath;
    if (tag && (tag in appTagMapping)) {
        appPath = appTagMapping[tag];
    } else {
        appPath = getValueFromContext(appContextMapping, context);
    }

    var url = "/~ashafaei/chaise" + appPath + "/#" + location.catalog + "/" + location.path;

    if (location.queryParamsString) {
        url = url + "?" + location.queryParamsString;
    }
    return url;
  }

  get ERMrest(): any {
    let ermrest = this.window.ERMrest;

    // configure http and promise library
    ermrest.configure(this.http, Q, true);

    // configure appLink
    ermrest.appLinkFn(this.appTagToURL);

    return ermrest;
  }

  runPromiseInAngularZone (p: any, succesFn: Function, errorFn: Function) {
    p.then((response: any) => {
      this.zone.run(() => succesFn(response));
    }).catch((error: any) => {
      this.zone.run(() => errorFn(error));
    })
  }
}
