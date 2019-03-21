import {
    Component,
    Input,
    Output,
    OnInit,
    OnDestroy,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    EventEmitter,
    AfterViewInit, ElementRef
} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import * as _ from 'lodash';

import {RouteInfo} from '../../shared/route-info.model'
import {ObservableBusService} from '../../service/observable-bus.service'
import {Subscription} from 'rxjs';
import {UtilService} from '../../service/util.service'
import {RootJson} from "../../shared/root-json.model";
import {Colors} from '../../shared/constant'
import {CustomColumn} from "../../shared/custom-column.model";
import {Subject} from "../../../../node_modules/rxjs";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {DataService} from "../../service/data.service";
import {WindowRef} from "../../service/windowRef.service";


@Component({
    selector: 'route-table-summery',
    templateUrl: 'route-table-summery.component.html',
    providers: [DecimalPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteTableSummeryComponent implements OnInit, OnDestroy {
    @Input() deliverymanArray: Array<any>;
    @Input() vehicleArray: Array<any>;
    @Input() rootData: RootJson;
    @Output() onChangeRouteInfoSelectStatus = new EventEmitter();
    @Output() onChangeRouteOnMapStatus = new EventEmitter<RouteInfo>();
    @Output() onChangeRouteColor = new EventEmitter<RouteInfo>();
    @Output() onChangeRouteInfoHelper = new EventEmitter<RouteInfo>();
    @Output() onSendMessage = new EventEmitter<RouteInfo>();
    @Output() onMoveToThisLoadSheet = new EventEmitter<RouteInfo>();
    @Output() onAddScheduledEvents = new EventEmitter<RouteInfo>();
    @Output() onDeletePlanHandler = new EventEmitter<RouteInfo>();

    public isExpand_v: boolean = true;
    public isShowTimeline_v: boolean = false;
    public deliverymanLoading = false;
    public vehicleLoading = false;
    public  deliverymanBuffer = [];
    public  vehicleBuffer = [];
    public  colors=[];
    public deliverymanTypeahead = new Subject<string>();
    public vehicleTypeahead = new Subject<string>();
    public showTableLineStr = 'Route,Color,Deliveryman,Vehicle,Stops';



    hideOrShowAllRouteListSub: Subscription;
    showOrHideAllRouteSub: Subscription;
    isShowTimelineSub: Subscription;

    private deliveryMans;
    private vehicles;
    constructor(private observableBusService: ObservableBusService, public el:ElementRef,public decimalPipe: DecimalPipe, public utilService: UtilService, public cd: ChangeDetectorRef,public dataService:DataService) {

    }

    ngOnInit() {

        this.colors = Colors;
        this.isShowTimelineSub = this.observableBusService.isShowTimelineAnnounced$.subscribe((isShowTimeline) => {
            this.isShowTimeline_v = isShowTimeline;

        });

        this.observableBusService.markForCheckRouteTableSummaryComponent$.subscribe(() => {
            this.vehicleBuffer = this.buildVehicals(this.vehicles);
            this.deliverymanBuffer = this.buildDeleveryMans(this.deliveryMans);
            this.cd.markForCheck();
        });

        this.observableBusService.showToLoadSheetRouteNameAnnounceSource$.subscribe((isShow) => {
            if (!_.isUndefined(isShow)) {
                this.rootData.isShowMoveToThisLoadSheet = isShow;
            }
        });
        this.observableBusService.routeInfosCompeletedSource$.subscribe(()=>{
           this.cd.markForCheck();
        });
        this.dataService.getUsers().then((response) => {
            this.deliveryMans = response.json().result;
        });
        this.dataService.getVehicle().then((response)=>{
            this.vehicles = response.json().result;
        });
        this.deliverymanDataTypeahead();
        this.vehicalDataTypeahead();
    }

    onFocus(event){
        this.el.nativeElement.querySelector('.table-group').style.overflowX = 'inherit';
    }

    onBlur(event){
        this.el.nativeElement.querySelector('.table-group').style.overflowX = 'scroll';
    }

    ngOnDestroy() {
        this.isShowTimelineSub.unsubscribe();
        this.showOrHideAllRouteSub.unsubscribe();
        this.hideOrShowAllRouteListSub.unsubscribe();
    }

    public showOrHideRouteInfo(routeInfo: RouteInfo) {
        routeInfo.isSelected = !routeInfo.isSelected;
        this.onChangeRouteInfoSelectStatus.emit();
        this.observableBusService.markForCheckAllOnPushComponent([routeInfo.id]);
    }

    hideOrShowRouteOnMapHandler(routeInfo: RouteInfo) {
        routeInfo.isShowOnMap = !routeInfo.isShowOnMap;
        this.onChangeRouteOnMapStatus.emit(routeInfo);
    }

    changeRouteColorHandler(routeInfo: RouteInfo) {
        this.onChangeRouteColor.emit(routeInfo);
    }

    sendMessageHandler(routeInfo: RouteInfo) {
        this.onSendMessage.emit(routeInfo);
    }

    MoveToThisLoadSheet(routeInfo: RouteInfo) {
        this.onMoveToThisLoadSheet.emit(routeInfo);
    }

    sumOfStopCount() {
        return _.sumBy(this.rootData.routeInfos, (r) => {
            return r.stopInfos.length
        })
    }

    public helperChangedHandler(routeInfo: RouteInfo) {
        this.onChangeRouteInfoHelper.emit(routeInfo);
    }

    trackByCustomColumns(index: number, customColumn: CustomColumn): number {
        return index;
    }


    deliverymanDataTypeahead(){
        this.deliverymanTypeahead.pipe(
            tap(() => this.deliverymanLoading = true),
            distinctUntilChanged(),
            debounceTime(200),
            switchMap(term => this.dataService.loadUsers(term)),
        ).subscribe((x:any) => {
            this.deliverymanBuffer = x.json().result;
            this.deliverymanLoading = false;
            this.cd.markForCheck();
        }, () => {
            this.deliverymanBuffer = [];
        });
    }

    vehicalDataTypeahead(){
        this.vehicleTypeahead.pipe(
            tap(() => this.vehicleLoading = true),
            distinctUntilChanged(),
            debounceTime(200),
            switchMap(term => this.dataService.loadVehicle(term)),
        ).subscribe((x:any) => {
            this.vehicleBuffer = x.json().result;
            this.vehicleLoading = false;
            this.cd.markForCheck();
        }, () => {
            this.vehicleBuffer = [];
        });
    }

    buildDeleveryMans(result):Array<Object>{
        _.forEach(this.rootData.routeInfos,(routeInfo)=>{
           let isContain = _.findIndex(result,(item)=>{
               return routeInfo.deliveryman == item['value'];
           });

           if(isContain == -1){
              let CurrentInputObj = {label:routeInfo.userName,value:routeInfo.deliveryman};
              result.unshift(CurrentInputObj);
            }
        });
        return result;
    }

    buildVehicals(result){
        _.forEach(this.rootData.routeInfos,(routeInfo)=>{
            let isContain = _.findIndex(result,(item)=>{
                return routeInfo.vehicleID == item['value'];
            });

            if(isContain == -1){
                let CurrentInputObj = {label:routeInfo.vehicle,value:routeInfo.vehicleID};
                result.unshift(CurrentInputObj);
            }
        });
        return result;
    }


}
