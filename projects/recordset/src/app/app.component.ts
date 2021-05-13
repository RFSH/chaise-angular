import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { ErmrestService } from 'projects/tools/src/lib/ermrest.service';
import { TableModel } from 'projects/tools/src/lib/table.model';
import { TableService } from 'projects/tools/src/lib/table.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-recordset',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tableModel: TableModel = new TableModel();
  hasError: boolean = false;
  facetApplied: boolean = false;
  pageReady: boolean = false;
  private ERMrest: any;

  constructor(ermrestService: ErmrestService, private tableService: TableService, private zone: NgZone, private cdRef : ChangeDetectorRef) {
    this.ERMrest = ermrestService.ERMrest;
  }

  ngOnInit(): void {
    let url = "https://dev.isrd.isi.edu/ermrest/catalog/1/entity/isa:dataset";


    this.ERMrest.resolve(url, { cid: "migration" }).then((response: any) => {
      this.zone.run(() => {
        this.tableModel = new TableModel(response.contextualize.compact);

        this.pageReady = true;
        this.tableService.fetchData(this.tableModel);
      });
    }).catch((error: any) => {
      this.zone.run(() => {
        console.log(error);
        this.hasError = true;
      })
    });
  }

  detectChange() {
    this.cdRef.detectChanges();
  }

  applyFacet() {
    let self = this;
    self.facetApplied = !self.facetApplied;

    let filter = ["FACEBASE:1-4G4E"], fc = self.tableModel.reference.facetColumns[2];
    if (self.facetApplied) {
        self.tableModel.reference = fc.addChoiceFilters(filter);
    } else {
        self.tableModel.reference = fc.removeChoiceFilters(filter);
    }

    this.tableService.fetchData(self.tableModel);
  }
}
