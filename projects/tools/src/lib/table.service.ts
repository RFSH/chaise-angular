import { Injectable, NgZone } from '@angular/core';
import { TableModel } from './table.model';
import { ErmrestService } from './ermrest.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor(private zone: NgZone, private ermrest : ErmrestService) {

  }

  private fetchTableData(tableModel: TableModel) {
    this.ermrest.runPromiseInAngularZone(
      tableModel.reference.read(tableModel.pageLimit),
      (page: any) => {
        tableModel.currentCount = page.length;
        tableModel.values = [];
        page.tuples.forEach((tuple: any) => {
          let row: any[] = [];
          tuple.values.forEach((val: string, colIndex: number) => {
            row.push({
              value: val,
              isHTML: tuple.isHTML[colIndex]
            });
          });
          tableModel.values.push(row);
        });

        tableModel.tableReady = true;
      },
      (error: any) => {
        tableModel.hasError = true;
        console.log(error);
      }
    )
  }

  private fetchTotalCount(tableModel: TableModel) {
    this.ermrest.runPromiseInAngularZone(
      tableModel.reference.getAggregates([tableModel.reference.aggregate.countAgg]),
      (response: any) => {
        tableModel.totalCount = response[0];
      },
      (error: any) => {
        tableModel.hasError = true;
        console.log(error);
      }
    )
  }

  fetchData(tableModel: TableModel) {
    this.zone.run(() => {
      tableModel.tableReady = false;
    });

    this.fetchTableData(tableModel);

    this.fetchTotalCount(tableModel);
  }
}
