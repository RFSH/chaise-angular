import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErmrestService {
  _service: any;

  METHODS = [
    "delete",
    "get",
    "head",
    "post",
    "put"
  ]

  constructor ( private http: HttpClient) {}

  get service () {
    if (this._service == undefined) {
      this._service = new Promise((resolve, reject) => {

      });
    }
    return this._service;
  }
}
