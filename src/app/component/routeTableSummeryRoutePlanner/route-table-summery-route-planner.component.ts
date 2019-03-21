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
    AfterViewInit,
    ElementRef,
    QueryList,
    ViewChildren,
    AfterViewChecked,
    AfterContentChecked,
    ViewChild,
    SimpleChanges,
    ViewEncapsulation, AfterContentInit
} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import * as _ from 'lodash';

import {RouteInfo} from '../../shared/route-info.model'
import {ObservableBusService} from '../../service/observable-bus.service'
import {Subscription} from 'rxjs';
import {UtilService} from '../../service/util.service'
import {RootJson} from "../../shared/root-json.model";
import {CustomColumn} from "../../shared/custom-column.model";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {Subject} from "../../../../node_modules/rxjs";
import {DataService} from "../../service/data.service";
import {Colors} from "../../shared/constant";
import {RoutePlannerService} from "../../routePlanner/route-planner.service";
import {GlobalSettingService} from "../../service/global-setting.service";


@Component({
    selector: 'route-table-summery-route-planner',
    templateUrl: 'route-table-summery-route-planner.component.html',
    providers: [DecimalPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation:ViewEncapsulation.None
})
export class RouteTableSummeryRoutePlannerComponent implements OnInit, OnDestroy{
    @Input() arrayDeliveryman: Array<any>;
    @Input() arrayActivity: Array<any>;
    @Input() rootData: RootJson;
    @Output() onChangeRouteInfoSelectStatus = new EventEmitter();
    @Output() onChangeRouteOnMapStatus = new EventEmitter<Array<RouteInfo>>();
    @Output() onChangeRouteColor = new EventEmitter<RouteInfo>();
    @Output() onChangeRouteInfoHelper = new EventEmitter<RouteInfo>();
    @Output() onSendMessage = new EventEmitter<RouteInfo>();
    @Output() onMoveToThisLoadSheet = new EventEmitter<RouteInfo>();
    @Output() onAddScheduledEvents = new EventEmitter<RouteInfo>();
    @Output() onDeletePlanHandler = new EventEmitter<RouteInfo>();
    @Output() onSetThisRouteCenter = new EventEmitter<RouteInfo>();
    @Output() onEditRouteHander = new EventEmitter<any>();
    @Output() onDeleteRoute = new EventEmitter<any>();
    @Output() onInitToolView = new EventEmitter<any>();
    @Output() onInitToolForPlan = new EventEmitter<any>();
    @Output() onActivityChangeEmitter = new EventEmitter<any>();
    @ViewChildren('tool', {read: ElementRef}) tool: QueryList<ElementRef>;
    @ViewChildren('toolForPlan', {read: ElementRef}) toolForPlan: QueryList<ElementRef>;

    @ViewChild('label')
    public label: any;


    public isExpand_v: boolean = true;
    public deliverymanLoading = false;
    public deliverymanBuffer = [];
    public colors = [];
    public routePlannerTableData;
    public routNumWidth = 0;
    public deliverymanTypeahead = new Subject<string>();
    hideOrShowAllRouteListSub: Subscription;
    showOrHideAllRouteSub: Subscription;
    isShowTimelineSub: Subscription;

    public routeNumSelectState = [];
    public routeNumShowInMapState = [];

    private deliveryMans;
    constructor(private observableBusService: ObservableBusService,
                public utilService: UtilService,
                public el:ElementRef,
                public cd: ChangeDetectorRef,
                public routePlanner: RoutePlannerService,
                public globalSettingService: GlobalSettingService,
                public dataService: DataService) {
    }

    ngOnInit() {
        this.colors = Colors;
        this.observableBusService.markForCheckRouteTableSummaryComponent$.subscribe(() => {
            this.buildTableData(this.globalSettingService.rootJson);
            this.deliverymanBuffer = this.buildDeleveryMans(this.deliveryMans);
            this.cd.markForCheck();
        });

        this.observableBusService.showToLoadSheetRouteNameAnnounceSource$.subscribe((isShow) => {
            if (!_.isUndefined(isShow)) {
                this.rootData.isShowMoveToThisLoadSheet = isShow;
            }
        });
        this.dataService.getUsers().then((response) => {
            this.deliveryMans = response.json().result;
        });
        this.deliverymanDataTypeahead();
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

    hideOrShowRouteOnMapHandler(routeInfo: RouteInfo, routeGroup, index) {
        routeInfo.isShowOnMap = !routeInfo.isShowOnMap;
        const isAllTrue = _.findIndex(routeGroup.routeInfos, (route) => {
            return route['isShowOnMap'] == true
        });
        const isAllFalse = _.findIndex(routeGroup.routeInfos, (route) => {
            return route['isShowOnMap'] == false
        });
        if (isAllTrue != -1 && isAllFalse == -1) {
            this.routeNumShowInMapState[index] = true;
        }
        if (isAllTrue == -1 && isAllFalse != -1) {
            this.routeNumShowInMapState[index] = false;
        }
        if (isAllFalse != -1 && isAllTrue != -1) {
            this.routeNumShowInMapState[index] = true;
        }
        this.onChangeRouteOnMapStatus.emit([routeInfo]);
    }

    changeRouteColorHandler(routeInfo: RouteInfo) {
        this.onChangeRouteColor.emit(routeInfo);
    }


    MoveToThisLoadSheet(routeInfo: RouteInfo) {
        this.onMoveToThisLoadSheet.emit(routeInfo);
    }

    sumOfStopCount() {

        return _.sumBy(this.rootData.routeInfos, (r) => {
            return r.stopInfos ? r.stopInfos.length : 0
        })
    }

    trackByCustomColumns(index: number, customColumn: CustomColumn): number {
        return index;
    }

    setThisRouteCenter(route) {
        this.onSetThisRouteCenter.emit(route);
    }

    addScheduledStops(route) {
        this.onAddScheduledEvents.emit(route);
    }

    editRouteHandler(RouteID: string) {
        this.onEditRouteHander.emit(RouteID);
    }

    deleteRouteHandler(RouteID: string) {
        this.onDeleteRoute.emit(RouteID);
    }

    deliverymanDataTypeahead() {
        this.deliverymanTypeahead.pipe(
            tap(() => this.deliverymanLoading = true),
            distinctUntilChanged(),
            debounceTime(200),
            switchMap(term => this.dataService.loadUsers(term)),
        ).subscribe((x: any) => {
            this.deliverymanBuffer = x.json().result;
            this.deliverymanLoading = false;
            this.cd.markForCheck();
        }, () => {
            this.deliverymanBuffer = [];
        });
    }

    buildTableData(data) {
        if (data) {
            this.routePlannerTableData = _.chain(data.routeInfos).groupBy('routeNum').toPairs().map(
                function (pair) {
                    return _.zipObject(['routeNum', 'routeInfos'], pair);
                }).value();
            _.forEach(this.routePlannerTableData, (routeNums, index) => {
                let columns = [];
                let stopCount = 0;
                _.forEach(routeNums.routeInfos, (routeInfo) => {
                    stopCount = stopCount + routeInfo.stopInfos.length;
                });
                let stopCountColumn = new CustomColumn("Stops", "stops", stopCount,"text",routeNums.routeInfos[0].customColumns[4].isShowInRouteSummary);
                columns.push(stopCountColumn);
                this.globalSettingService.rootJson.salesColumnGroupName.forEach((s,index) => {
                    let salesColumn = new CustomColumn(s, s, this.routePlanner.sumOfNumUnitByRouteInfos(s, routeNums.routeInfos),"text",routeNums.routeInfos[0].customColumns[5+index].isShowInRouteSummary);
                    columns.push(salesColumn);
                });
                let volColumn = new CustomColumn("$ Vol", "sumOfExtPrice", this.routePlanner.sumOfVolByRouteInfos(routeNums.routeInfos),"text",routeNums.routeInfos[0].customColumns[routeNums.routeInfos[0].customColumns.length-6].isShowInRouteSummary);
                let travelTimeColumn = new CustomColumn("Travel Time", "travelTime", this.routePlanner.sumOfTimeByRouteInfos('Travel Time',routeNums.routeInfos),"text",routeNums.routeInfos[0].customColumns[routeNums.routeInfos[0].customColumns.length-5].isShowInRouteSummary);
                let serviceTimeColumn = new CustomColumn("Service Time", "serviceTime", this.routePlanner.sumOfTimeByRouteInfos('Service Time',routeNums.routeInfos),"text",routeNums.routeInfos[0].customColumns[routeNums.routeInfos[0].customColumns.length-4].isShowInRouteSummary);
                let totalTimeColumn = new CustomColumn("Total Time", "totalTime", this.routePlanner.sumOfTimeByRouteInfos('Total Time',routeNums.routeInfos),"text",routeNums.routeInfos[0].customColumns[routeNums.routeInfos[0].customColumns.length-3].isShowInRouteSummary);
                let routeCostColumn = new CustomColumn("Route Cost", "routeCost", this.routePlanner.sumOfRouteCostByRouteInfos(routeNums.routeInfos),"text",routeNums.routeInfos[0].customColumns[routeNums.routeInfos[0].customColumns.length-2].isShowInRouteSummary);
                columns.push(volColumn, travelTimeColumn, serviceTimeColumn, totalTimeColumn, routeCostColumn);
                routeNums['columns'] = columns;
            });

            this.buildRouteNumWith(data.routeInfos);
        }
    }

    selectAllRouteByNum(routeInfosByNum, isSelectedRoutes) {
        let routeInfoIds = [];
        _.forEach(routeInfosByNum.routeInfos, (routeInfo) => {
            routeInfo.isSelected = isSelectedRoutes;
            routeInfoIds.push(routeInfo.id)
        });
        this.onChangeRouteInfoSelectStatus.emit();
        this.observableBusService.markForCheckRouteInfoComponent(routeInfoIds);
    }

    showOrHideRouteByNum(routeNum, index) {
        this.routeNumShowInMapState[index] = !this.routeNumShowInMapState[index];
        _.forEach(routeNum.routeInfos, (route) => {
            route.isShowOnMap = this.routeNumShowInMapState[index];
        });
        this.onChangeRouteOnMapStatus.emit(routeNum.routeInfos);
    }

    isRoutesSelect(routeNums, i) {
        const isAllTrue = _.findIndex(routeNums.routeInfos, (route) => {
            return route["isSelected"] == true
        });
        const isAllFalse = _.findIndex(routeNums.routeInfos, (route) => {
            return route["isSelected"] == false
        });
        if (isAllTrue != -1 && isAllFalse == -1) {
            this.routeNumSelectState[i] = true;
        }
        if (isAllTrue == -1 && isAllFalse != -1) {
            this.routeNumSelectState[i] = false;
        }
        if (isAllFalse != -1 && isAllTrue != -1) {
            this.routeNumSelectState[i] = false;
        }
    }
    onFocus(event){
            this.el.nativeElement.querySelector('.table-group').style.overflowX = 'inherit';
    }

    onBlur(event){
            this.el.nativeElement.querySelector('.table-group').style.overflowX = 'scroll';
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

    onActivityChange(route) {
        this.onActivityChangeEmitter.emit(route);
    }

    private buildRouteNumWith(routeInfos: any) {
        this.routNumWidth = 0;
        _.forEach(routeInfos[0].customColumns,(column) => {
            if(column.field == 'route' && column.isShowInRouteSummary == true){
                this.routNumWidth++;
            }
            if(column.field == 'color' && column.isShowInRouteSummary == true){
                this.routNumWidth++;
            }
            if(column.field == 'user' && column.isShowInRouteSummary == true){
                this.routNumWidth++;
            }
            if(column.field == 'activity' && column.isShowInRouteSummary == true){
                this.routNumWidth++;
            }
        })
    }
}
