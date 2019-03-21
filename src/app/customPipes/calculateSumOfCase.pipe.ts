import {Pipe, PipeTransform} from "@angular/core";
import {DecimalPipe} from "@angular/common";
import {StopInfo} from "../shared/stop-info.model";
import * as _ from "lodash";

@Pipe({
    name:'calculateSumOfCase'
})

export class calculateSumOfCasePipe implements PipeTransform{
    constructor( public decimalPipe:DecimalPipe){

    }

    transform(stops:Array<StopInfo>): any {

            let sum = 0;
            _.forEach(stops, function (s) {
                sum += s.cases;
            });
            return this.decimalPipe.transform(sum);
    }

}