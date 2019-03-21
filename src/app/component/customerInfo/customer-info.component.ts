import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ElementRef, QueryList, ViewChildren, OnChanges, AfterViewInit
} from '@angular/core';

import { CustomerInfoService } from './shared/customer-info.service'
import { StopInfo } from '../../shared/stop-info.model'
import {ObservableBusService} from "../../service/observable-bus.service";
import {RouteInfo} from "../../shared/route-info.model";

@Component({
  selector: '[cusotmerInfo]',
  templateUrl:'customer-info.component.html',
  providers:[CustomerInfoService]

})
export class CustomerInfoComponent implements OnInit ,AfterViewInit {

  @Input() customerInfo:StopInfo;
  @Input() routeInfo?: RouteInfo;
  @Input() showColumnGroupArray: Array<string>;
  @Output() geocodeStop = new EventEmitter<any>();
  @Output() moveInvoice = new EventEmitter<any>();
    @Output() onInitToolView = new EventEmitter<any>();
    @Output() onInitToolForPlan = new EventEmitter<any>();
    @Output() onInitToolRoutePlanner = new EventEmitter<any>();
    @Output() onDeletePlan = new EventEmitter<any>();
    @Output() onAddRoute = new EventEmitter<any>();
    @Output() onChangePhase = new EventEmitter<any>();
    @Output() onChangeActivity = new EventEmitter<any>();
    @Output() onMoveStopToOtherRoute = new EventEmitter<any>();
    @Output() onClickCustomerInfo = new EventEmitter<any>();


    @ViewChildren('tool',{read:ElementRef})tool:QueryList<ElementRef> ;
    @ViewChildren('toolForPlan',{read:ElementRef})toolForPlan:QueryList<ElementRef> ;
    @ViewChildren('routePlanner',{read:ElementRef})routePlanner:QueryList<ElementRef> ;
  public isShowCustomerDetail_v = false;

  constructor(public customerInfoService: CustomerInfoService, public observableBusService:ObservableBusService) {

  }

  ngOnInit(): void{

  }

  toggleCustomerDetail(){
    this.isShowCustomerDetail_v = !this.isShowCustomerDetail_v;
  }

  public clickCustomerInfoHandler(stopInfo: StopInfo){
      if(stopInfo.lat&&stopInfo.lng){
          this.toggleCustomerDetail();
          this.observableBusService.setMarkerSizeAndZindex({stopInfo,
              isNormal: !this.isShowCustomerDetail_v});
          this.onClickCustomerInfo.emit({stopInfo:{id:stopInfo.id,lat:stopInfo.lat,lng:stopInfo.lng},isNormal: !this.isShowCustomerDetail_v});
      }
  }
  ongeocodeStop(stop,route){
    const event ={
      stop:stop,
      route:route
    };
    this.geocodeStop.emit(event);
  }
  onmoveInvoice(stop,route){
    const event ={
      stop:stop,
      route:route
    };
    this.moveInvoice.emit(event);
  }
    deleteEventHandler(stop,route){
        const event = {};
        event['stop'] = stop;
        event['route'] = route;
        this.onDeletePlan.emit(event);
    }

    ngAfterViewInit(): void {
        this.tool.forEach((eleRef)=>{
            eleRef.nativeElement.style.display = 'none';
        });
        this.toolForPlan.forEach((eleRef)=>{
            eleRef.nativeElement.style.display = 'none';
        });
        this.routePlanner.forEach((eleRef)=>{
            eleRef.nativeElement.style.display = 'none';
        });
        this.onInitToolView.emit(this.tool);
        this.onInitToolForPlan.emit(this.toolForPlan);
        this.onInitToolRoutePlanner.emit(this.routePlanner);
    }


    moveStopToOtherRouteWindow(customerInfo: StopInfo,routeInfo) {
        let event = {};
        event["stopInfo"] = customerInfo;
        event["routeInfo"] = routeInfo;
        this.onMoveStopToOtherRoute.emit(event);
    }

    changePhaseWindow(customerInfo: StopInfo,routeInfo) {
        const event = {};
        event['stop'] = customerInfo;
        event['route'] = routeInfo;
        this.onChangePhase.emit(event);
    }

    changeActivityWindow(customerInfo: StopInfo) {
         this.onChangeActivity.emit(customerInfo);
    }

    phaseFormat(flag) {
        var tmpValue;
        switch (flag) {
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

