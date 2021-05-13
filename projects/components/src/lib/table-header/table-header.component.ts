import { Component, Input, OnInit } from '@angular/core';
import { TableModel } from 'projects/tools/src/lib/table.model';
import { TableService } from 'projects/tools/src/lib/table.service';

@Component({
  selector: 'lib-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit {
  @Input()
  tableModel!: TableModel;

  pageLimits = [5, 10, 25, 50, 75, 100, 200];

  constructor(private tableService: TableService) { }

  ngOnInit(): void {
  }

  setPageLimit(item: number) {
    this.tableModel.pageLimit = item;
    this.tableService.fetchData(this.tableModel);
  }

}
