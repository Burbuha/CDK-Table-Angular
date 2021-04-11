import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IData } from './interface/data';
import Axios from 'axios-observable';

@Injectable({
  providedIn: 'root'
})
export class InvoicesApiService {
  constructor(private http: HttpClient) { }

  getInvoices() {
    // -----------------------axios-observable-------------------------------------
    const payload = {
      "token": "BSxiC-w0ghV5OoyoSJIgMA",
      "data": {
        "id": "stringDigits",
        "company": "companyName",
        "createdAt": "date",
        "dueDate": "date",
        "amount": {
          "sum": "numberInt",
          "currencyName": "currencyName",
          "currencySymbol": "currencySymbol",
          "currencyCode": "currencyCode"
        },
        "_repeat": 100
      }
    };

    return Axios.request({
      method: "post",
      url: "https://app.fakejson.com/q",
      data: payload
    });

    // -----------------------httpClient-----------------------------------------
    // return this.http.get<IData[]>('');
  }
}
