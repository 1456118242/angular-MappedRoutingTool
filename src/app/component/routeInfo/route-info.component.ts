import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    OnChanges,
    EventEmitter,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ViewChild, AfterViewInit, ElementRef, QueryList, ViewChildren
} from '@angular/core';

import * as _ from 'lodash';
import { Subscription }   from 'rxjs';

import { StopInfo } from '../../shared/stop-info.model';
import { RouteInfo } from '../../shared/route-info.model';
import { DropDownMenuTemplate } from '../dropDownMenu/shared/drop-down-menu.model';
import { DndDropEvent, DropEffect } from "ngx-drag-drop";

import { ReSequenceDropDownMenuTemplate, ColumnOptionDropDownMenuTemplate } from '../../shared/constant'
import { RouteInfoService } from './shared/route-info.service'
import {  ObservableBusService } from '../../service/observable-bus.service'
import {Observable} from "rxjs";
import {FieldValueObject} from "../../shared/field-value-object.model";
import {DropDownMenuComponent} from "../dropDownMenu/drop-down-menu.component";

@Component({
  selector: 'route-info',
  templateUrl:'route-info.component.html',
  providers:[RouteInfoService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class RouteInfoComponent implements OnInit, OnDestroy,AfterViewInit{

  @Input() routeInfo:RouteInfo;
  @Input() index:number;
  @Input() showColumnGroupArray: Array<string>;
  @Input() linearUnitOfMeasure: string;
  @Input() columnOptionDropDownMenuTemplate:any;
  @Output() onMoveFromRouteInfo = new EventEmitter<any>();
  @Output() onDropToRouteInfo = new EventEmitter<any>();
  @Output() onReSequence = new EventEmitter<any>();
  @Output() onChangeRouteInfoSelectStatus = new EventEmitter();
  @Output() onChangeColumn = new EventEmitter<any>();
  @Output() onChangeRouteInfoStartTime = new EventEmitter<any>();
  @Output() onChangePoint = new EventEmitter<any>();
  @Output() ongeocodeStop = new EventEmitter<any>();
  @Output() onmoveInvoice = new EventEmitter<any>();
  @Output() onDeletePlan = new EventEmitter<any>();
    @Output() onChangePhase = new EventEmitter<any>();
    @Output() onChangeActivity = new EventEmitter<any>();
    @Output() onMoveStopToOtherRoute = new EventEmitter<any>();
  @Output() onInitToolView = new EventEmitter<any>();
  @Output() onInitToolForPlanView = new EventEmitter<any>();
  @Output() onInitRoutePlannerView = new EventEmitter<any>();
  @Output() onClickCustomerInfo = new EventEmitter<any>();

  public reSequenceDropDownMenuTemplate_v:DropDownMenuTemplate;
  public columnOptionDropDownMenuTemplate_v: DropDownMenuTemplate;
  public isShowEditStartTime_v: boolean;
  public editStartTimeText_v:string;

  @ViewChild('reSequenceDropDownMenu')
  private reSequenceDropDownMenuComponent: DropDownMenuComponent;
  @ViewChild('columnDropDownMenu')
  private columnDropDownMenuComponent: DropDownMenuComponent;
  private markForCheckRouteInfoComponentSubscription: Subscription;
    @ViewChildren('tool',{read:ElementRef})tool:QueryList<ElementRef> ;
    @ViewChildren('toolForPlan',{read:ElementRef})toolForPlan:QueryList<ElementRef> ;
    @ViewChildren('routePlanner',{read:ElementRef})routePlanner:QueryList<ElementRef> ;

  constructor(public routeInfoService: RouteInfoService,public observableBusService:ObservableBusService, public cd:ChangeDetectorRef) {
    this.reSequenceDropDownMenuTemplate_v =  ReSequenceDropDownMenuTemplate;
    this.columnOptionDropDownMenuTemplate_v = JSON.parse(JSON.stringify(ColumnOptionDropDownMenuTemplate));
    this.isShowEditStartTime_v = false;
  }

  ngOnInit(): void{
    this.editStartTimeText_v = this.routeInfo.startTime;

    this.markForCheckRouteInfoComponentSubscription = this.observableBusService.markForCheckRouteInfoComponent$.subscribe((routeInfoIDs)=>{
      if (_.includes(routeInfoIDs, this.routeInfo.id)){
        this.cd.markForCheck();
      }
    });
  }

  ngAfterViewInit(): void {
    this.tool.forEach((eleref)=>{
      eleref.nativeElement.style.display = 'none';
    });
      this.toolForPlan.forEach((eleref)=>{
          eleref.nativeElement.style.display = 'none';
      });
      this.routePlanner.forEach((eleref)=>{
          eleref.nativeElement.style.display = 'none';
      });
    this.onInitToolView.emit(this.tool);
    this.onInitToolForPlanView.emit(this.toolForPlan);
    this.onInitRoutePlannerView.emit(this.routePlanner);
  }

  ngOnDestroy(): void{
    this.markForCheckRouteInfoComponentSubscription.unsubscribe();
  }

  onDragged( dragStopInfo:any, fromRouteInfo: any ) {
      // const index = routeInfo.stopInfos.indexOf( stopInfo );
      // routeInfo.stopInfos.splice( index, 1 );

    const eventObj:any = {
      dragStopInfo,
      fromRouteInfo
    };

    this.onMoveFromRouteInfo.emit(eventObj);
  }

  onDrop( event:DndDropEvent, toRouteInfo:any ) {
      let toIndex = event.index;
      if( typeof toIndex === "undefined" ) {
        toIndex = toRouteInfo.stopInfos.length;
      }

      let dragStopInfo: StopInfo = event.data;
      // if (toIndex >= toRouteInfo.stopInfos.length){
      //   toIndex = toRouteInfo.stopInfos.length - 1;
      // }

    const eventObj:any = {
      dragStopInfo,
      toIndex,
      toRouteInfo,
      isBestFit:false
    };

    this.onDropToRouteInfo.emit(eventObj);
  }

  onDropBestFitCallback(event:DndDropEvent, toRouteInfo:any ){
    const toIndex = toRouteInfo.stopInfos.length;
    let dragStopInfo: StopInfo = event.data;
    const eventObj:any = {
      dragStopInfo,
      toIndex,
      toRouteInfo,
      isBestFit:true
    };

    this.onDropToRouteInfo.emit(eventObj);
  }

  toggleRouteInfo(): void {
      this.routeInfo.isSelected= !this.routeInfo.isSelected;
      this.onChangeRouteInfoSelectStatus.emit();
      this.observableBusService.markForCheckAllOnPushComponent([this.routeInfo.id]);
  }

  onReSequenceClickHandler(keyValue:FieldValueObject){
    let eventObj:any = {
      routeInfo:this.routeInfo,
      sequenceType:keyValue.value
    };

    this.onReSequence.emit(eventObj);
  }

  onSelectReSequenceClickHandler(keyValue:FieldValueObject){
    let eventObj:any = {
      routeInfo:this.routeInfo,
      sequenceType:keyValue.value
    };

    this.onReSequence.emit(eventObj);
  }

  onSelectColumnClickHandler(keyValue:FieldValueObject){
    this.routeInfo.routeSelectColumnState = keyValue;
    this.onChangeColumn.emit(this.routeInfo);
  }

  saveStartTimeHandler(event, routeInfo){
    let formatedTime = this.formatTime( event.currentTarget.previousSibling.previousSibling.value );
    if ( _.isEmpty( formatedTime ) ) {
      alert( "Start Time is a required field.It muset contain a valid value." );
    } else {
      event.currentTarget.previousSibling.previousSibling.value = formatedTime;
      this.isShowEditStartTime_v = false;
      this.routeInfo.startTime = event.currentTarget.previousSibling.previousSibling.value;
      this.editStartTimeText_v = this.routeInfo.startTime;

      this.onChangeRouteInfoStartTime.emit(routeInfo);
    }
  }

  displayColumn(column:string){
    if (!_.isUndefined(this.routeInfo.customColumns) && !_.isNull(this.routeInfo.customColumns)) {
      let aa = this.routeInfo.customColumns.find(c => {
        return c.field == column;
      });

      return aa ? aa.value : 0;
    }
  }

  routeInfoClickHandler(){
    this.reSequenceDropDownMenuComponent.setIsShowDropDownMenuFalse();
    this.columnDropDownMenuComponent.setIsShowDropDownMenuFalse();
    this.isShowEditStartTime_v = false;
    this.editStartTimeText_v = this.routeInfo.startTime;
  }

  trackByStopInfo(index: number, stopInfo: StopInfo): number {
    return index;
  }

  private formatTime ( value:any ) {
  let IsPM = value.toUpperCase().indexOf( "PM" ) > 0;
  let Hour, Minute;
  value = value.match( /[0-9:]/ig );
  if ( value === null || value === "" ) {
    return "";
  } else if ( value.length > 0 ) {
    value = value.join( "" );
  }

  if ( value.indexOf( ":" ) < 0 ) {
    var len = value.length;
    if ( len < 3 ) {
      Hour = value;
      Minute = "00";
    } else if ( len == 3 ) {
      Hour = value.substr( 0, 1 );
      Minute = value.substr( 1, 3 );
    } else {
      Hour = value.substr( 0, 2 );
      Minute = value.substr( 2, 2 );
    }
  } else {
    var TimeComponents = [];
    TimeComponents = value.split( " " );
    var Time = value;
    var HoursMinutes = [];
    HoursMinutes = Time.split( ":" );
    Hour = HoursMinutes[ 0 ];
    Minute = HoursMinutes[ 1 ];
  }

  if ( IsPM ) {
    if ( Hour > 12 && Hour < 24 ) {
      Hour -= 12;
    } else if ( Hour == 24 && UserTimeFormat != 2 ) {
      Hour = 12;
      IsPM = false;
    } else if ( Hour == 24 && UserTimeFormat == 2 ) {
      Hour = 0;
      IsPM = false;
    }
  } else {
    if ( Hour > 12 && Hour < 24 ) {
      Hour -= 12;
      IsPM = true;
    } else if ( Hour == 12 && UserTimeFormat != 2 ) {
      Hour = 12;
      IsPM = true;
    } else if ( (Hour == 0 || Hour == 24) && UserTimeFormat != 2 ) {
      Hour = 12;
    } else if ( Hour == 24 && UserTimeFormat == 2 ) {
      Hour = 0;
    }
  }

  if ( Hour > 24 ) {
    return "";
  } else {
    Hour = parseInt( Hour );
  }

  if ( Minute == "" || Minute == undefined ) {
    Minute = "00";
  } else if ( Minute > 59 ) {
    return "";
  }

  if ( Minute.length < 2 ) {
    Minute = "0" + Minute;
  }
  //
  //switch (UserTimeFormat) {
  //    case 2:
  //        if (IsPM) {
  //            value = (Hour + 12) + ":" + Minute;
  //        } else {
  //            value = Hour + ":" + Minute;
  //        }
  //        break;
  //    default:
  if ( IsPM ) {
    value = Hour + ":" + Minute + " PM";
  } else {
    value = Hour + ":" + Minute + " AM";
  }
  //break;
  //}

  return value;
}

  changeStartPoint(route:RouteInfo,isStartPoint:number){
    let changePointStr = isStartPoint?"endMapPointID":'startMapPointID';
    const changePointObj = {
      route:route,
      changePoint:changePointStr
    };
    this.onChangePoint.emit(changePointObj);
  }

  geocodeStop(event:any){
    this.ongeocodeStop.emit(event);
  }
  moveInvoice(event:any){
    this.onmoveInvoice.emit(event);
  }

    initToolView(event:any){
      this.onInitToolView.emit(event);
    }

    initToolForPlan(event:any){
      this.onInitToolForPlanView.emit(event);
    }

    deletePlan($event: any) {
        this.onDeletePlan.emit($event);
    }


    initRoutePlanner($event: any) {
        this.onInitRoutePlannerView.emit($event);
    }

    changeActivity($event: any){
      this.onChangeActivity.emit($event);
    }

    changePhase($event: any){
      this.onChangePhase.emit($event);
    }

    moveStopToOtherRoute($event:any){
        this.onMoveStopToOtherRoute.emit($event);
    }

    clickCustomerInfo(stopId: any) {
        this.onClickCustomerInfo.emit(stopId);
    }
}

