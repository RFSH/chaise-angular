export class TableModel {
  reference: any;
  tableReady: boolean = false;
  hasError: boolean = false;
  displayname: {isHTML: boolean, value: string} = {isHTML: false, value: ""};
  columns: any;
  values: any;
  totalCount: number = 0;
  currentCount: number = 0;
  pageLimit: number = 25;

  constructor (_reference?: any) {
    if (_reference) {
      this.reference = _reference;
      this.displayname = _reference.displayname;
      this.columns = _reference.columns;
    }
  }

  changePageLimit(pageLimit: number) {
    let res = new TableModel(this.reference);
    res.pageLimit = pageLimit;
    return res;
  }
}
