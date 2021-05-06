import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor(private zone: NgZone) {}

  fetchData(tableModel: any) {
    tableModel.tableReady = false;
    this.zone.run(() => { });

    tableModel.reference.read(25).then((page: any) => {

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

      if (page.length === 0) {
        return [0];
      }

      return tableModel.reference.getAggregates([tableModel.reference.aggregate.countAgg]);
    }).then((response: any) => {
      tableModel.totalCount = response[0];

      //TODO improve this
      this.zone.run(() => { });

    }).catch((error: any) => {
      tableModel.hasError = true;
      console.log(error);

      // TODO improve this
      this.zone.run(() => { });
    });
  }
}
