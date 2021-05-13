import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ErmrestService } from 'projects/tools/src/lib/ermrest.service';
import { TableModel } from 'projects/tools/src/lib/table.model';
import { TableService } from 'projects/tools/src/lib/table.service';

@Component({
  selector: 'app-record',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private ERMrest: any;
  reference: any;
  tuple: any;
  pageReady: boolean = false;
  hasError: boolean = false;
  columnModels: any = [];
  relatedTableModels: TableModel[] = [];


  constructor(ermrestService: ErmrestService, private cdRef: ChangeDetectorRef, private tableService: TableService) {
    this.ERMrest = ermrestService.ERMrest;
  }

  ngOnInit(): void {
    // let url = "https://dev.isrd.isi.edu/ermrest/catalog/1/entity/isa:dataset/RID=TTG";
    let url = "https://dev.isrd.isi.edu/ermrest/catalog/1/entity/isa:dataset/RID=1-3X0M";


    this.ERMrest.resolve(url, { cid: "migration" }).then((response: any) => {
      this.reference = response.contextualize.detailed;

      this.columnModels = this.reference.columns.map( (col: any) => {
        return {column: col};
      });

      return this.reference.read(1);
    }).then((page: any) => {
      this.tuple = page.tuples[0];

      this.pageReady = true;
      this.cdRef.detectChanges();

      this.relatedTableModels = this.reference.generateRelatedList(this.tuple).map( (rel: any) => {
        let tm = new TableModel(rel);
        this.tableService.fetchData(tm);
        return tm;
      });

    }).catch((error: any) => {
      this.hasError = true;
      console.log(error);
    });
  }
}
