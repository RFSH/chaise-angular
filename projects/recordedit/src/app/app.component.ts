import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { ErmrestService } from 'projects/tools/src/lib/ermrest.service';
import { RecordEditColumnModel } from 'projects/tools/src/lib/re-column.model';

@Component({
  selector: 'app-recordedit',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NgbTooltipConfig]
})
export class AppComponent implements OnInit {
  private ERMrest: any;
  reference: any;
  pageReady: boolean = false;
  hasError: boolean = false;
  columnModels: RecordEditColumnModel[] = [];

  constructor(ermrestService: ErmrestService, private cdRef: ChangeDetectorRef,
              ngbTooltipConfig: NgbTooltipConfig) {
    ngbTooltipConfig.container = "body";

    this.ERMrest = ermrestService.ERMrest;
  }

  ngOnInit(): void {
    let url = "https://dev.isrd.isi.edu/ermrest/catalog/1/entity/isa:dataset";

    this.ERMrest.resolve(url, { cid: "migration" }).then((response: any) => {
      this.reference = response.contextualize.entryCreate;

      this.columnModels = this.reference.columns.map((col: any) => {
        return new RecordEditColumnModel(col);
      });

      this.pageReady = true;

      this.cdRef.detectChanges();
    }).catch((error: any) => {
      this.hasError = true;
      console.log(error);
    })
  }

}
