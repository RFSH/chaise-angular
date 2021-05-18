import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  form!: FormGroup;

  constructor(private ermrestService: ErmrestService, private cdRef: ChangeDetectorRef,
              ngbTooltipConfig: NgbTooltipConfig, private fb: FormBuilder) {
    ngbTooltipConfig.container = "body";

  }

  ngOnInit(): void {
    let url = "https://dev.isrd.isi.edu/ermrest/catalog/1/entity/isa:dataset";

    this.ermrestService.runPromiseInAngularZone(
      this.ermrestService.ERMrest.resolve(url, { cid: "migration" }),
      (response: any) => {
        this.reference = response.contextualize.entryCreate;

        let formData : any = {};

        this.columnModels = this.reference.columns.map((col: any) => {
          let cm = new RecordEditColumnModel(col);
          formData[cm.column.name] = cm.formControl;
          return cm;
        });

        this.form = this.fb.group(formData);

        this.pageReady = true;
      },
      (error: any) => {
        this.hasError = true;
        console.log(error);
      }
    );
  }

}
