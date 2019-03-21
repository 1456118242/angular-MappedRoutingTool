import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {StopSummaryOnMap} from "./shared/stop-summary-panel-on-map.model";


@Component({
  selector: 'stop-summary-panel-on-map',
  templateUrl:'stop-summary-panel-on-map.component.html',
  providers:[]

})
export class StopSummaryPanelOnMap implements OnInit{
  @Input() stopSummaryPanelOnMap:StopSummaryOnMap;
  @Output() onEditGeocode = new EventEmitter<any>();

  constructor() {

  }

  ngOnInit(): void{

  }

  editGeocodeHandler(shopId:any, routeId:any){
    const event = {
        stopId:shopId,
      routeId:routeId
    };
    this.onEditGeocode.emit(event);
  }

}

