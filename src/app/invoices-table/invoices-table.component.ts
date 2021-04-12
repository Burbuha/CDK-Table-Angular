import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IData } from '../interface/data';
import { InvoicesFacadeService } from '../invoices-facade.service';

export interface IInvoices extends IData {
  completed: boolean;
  status: string;
}

@Component({
  selector: 'app-invoices-table',
  templateUrl: './invoices-table.component.html',
  styleUrls: ['./invoices-table.component.css']
})
export class InvoicesTableComponent implements OnInit {
  dataSource: Observable<IData[]>;
  invoices: IInvoices[] = [];
  isUpdating$: Observable<boolean>;
  displayedColumns: string[] = ['header', 'company', 'invoiceDate', 'dueDate', 'status', 'amount'];
  settingsPagination = {
    page: 1,
    pageSize: 5,
  };
  allComplete: boolean = false;

  constructor(private invoicesService: InvoicesFacadeService) {
    this.dataSource = invoicesService.getInvoices$();
    console.log(this.dataSource);
    this.isUpdating$ = invoicesService.isUpdating$();
  }

  ngOnInit(): void {
    this.invoicesService.loadInvoices();
  }

  getHeader(i: number): string {
    let number = ('0000' + (i + 1 + 5 * (this.settingsPagination.page - 1))).slice(-3);
    return `INV - ${number}`;
  }
}
