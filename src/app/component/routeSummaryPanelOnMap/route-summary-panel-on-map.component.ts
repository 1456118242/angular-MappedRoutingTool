import {Component, Input} from '@angular/core';
import {RouteSummaryOnMap} from "./shared/route-summary-on-map.model";


@Component({
  selector: 'route-summary-panel-on-map',
  templateUrl:'route-summary-panel-on-map.component.html',
  providers:[]

})
export class RouteSummaryPanelOnMap{
  @Input()  routeSummaryPanelOnMap:RouteSummaryOnMap;
}

