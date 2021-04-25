import { INVOICES } from './data/fixture-invoices';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap, takeUntil } from 'rxjs/operators'
import { InvoicesApiService } from './invoices-api.service';
import { InvoicesStateService } from './invoices-state.service';
import { IData } from './interface/data';

@Injectable({
  providedIn: 'root'
})
export class InvoicesFacadeService {
  statuses: string[] = ['Paid', 'Overdue', 'Pending'];
  allIsChecked: boolean = false;
  private readonly stopSubscriptions$ = new Subject();

  constructor(
    private invoicesApi: InvoicesApiService,
    private invoicesState: InvoicesStateService,
  ) { }

  ngOnDestroy(): void {
    this.stopSubscriptions$.next();
    this.stopSubscriptions$.complete();
  }

  isUpdating$(): Observable<boolean> {
    return this.invoicesState.isUpdating$();
  }

  getInvoices$(): Observable<IData[]> {
    return this.invoicesState.getInvoices$();
  }

  loadInvoices() {
    //return this.invoicesState.setInvoices(INVOICES.map((data, i) => ({ ...data, status: this.statuses[this.randomFn()], index: this.getHeader(i), isChecked: false })))
    return this.invoicesApi
      .getInvoices()
      .pipe(
        tap((invoices: IData[]) => this.invoicesState.setInvoices(invoices)),
        map((data, i) => ({ ...data, status: this.statuses[this.randomFn()], index: this.getHeader(i), isChecked: false })),
        takeUntil(this.stopSubscriptions$)
      )
      .subscribe(
        () => this.invoicesState.getInvoices$(),
        (error) => console.log(error),
        () => this.invoicesState.setUpdating(false)
      );
  }

  setAll(checked: boolean) {
    this.allIsChecked = checked;
    console.log(this.allIsChecked);
    if (this.invoicesState.getInvoices$() == null) {
      return;
    }
    this.invoicesState.getInvoices$().pipe(
      map(data => data.map(t => t.completed = checked)),
      takeUntil(this.stopSubscriptions$)
    )
      .subscribe(
        () => this.invoicesState.getInvoices$(),
        (error) => console.log(error),
        () => this.invoicesState.setUpdating(false)
    );
  }

  someIsChecked(): boolean {
    // if (this.task.subtasks == null) {
    //   return false;
    // }
    //return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allIsChecked;
    return false;
  }

  updateAllIsChecked() {
    this.allIsChecked = false;
    //this.allIsChecked = this.dataSource !== null && this.dataSource.subtasks.every(t => t.completed);
  }

  private getHeader(i: number): string {
    let number = ('0000' + (i + 1)).slice(-3);
    return `INV - ${number}`;
  }

  private randomFn = () => Math.floor(Math.random() * 3);
}
