import { Component, Input, OnInit } from '@angular/core';
import { TableModel } from 'projects/tools/src/lib/table.model';

@Component({
  selector: 'lib-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit {
  @Input()
  tableModel!: TableModel;

  constructor() { }

  ngOnInit(): void {
  }

}
