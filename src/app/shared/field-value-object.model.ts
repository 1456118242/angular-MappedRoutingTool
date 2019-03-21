export class FieldValueObject {
  constructor(field?: string, value?: string, isShow?: boolean){
    if (field && value){
      this.field = field;
      this.value = value;
      this.isShow = isShow;
    }

  }

  field:string;
  value?: string|number|boolean;
  isShow?: boolean;
}
