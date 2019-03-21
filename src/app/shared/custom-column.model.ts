
export class CustomColumn {
  constructor(displayText?: string, field?: any,value?: any,type: string = 'text', isShowInRouteSummary: boolean = true){
    this.displayText = displayText;
    this.field = field;
    this.value = value;
    this.type = type;
    this.isShowInRouteSummary = isShowInRouteSummary;
  }

  displayText?: string;
  field?: string;
  value?: string;
    type?:string;
  isShowInRouteSummary?:boolean;
  getValue(field){
    if(field == this.field){
        return this.value;
    }
  }
}
