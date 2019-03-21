import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
   name:'phaseFormat'
})

export class phaseFormatPipe implements PipeTransform{

    transform(phase:string): any {
        let  tmpValue;
        switch (phase) {
            case "All":
                tmpValue = "All";
                break;
            case "13":
                tmpValue = "1 & 3";
                break;
            case "24":
                tmpValue = "2 & 4";
                break;
            case "1":
                tmpValue = "1 only";
                break;
            case "2":
                tmpValue = "2 only";
                break;
            case "3":
                tmpValue = "3 only";
                break;
            case "4":
                tmpValue = "4 only";
                break;
        }
        return tmpValue;
    }

}


