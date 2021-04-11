import { INVOICES } from './data/invoices-mock';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { InvoicesApiService } from './invoices-api.service';
import { InvoicesStateService } from './invoices-state.service';
import { IData } from './interface/data';

@Injectable({
  providedIn: 'root'
})
export class InvoicesFacadeService {

  constructor(
    private invoicesApi: InvoicesApiService,
    private invoicesState: InvoicesStateService,
  ) { }

  isUpdating$(): Observable<boolean> {
    return this.invoicesState.isUpdating$();
  }

  getInvoices$() {
    return this.invoicesState.getInvoices$();
  }

  loadInvoices() {
    //--------------------------Mock data------------------------------------------
    return this.invoicesState.setInvoices(INVOICES);

    // -----------------------axios-observable-------------------------------------
    // return this.invoicesApi
    //   .getInvoices()
    //   .subscribe(response => {
    //     response.data.pipe(this.invoicesState.setInvoices(response.data)),
    //       (error: any) => console.log(error),
    //       () => this.invoicesState.setUpdating(false)
    //   });

    // -----------------------httpClient-----------------------------------------
    // .pipe(tap((invoices: IData[]) => this.invoicesState.setInvoices(invoices)))
    // .subscribe(
    //   () => this.invoicesState.getInvoices$(),
    //   (error) => console.log(error),
    //   () => this.invoicesState.setUpdating(false)
    // );
  }
}
