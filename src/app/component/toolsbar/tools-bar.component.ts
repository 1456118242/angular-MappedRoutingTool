/**
 * Created by 123 on 2018/4/3.
 */
import {
    Component,
    OnInit,
    Input,
    Output,
    OnChanges,
    EventEmitter,
    ViewChildren,
    QueryList,
    ElementRef, ViewChild, AfterViewInit
} from '@angular/core';
import { ObservableBusService } from '../../service/observable-bus.service';
import { ToolsBar } from './shared/tools-bar.model';
import * as _ from 'lodash';
import {FieldValueObject} from "../../shared/field-value-object.model";

@Component({
  selector: 'tools-bar',
  templateUrl:'./tools-bar.component.html',
  providers:[]

})

export class ToolsBarComponent implements OnChanges {
  @Input() salesColumnGroupName:string[];
  @Input() isSelectAllRouteInfo: boolean;
  @Input() salesColumnGroupNameFieldValueObjectArray: FieldValueObject[];
  @Input() isDrawRouteline: boolean;
  @Input() showColumnText: string;
  @Input() isDrawRoutesByManual:boolean;

  @Output() onSelectMarkersOnMapByRect = new EventEmitter();
  @Output() onSelectMarkersOnMapByCustomPolygon = new EventEmitter();
  @Output() onSetMapCenter = new EventEmitter();
  @Output() onChangeMapModeToMove = new EventEmitter();
  @Output() onUnSelectMarkersOnMap = new EventEmitter();
  @Output() onExpandOrShrinkAllRouteInfo = new EventEmitter<boolean>();
  @Output() onShowOrHideRouteLineOnMap = new EventEmitter<boolean>();
  public isShowToolsBar_v:boolean = false;
  public isSelectedStyle_v:number = 0;

  constructor (public observableBusService:ObservableBusService){
  }

  ngOnChanges(){
  }

  public selectMarkersByRect(){
    this.isSelectedStyle_v = 1;
    this.onSelectMarkersOnMapByRect.emit();
  }
  public moveMap(){
    this.isSelectedStyle_v = 0;
    this.onChangeMapModeToMove.emit();
  }
  public selectMarkersByCustomPolygon(){
    this.isSelectedStyle_v = 2;
    this.onSelectMarkersOnMapByCustomPolygon.emit();
  }
  public unselect(){
    this.onUnSelectMarkersOnMap.emit();
  }
  public resetMapCenter(){
    this.onSetMapCenter.emit();
  }

  public hideOrShowAllRouteList(){
    this.isSelectAllRouteInfo = !this.isSelectAllRouteInfo;
    this.onExpandOrShrinkAllRouteInfo.emit(this.isSelectAllRouteInfo);
  }

  public hideOrShowAllRouteLineList(){
    this.isDrawRouteline = !this.isDrawRouteline;
    this.onShowOrHideRouteLineOnMap.emit(this.isDrawRouteline);
  }

}
