import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IData } from './interface/data';

@Injectable({
  providedIn: 'root'
})
export class InvoicesApiService {
  constructor(private http: HttpClient) { }

  getInvoices() {
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

    return this.http.post<IData[]>('', payload);
  }
}
