import { Component, OnInit, Input } from '@angular/core';
import { TableModel } from 'projects/tools/src/lib/table.model';

@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() tableModel!: TableModel;

  constructor() { }

  ngOnInit(): void {
  }

}
