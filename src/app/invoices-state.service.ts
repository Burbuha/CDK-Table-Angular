import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IData } from './interface/data';

@Injectable({
  providedIn: 'root'
})
export class InvoicesStateService {
  private updating$ = new BehaviorSubject(false);
  private invoices$: BehaviorSubject<IData[]> = new BehaviorSubject<IData[]>([]);

  isUpdating$() {
    return this.updating$.asObservable();
  }

  getInvoices$(): Observable<IData[]> {
    return this.invoices$.asObservable();
  }

  setInvoices(invoices: IData[]): void {
    this.invoices$.next(invoices);
  }

  setUpdating(isUpdating: boolean) {
    this.updating$.next(isUpdating);
  }
}
