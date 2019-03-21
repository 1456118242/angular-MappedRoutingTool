import {Pipe, PipeTransform} from "@angular/core";
import * as _ from "lodash";
import {StopInfo} from "../shared/stop-info.model";

@Pipe({
    name:'calculateSumOfStopsPerWeek'
})

export class calculateSumOfStopsPerWeekPipe implements PipeTransform{

    transform(stops:Array<StopInfo>): any {
            let sum = 0;
            _.forEach(stops, function (s) {
                sum += parseFloat(s.stopsPerWeek+"")
            });
            return  sum.toFixed(2);
    }

}