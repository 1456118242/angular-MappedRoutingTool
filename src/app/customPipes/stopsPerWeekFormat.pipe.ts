import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name:'stopsPerWeekFormat'
})

export class stopsPerWeekFormatPipe implements PipeTransform{

    transform(stopsPerWeek): any {
        return parseFloat(stopsPerWeek).toFixed(2);
    }

}