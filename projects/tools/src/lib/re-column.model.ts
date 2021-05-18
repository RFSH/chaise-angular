import { Validators } from "@angular/forms";

export class RecordEditColumnModel {
  column: any;
  private _formControl: any;
  isRequired: boolean = false;
  isDisabled: boolean = false;
  inputType: "disabled" | "text" | "longtext" | "foreignkey" = "text";

  constructor(_column: any) {
    this.column = _column;
    this.isDisabled = _column.inputDisabled != false;
    this.isRequired = !_column.nullok && !this.isDisabled;

    if (this.isDisabled) {
      this.inputType = "disabled";
    } else if (_column.isForeignKey) {
      this.inputType = "foreignkey";
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

  get formControl() : any {
    if (this._formControl != null) {
      return this._formControl;
    }
    let defaultVal : any = this.column.default;
    let resDefault : any = "", resValidators : any[] = []
    if (!this.column.isForeignKey) {
      resDefault = defaultVal;
    }

    if (this.isRequired) {
      resValidators.push(Validators.required);
    }

    if (this.isDisabled) {
      resDefault = {value: '', disabled: true};
    }

    this._formControl = [resDefault, resValidators];
    return this._formControl;
  }
}
