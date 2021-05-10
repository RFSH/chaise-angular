export class RecordEditColumnModel {
  column: any;
  isRequired: boolean = false;
  isDisabled: boolean = false;
  inputType: "disabled" | "text" | "longtext" = "text";

  constructor(_column: any) {
    this.column = _column;
    this.isRequired = _column.nullok && !_column.isDisabled;
    this.isDisabled = _column.inputDisabled != false;

    if (this.isDisabled) {
      this.inputType = "disabled";
    } else {
      switch (_column.type.name) {
        case "longtext":
        case "markdown":
          this.inputType = "longtext";
          break;
        default:
          this.inputType = "text";
      }
    }
  }
}
