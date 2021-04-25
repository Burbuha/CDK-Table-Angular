import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IData } from '../interface/data';
import { InvoicesFacadeService } from '../invoices-facade.service';
import { SystemMessageDialog } from '../system-message/system-message-dialog.component';

@Component({
  selector: 'app-invoices-table',
  templateUrl: './invoices-table.component.html',
  styleUrls: ['./invoices-table.component.css']
})
export class InvoicesTableComponent implements OnInit {
  dataSource: Observable<IData[]>;
  isUpdating$: Observable<boolean>;
  displayedColumns: string[] = ['header', 'company', 'invoiceDate', 'dueDate', 'status', 'amount'];
  settingsPagination = {
    page: 1,
    pageSize: 5,
  };
  allIsChecked: boolean;

  constructor(private invoicesService: InvoicesFacadeService, public dialog: MatDialog) {
    this.dataSource = invoicesService.getInvoices$();
    console.log(this.dataSource);
    this.isUpdating$ = invoicesService.isUpdating$();
    this.allIsChecked = invoicesService.allIsChecked;
  }

  ngOnInit(): void {
    this.invoicesService.loadInvoices();
  }

  updateAllIsChecked() {
    this.invoicesService.updateAllIsChecked();
  }

  someIsChecked(): boolean {
    return this.invoicesService.someIsChecked()
  }

  setAll(checked: boolean) {
    this.invoicesService.setAll(checked);
  }

  onClickMessage() {
    this.dialog.open(SystemMessageDialog, { panelClass: 'warning' });
  }
}
