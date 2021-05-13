import { Component, Input, OnInit } from '@angular/core';
import { TableModel } from 'projects/tools/src/lib/table.model';

@Component({
  selector: 'lib-table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['./table-content.component.scss']
})
export class TableContentComponent implements OnInit {

  @Input() tableModel!: TableModel;

  constructor() { }

  ngOnInit(): void {
  }

}
