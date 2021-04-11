import { Pipe, PipeTransform } from '@angular/core';
import { IData } from './interface/data';

@Pipe({
  name: 'pagination',
})
export class PaginationPipe implements PipeTransform {
  transform(dataSource: IData[], page: number, pageSize: number) {
    return dataSource.slice((page - 1) * pageSize, page * pageSize);
  }
}
