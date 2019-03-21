import {
    Component,
    Input,
    Output,
    OnChanges,
    OnInit,
    OnDestroy,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    EventEmitter,
    ElementRef,
    QueryList,
    ViewChildren,
    ViewChild,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import * as _ from 'lodash';

import {RouteInfo} from '../../shared/route-info.model'
import {ObservableBusService} from '../../service/observable-bus.service'
import {Subscription}   from 'rxjs';
import {UtilService} from '../../service/util.service'
import {RootJson} from "../../shared/root-json.model";
import {CustomColumn} from "../../shared/custom-column.model";
import {Colors} from "../../shared/constant";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {Subject} from "../../../../node_modules/rxjs";
import {DataService} from "../../service/data.service";


@Component({
    selector: 'route-table-summery-for-plan',
    templateUrl: 'route-table-summery-for-plan.component.html',
    providers: [DecimalPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation:ViewEncapsulation.None
})
export class RouteTableSummeryForPlanComponent implements OnInit,OnDestroy,OnChanges{
    @Input() arrayDeliveryman: Array<any>;
    @Input() arrayVehicle: Array<any>;
    @Input() rootData: RootJson;
    @Output() onChangeRouteInfoSelectStatus = new EventEmitter();
    @Output() onChangeRouteOnMapStatus = new EventEmitter<RouteInfo>();
    @Output() onChangeRouteColor = new EventEmitter<RouteInfo>();
    @Output() onChangeRouteInfoHelper = new EventEmitter<RouteInfo>();
    @Output() onSendMessage = new EventEmitter<RouteInfo>();
    @Output() onMoveToThisLoadSheet = new EventEmitter<RouteInfo>();
    @Output() onAddScheduledEvents = new EventEmitter<RouteInfo>();
    @Output() onDeletePlanHandler = new EventEmitter<RouteInfo>();
    @Output() onInitToolView = new EventEmitter<any>();
    @Output() onInitToolForPlan = new EventEmitter<any>();
    @ViewChildren('tool', {read: ElementRef}) tool: QueryList<ElementRef>;
    @ViewChildren('toolForPlan', {read: ElementRef}) toolForPlan: QueryList<ElementRef>;

    @ViewChild('label')
    public label: any;
    public isExpand_v: boolean = true;
    public isShowTimeline_v: boolean = false;
    public  deliverymanBuffer = [];
    public  vehicleBuffer = [];
    public deliverymanLoading = false;
    public  colors=[];
    public vehicleLoading = false;
    public deliverymanTypeahead = new Subject<string>();
    public vehicleTypeahead = new Subject<string>();

    hideOrShowAllRouteListSub: Subscription;
    showOrHideAllRouteSub: Subscription;
    isShowTimelineSub: Subscription;

    private deliveryMans;
    private vehicles;
    constructor(private observableBusService: ObservableBusService,public el:ElementRef, public decimalPipe: DecimalPipe, public utilService: UtilService, public cd: ChangeDetectorRef,public dataService:DataService) {

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
            this.rootData.isShowMoveToThisLoadSheet = isShow;
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

    MoveToThisLoadSheet(routeInfo: RouteInfo) {
        this.onMoveToThisLoadSheet.emit(routeInfo);
    }

    addScheduledEvents(route: RouteInfo) {
        this.onAddScheduledEvents.emit(route);
    }

    deletePlanHandler(LoadSheetID: any) {
        this.onDeletePlanHandler.emit(LoadSheetID);
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

    ngOnChanges(changes: SimpleChanges): void {

    }

    onChangeVehicle(route,event){
        if(event){
            route.vehicleID =event.value;
        }
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

    onFocus(event){
        this.el.nativeElement.querySelector('.table-group').style.overflowX = 'inherit';
    }

    onBlur(event){
        this.el.nativeElement.querySelector('.table-group').style.overflowX = 'scroll';
    }
}
