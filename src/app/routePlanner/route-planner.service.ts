import {Injectable} from "@angular/core";
import * as _ from "lodash";
import {FieldValueObject} from "../shared/field-value-object.model";
import {ColumnOptionDropDownMenuTemplate,PhaseType} from "../shared/constant";
import {TimeFieldObject} from "../shared/time-field-object.model";
import {RootJson} from "../shared/root-json.model";
import {RouteSummaryOnMap} from "../component/routeSummaryPanelOnMap/shared/route-summary-on-map.model";
import {RouteInfo} from "../shared/route-info.model";
import {StopInfo} from "../shared/stop-info.model";
import {StopSummaryOnMap} from "../component/stopSummaryPanelOnMap/shared/stop-summary-panel-on-map.model";
import {CustomColumn} from "../shared/custom-column.model";
import {RequestedRoute} from "../service/mapService/requested-routes.model";
import {RoutePlannerCalculationPhaseService} from "../service/route-planner-calculation-phase.service";

@Injectable()
export class RoutePlannerService extends RoutePlannerCalculationPhaseService {

    private map = {
        center: {lat: 40.1451,lng: -99.6680},
        zoom: 5,
        control: {},
        overlay: null,
        gestureHandling: 'greedy',
        options: {
            //mapTypeControl: true,
            //mapTypeControlOptions: {
            //    position: google.maps.ControlPosition.RIGHT_CENTER
            //},
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.RIGHT_CENTER//RIGHT_TOP
            },
            panControl: true,
            panControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER//RIGHT_TOP
            }
        }
    };
    protected currentPhaseType: any = PhaseType.all;

    initMapRelated() {
        this.mapService.initMap(document.getElementById('google-map'),this.map);
        this.mapService.initBindingMapEvents();
        this.mapService.initDrawingManagerOnMap();
        this.mapService.initBindingDrawingManagerEvent();
    }

    buildRootJson(serverJson: any): RootJson {
        const rootJson = new RootJson();
        rootJson.routeInfos = [];
        let pickUnitNameList = serverJson.Routes[0].PickTypes.split("^");
        rootJson.isDrawRouteline = serverJson.DrawDirection == "True";
        rootJson.salesColumnGroupName = pickUnitNameList;
        rootJson.isSelectAllRouteInfo = false;
        rootJson.isAutoRoute = false;
        rootJson.isSaveLoadSheetAndRoute = false;
        rootJson.isShowMoveToThisLoadSheet = false;
        rootJson.dateFormat = serverJson.DateFormat;
        rootJson.timeFormat = serverJson.TimeFormat;
        rootJson.ShowExtPrice = serverJson.ShowExtPrice;


        this.globalSettingService.OldShowProductPickTypesetting = serverJson.ShowProductPickTypesetting;
        let currentShowSalesColumnGroupNameArray = [];
        try {
            currentShowSalesColumnGroupNameArray = _.trimEnd(serverJson.ShowProductPickTypesetting, ";").split(";");
        } catch (err) {
            currentShowSalesColumnGroupNameArray = ["Total;"];
        }

        rootJson.salesColumnGroupNameFieldValueObjectArray = [];
        rootJson.salesColumnGroupName.forEach(c => {
            let columnNameFieldValueObj = new FieldValueObject();
            columnNameFieldValueObj.field = c;
            columnNameFieldValueObj.value = currentShowSalesColumnGroupNameArray.indexOf(c) > -1 || c.toLocaleLowerCase() == 'total';
            columnNameFieldValueObj.isShow = c.toLocaleLowerCase() != 'total';

            rootJson.salesColumnGroupNameFieldValueObjectArray.push(columnNameFieldValueObj);
        });

        rootJson.currentShowStopSummaryOnMapObj = new StopSummaryOnMap();
        rootJson.isShowStopSummaryOnMap = false;
        rootJson.currentShowRouteSummaryOnMapObj = new RouteSummaryOnMap();
        rootJson.isShowRouteSummaryOnMap = false;

        rootJson.reSeqSetting = serverJson.ReSeqSetting;
        rootJson.currentShowPhase = PhaseType.all;
        rootJson.showCustomColumnssetting = serverJson.ShowCustomColumnssetting;

        for (let route of serverJson.Routes) {
            const routeInfo = new RouteInfo();
            routeInfo.id = route.RouteID;
            routeInfo.planID = route.PlanID;
            routeInfo.routeName = route.Route;
            routeInfo.userName = route.UserName;
            routeInfo.startTime = route.StartTime;
            routeInfo.deliveryman = route.Deliveryman;
            routeInfo.endTime = '';
            routeInfo.color = route.Color;
            routeInfo.distance = 0;
            routeInfo.duration = 0;
            routeInfo.displayColumnOption = null;
            routeInfo.startMapPointID = route.StartMapPointID;
            routeInfo.endMapPointID = route.EndMapPointID;
            routeInfo.fieldValueObjects = null;
            routeInfo.stopInfos = [];
            routeInfo.costPerMile = route.CostPerMile;
            routeInfo.isSelected = false;
            routeInfo.isShowOnMap = true;
            routeInfo.status = route.Status;
            routeInfo.maxCases = "";
            routeInfo.activity = route.Activity;
            routeInfo.sumOfExtPrice = 0;
            routeInfo.routeSelectColumnState = ColumnOptionDropDownMenuTemplate.keyValues[0];
            routeInfo.isShowDeliverymanArray = false;
            routeInfo.routeVersionID = route.RouteVersionID;
            routeInfo.hidedStopInfos = [];
            routeInfo.routeNum = route.RouteNum;
            routeInfo.plannedDistance = route.PlannedDistance;
            routeInfo.maxCargoWeight = route.MaxCargoWeight;
            routeInfo.routeFrequency = route.RouteFrequency;
            _.forEach(route.Stops, (stop, index) => {

                    const stopInfo = new StopInfo();

                    const timeObj: TimeFieldObject = {
                        startTime: '',
                        endTime: '',
                        startTimeColor: 'black',
                        endTimeColor: 'black'
                    };
                    stopInfo.oldPhase = stop.OldPhase;
                    stopInfo.id = stop.StopID;
                    stopInfo.numUnitsStr = stop.NumUnitsStr;
                    stopInfo.oldRouteInfoID = stop.OldRouteID;
                    stopInfo.drivingTime = timeObj;
                    stopInfo.seq = Number(stop.Sequence);
                    stopInfo.sequence = Number(index + 1);
                    stopInfo.oldSequence = Number(index + 1);
                    stopInfo.userName = stop.UserName;
                    stopInfo.customerID = stop.CustomerID;
                    stopInfo.company = stop.Company;
                    stopInfo.address = stop.Address;
                    stopInfo.city = stop.City;
                    stopInfo.lat = stop.Latitude;
                    stopInfo.lng = stop.Longitude;
                    stopInfo.state = stop.State;
                    stopInfo.activity = stop.Activity;
                    stopInfo.postalCode = stop.PostalCode;
                    stopInfo.imageIndex = Number(index + 1);
                    stopInfo.color = route.Color;
                    stopInfo.weight = stop.Weight;
                    stopInfo.serviceWindows = [];
                    stopInfo.startTime = stop.StartTime;
                    stopInfo.endTime = 0;
                    stopInfo.startTimeColor = 'black';
                    stopInfo.endTimeColor = 'black';
                    stopInfo.assignments = null;
                    stopInfo.phase = stop.Phase;
                    stopInfo.customerServiceDuration = stop.CustomerDuration;
                    stopInfo.fsm = stop.Fsm;
                    stopInfo.extprice = Number(stop.ExtPrice);
                    stopInfo.stopsPerWeek = stop.StopsperWeek;
                    stopInfo.origActivity = stop.OrigActivity;
                    stopInfo.cases =this.getCasesByStop(stopInfo.stopsPerWeek,stop.WeeklySumOfCases);
                    stopInfo.customColumnFieldValueObj = new FieldValueObject();
                    stopInfo.customColumnFieldValueObj.field = ColumnOptionDropDownMenuTemplate.keyValues[0].field;
                    this.buildNumUnitFieldListByStop(stop, pickUnitNameList, stopInfo);

                    routeInfo.stopInfos.push(stopInfo);


                }
            );
            rootJson.routeInfos.push(routeInfo);

        }

        return rootJson;
    }

    private buildNumUnitFieldListByStop(stop: any, pickUnitNames: Array<any>, stopInfo: StopInfo) {
        const numUnitsStr = stop.NumUnitsStr.trimRight("^").split("^");
        numUnitsStr.forEach((n, index) => {
            if (n != "" ) {
                stopInfo[pickUnitNames[index]] = n;
            }
        });
    }

    main(isSetMapCenter:boolean = true) {
        this.beforeCalculateRoutes(this.globalSettingService.rootJson).then(()=>{
            const requestedRoutes = this.buildRequestedRoutesByRouteInfos(this.globalSettingService.rootJson.routeInfos);
            this.mapService.clearRoutesOnMap(requestedRoutes);
            this.mapService.markers = [];
            this.mapService.polylines = [];
            this.mapService.calculateRoutes(requestedRoutes, 0).then(() => {
                this.setDurationAndDistanceByRequestedRoutes(requestedRoutes, this.globalSettingService.rootJson.routeInfos);
                this.computeDriveDurationByRouteInfos(this.globalSettingService.rootJson.routeInfos);

                if (isSetMapCenter) {
                    this.mapService.setMapCenter(requestedRoutes);
                }

                this.mapService.bindingMarkerAndPolylineEvents(requestedRoutes);
                this.initRouteSelectColumnState();
                this.showOrHideRouteOnMapByRouteInfos(this.globalSettingService.rootJson.routeInfos);
                this.keepRouteStateInMap();
                this.buildCustomColumn(this.globalSettingService.rootJson.routeInfos);
                this.buildCustomColumnOptionByRouteInfos(this.globalSettingService.rootJson.routeInfos, ColumnOptionDropDownMenuTemplate.keyValues[0].field, ColumnOptionDropDownMenuTemplate.keyValues[0].value);
                this.buildCustomColumnsByUserSetting();
                this.buildRouteInfosMaxCasesAndMaxStopCount();
                this.markForCheckOnPushComponent();
                this.observableBusService.loading(false);
            })
        })
    }
    buildCustomColumn(routeInfos){
        this.buildCustomColumnByEachRouteInfo(routeInfos);
        this.buildSumOfCustomColumn();
    }

    private buildCustomColumnByEachRouteInfo(routeInfos: RouteInfo[]) {
        _.forEach(routeInfos, routeInfo => {
            this.buildCustomColumnByRouteInfo(routeInfo);
        });
    }

    private buildSumOfCustomColumn() {
        let columns = [];
        let stopsColumn = new CustomColumn("Stops", "Stops", _.sumBy(this.globalSettingService.rootJson.routeInfos,(routInfo)=>{
            return routInfo.stopInfos.length;
        }));
        columns.push(stopsColumn);
        this.globalSettingService.rootJson.salesColumnGroupName.forEach(s => {
            let salesColumn = new CustomColumn(s, s, this.sumOfNumUnitByRouteInfos(s) );
            columns.push(salesColumn);
        });
        let volColumn = new CustomColumn("$ Vol", "sumOfExtPrice", this.sumOfVolByRouteInfos());
        let travelTimeColumn = new CustomColumn("Travel Time", "travelTime", this.sumOfTimeByRouteInfos('Travel Time'));
        let serviceTimeColumn = new CustomColumn("Service Time", "serviceTime",  this.sumOfTimeByRouteInfos('Service Time'));
        let totalTimeColumn = new CustomColumn("Total Time", "totalTime",  this.sumOfTimeByRouteInfos('Total Time'));
        let routeCostColumn = new CustomColumn("Route Cost", "routeCost",  this.sumOfRouteCostByRouteInfos());

        columns.push(volColumn,travelTimeColumn,serviceTimeColumn,totalTimeColumn,routeCostColumn);

        this.globalSettingService.rootJson.sumOfCustomColumns = columns;
    }

    private buildCustomColumnByRouteInfo(routeInfo: RouteInfo) {
        let columns = [];
        let routeColumn = new CustomColumn("Route", "route", routeInfo.routeName,"mustText");
        let colorColumn = new CustomColumn("Color", "color", routeInfo.color,'select');
        let userColumn = new CustomColumn("User", "user", routeInfo.deliveryman,"select");
        let activityColumn = new CustomColumn("Activity", "activity", "","select");
        let stopsColumn = new CustomColumn("Stops","stops",routeInfo.stopInfos.length);
        columns.push(routeColumn,colorColumn,userColumn,activityColumn,stopsColumn);
        this.globalSettingService.rootJson.salesColumnGroupName.forEach(s => {
            let salesColumn = new CustomColumn(s, s, this.sumOfNumUnitByRouteInfo(routeInfo, s) );
            columns.push(salesColumn);
        });
        let volColumn = new CustomColumn("$ Vol", "sumOfExtPrice", "$"+this.calculateExtprice(routeInfo,"extprice"));
        let travelTimeColumn = new CustomColumn("Travel Time", "travelTime", this.calculateTotalTimeByStops(routeInfo,'Travel Time'));
        let serviceTimeColumn = new CustomColumn("Service Time", "serviceTime",  this.calculateTotalTimeByStops(routeInfo,'Service Time'));
        let totalTimeColumn = new CustomColumn("Total Time", "totalTime",  this.calculateTotalTimeByStops(routeInfo,'Total Time'));
        let routeCostColumn = new CustomColumn("Route Cost", "routeCost",  this.calculateRouteCost(routeInfo));
        let distanceColumn = new CustomColumn("Total Distance", "totalDistance", this.calculateTotalDistanceByRouteInfo(routeInfo),"text", false);



        columns.push(volColumn,travelTimeColumn,serviceTimeColumn,totalTimeColumn,routeCostColumn,distanceColumn);

        routeInfo.customColumns = columns;
    }

    //overwrite
    sumOfNumUnitByRouteInfo(routeInfo: RouteInfo, field: string, isTransform:boolean = true){
        let result = 0;

        for(let i=0;i<routeInfo.stopInfos.length;i++){
            result += Number( routeInfo.stopInfos[i].stopsPerWeek ) == 0 ? 0: parseInt(routeInfo.stopInfos[i][field]);
        }

        return isTransform ? this.decimalPipe.transform(result) : result;
    }

    buildDeliveryman(DeliveryManJson: any) {
        const arrayDeliveryman = Array<any>();
        for(let user of DeliveryManJson){
            let deliveryman:any = {};
            deliveryman.deliveryManName = user.UserName;
            arrayDeliveryman.push(deliveryman);
        }
        return arrayDeliveryman;
    }

    public sumOfVolByRouteInfos(routeInfos: RouteInfo[] = this.globalSettingService.rootJson.routeInfos,isFormat:boolean = true) {
        let result: number = 0;

        for (let i = 0; i < routeInfos.length; i++) {
            result += Number(this.calculateExtprice(routeInfos[i],"extprice",false));
        }

        return isFormat?"$" + this.decimalPipe.transform(result):result;
    }

    //overwrite
    setDurationAndDistanceByRequestedRoutes(requestedRoutes: Array<RequestedRoute>, routeInfos: Array<RouteInfo>) {
        for (let i = 0; i < routeInfos.length; i++) {
            this.setDurationAndDistanceBySingleRequestedRoute(requestedRoutes[i], routeInfos[i]);
        }
    }

    //overwrite
    computeDriveDurationByRouteInfos(routeInfos){
        for (let routeInfo of routeInfos) {

            if (routeInfo.stopInfos.length > 0) {
                let hpercent = 1;
                let lastStopInfo = null;

                if (routeInfo.helper) {
                    hpercent = this.globalSettingService.HelperPercent;
                }

                for (let i = 0; i < routeInfo.stopInfos.length; i++) {
                    let stopInfo = routeInfo.stopInfos[i];

                    let currstopInfo;

                    if (lastStopInfo == null) {
                        lastStopInfo = stopInfo;
                        console.log(this.utilService.convertTimeStrToNumber( routeInfo.startTime ));
                        lastStopInfo.driveDuration = (Number( lastStopInfo.duration ) + this.utilService.convertTimeStrToNumber( routeInfo.startTime )).toString();
                        // var obj = calculateStartTimeAndEndTimeBaseOnStaticAssignments( lastStop, staticAssignmentsSortByStartTimeDesc, tmpStartTimeNumber, tmpEndTimeNumber, true );
                        lastStopInfo.drivingTime.startTime = this.utilService.convertTimeNumberToAMPMStr( Number( lastStopInfo.driveDuration ) );
                        lastStopInfo.drivingTime.endTime = this.utilService.convertTimeNumberToAMPMStr( Number( lastStopInfo.driveDuration ) + lastStopInfo.fsm + this.utilService.changeCustomerDuration(lastStopInfo.customerServiceDuration , lastStopInfo.stopsPerWeek) * hpercent );
                    }
                    else {
                        currstopInfo = stopInfo;
                        currstopInfo.driveDuration = (Number( lastStopInfo.driveDuration ) + lastStopInfo.fsm + this.utilService.changeCustomerDuration(lastStopInfo.customerServiceDuration , lastStopInfo.stopsPerWeek) * hpercent + Number( currstopInfo.duration )).toString();
                        let tmpStartTimeNumber = this.utilService.convertTimeStrToNumber(lastStopInfo.drivingTime.endTime) + Number(currstopInfo.duration);
                        let serviceTimeNumber = currstopInfo.customerServiceDuration * hpercent;
                        let tmpEndTimeNumber = tmpStartTimeNumber + serviceTimeNumber;
                        currstopInfo.drivingTime.startTime = this.utilService.convertTimeNumberToAMPMStr( Number( currstopInfo.driveDuration ) );
                        currstopInfo.drivingTime.endTime = this.utilService.convertTimeNumberToAMPMStr( Number( currstopInfo.driveDuration ) + currstopInfo.fsm + this.utilService.changeCustomerDuration(currstopInfo.customerServiceDuration , currstopInfo.stopsPerWeek) * hpercent );

                        // var obj = calculateStartTimeAndEndTimeBaseOnStaticAssignments( currStop, staticAssignmentsSortByStartTimeDesc, tmpStartTimeNumber, tmpEndTimeNumber, false );


                        lastStopInfo = currstopInfo;
                    }
                    let endtimeSec = Number( lastStopInfo != null ? (Number( lastStopInfo.driveDuration ) + lastStopInfo.fsm + this.utilService.changeCustomerDuration(lastStopInfo.customerServiceDuration , lastStopInfo.stopsPerWeek) * hpercent + Number( routeInfo.duration )).toString() : "0" );
                    routeInfo.endTime = this.utilService.convertTimeNumberToAMPMStr( endtimeSec );

                }



            }


        }

    }

    //overwrite
    calculateTotalTimeByStops(route: RouteInfo, timeField: string, isFormat: boolean = true) {
        let sum = 0;

        let sumOfTravelTime = function () {
            _.forEach(route.stopInfos, function (stop) {
                sum += Number(stop.duration);
            });
            sum += Number(route.duration);
        };
        let self = this;
        let sumOfServiceTime = function () {
            _.forEach(route.stopInfos, function (stop) {
                sum += (isNaN(stop.customerServiceDuration) ? 0.0 : self.utilService.changeCustomerDuration(stop.customerServiceDuration, stop.stopsPerWeek)) + stop.fsm;
            });

            sum = Number(sum.toFixed(2));
        };

        switch (timeField) {
            case "Travel Time":
                sumOfTravelTime();
                break;
            case "Service Time":
                sumOfServiceTime();
                break;
            case "Total Time":
                // let showBreakTimeFlag = _.some( route.stopInfos, function( s ){ return s.isShowBreakTime});
                // if ( showBreakTimeFlag ){
                //   let breakStartTime = this.utilService.convertTimeStrToNumber( route.BreakStartTime );
                //   let breakEndTime = this.utilService.convertTimeStrToNumber( route.BreakEndTime );
                //   let tmpDuration = breakEndTime - breakStartTime;
                //   sum = sum + tmpDuration;
                // }

                sumOfTravelTime();
                sumOfServiceTime();

                break;
        }

        return isFormat ? this.utilService.convertTimeNumberToStr(sum) : sum;
    }

    updateDataAfterChangePhase(routeInfos: RouteInfo[] = this.globalSettingService.rootJson.routeInfos, phase: string, isNeedReCalculateRoutes:boolean = true) {
        this.observableBusService.loading(true);

        phase = phase || this.currentPhaseType.value;

        let needReDrawRouteInfos = [];
        const self = this;

        _.forEach(routeInfos, function (routeInfo) {
            let tmpOldHidedStops = _.cloneDeep(routeInfo.hidedStopInfos);

            self.updateStopsAndHideStopsByRouteListByChangePhase([routeInfo], phase);

            let isReDraw = self.isNeedReDrawRouteByChangePhase(tmpOldHidedStops, routeInfo);
            if (isReDraw) {
                needReDrawRouteInfos.push(routeInfo);
            }

        });

        if (needReDrawRouteInfos.length > 0 && isNeedReCalculateRoutes) {
            //TODO: bu zhi dao hai xu yao bu xu yao
            // routeService.sortStopBySeqInRouteList(needReDrawRoutes);
            this.reCalculateRoutes(needReDrawRouteInfos);
        } else {
            this.observableBusService.loading(false);
        }
    }

//     reSeqStopInfos( stopInfos: StopInfo[], index ) {
//     for ( var i = index; i < stops.length; i++ ) {
//         if (i == index) {
//             if (i == 0) {
//                 stops[ i ].Seq = "1";
//                 reSeqProductGroupByPhase( stops[ i ], "1" );
//             } else {
//                 stops[ i ].Seq = (Number( stops[ i - 1 ].Seq ) + 1).toString();
//                 reSeqProductGroupByPhase( stops[ i ], (Number( stops[ i - 1 ].Seq ) + 1).toString() );
//             }
//         } else {
//             if (Number( stops[ i ].Seq ) <= Number( stops[ i - 1 ].Seq )) {
//                 stops[ i ].Seq = (Number( stops[ i - 1 ].Seq ) + 1).toString();
//                 reSeqProductGroupByPhase( stops[ i ], (Number( stops[ i - 1 ].Seq ) + 1).toString() );
//             }
//         }
//     }
// }

    //overwrite
    reSetImageIndexByRouteInfos(routeInfos: RouteInfo[]){
        _.forEach( routeInfos, function ( routeInfo ) {
            _.forEach( routeInfo.stopInfos, function ( s, index ) {
                s.imageIndex = index + 1;
            } );
        } );
    }

    private calculateExtprice(routeInfo: RouteInfo, extprice: string,isTransform = true) {
        let result = 0;

        for(let i=0;i<routeInfo.stopInfos.length;i++){
            result += routeInfo.stopInfos[i][extprice];
        }

        return isTransform ? this.decimalPipe.transform(result) : result;
    }

    setCustomerReceipt() {
        const _self = this;
        return new Promise((resolve, reject) => {
            if (_self.utilService.isUndefinedOrNull(_self.globalSettingService.CustomerReceipt_Server)) {
                _self.dataService.getCustomerReceipt().then(function (receiptJson) {
                    _self.globalSettingService.CustomerReceipt_Server = receiptJson.json().C;
                    resolve();
                }, function () {
                    reject();
                })
            } else {
                resolve()
            }
        })
    }

    //overwrite
    calculateRouteCost(routeInfo,isFmate:boolean=true){
        let sumOfDistance: number = Number(this.calculateTotalDistanceByRouteInfo(routeInfo, false));
        return isFmate?"$" + (Number(routeInfo.costPerMile) * sumOfDistance).toFixed(2):(Number(routeInfo.costPerMile) * sumOfDistance).toFixed(2);
    }

    changeSameCustomerNumUnitsList( stop ) {
        const self = this;
        _.forEach( self.globalSettingService.rootJson.routeInfos, function ( r ) {
            let filterStopList = _.filter( r.stopInfos, function ( s ) {
                return s.customerID == stop.customerID;
            } );
            _.forEach(self.globalSettingService.rootJson.salesColumnGroupName,(columGroupName)=>{
                _.forEach(filterStopList,(stop)=>{
                    stop[columGroupName] = self.getNumUnitByLoadGroup( stop.numUnitsStr, columGroupName, stop.stopsPerWeek );
                });
            });
        } );
    }

    getNumUnitByLoadGroup( numUnitsStr, loadGroup, stopsPerWeek ) {
        return this.getNumUnitByLoadGroupIndex( numUnitsStr, _.indexOf( this.globalSettingService.rootJson.salesColumnGroupName, loadGroup ), stopsPerWeek );
    }

    getNumUnitByLoadGroupIndex(numUnitsStr, index, stopsPerWeek) {
        const numUnitsarray = numUnitsStr.trimRight("^").split("^");
        //Task 335417 Discrepancy of package totals, keg totals, and stop count in deliverymen mapped routing
        //return _.isEmpty(getLoadGroupList()) ? "-1" : Number(stopsPerWeek) == 0 ? "0" : utilService.round(parseFloat(numUnitsStr.split('^')[index]) / Number(stopsPerWeek)).toString();
        return Number(stopsPerWeek) == 0 ? 0 : numUnitsarray[index];
    }

    getCasesByStop( stopsPerWeek, weeklySumOfCases ) {
        return Number( stopsPerWeek ) == 0 ? 0 : this.utilService.round( Number( weeklySumOfCases ) / Number( stopsPerWeek ) );
    }

    calculateServiceTime(stopInfo: StopInfo, hpercent: number): number{
        return (isNaN(stopInfo.customerDuration) ? 0.0 : stopInfo.customerDuration) * ( hpercent ? Number(hpercent) : 1 ) + stopInfo.fsm;
    }

    reSetSeqByRoute(routes: Array<RouteInfo>) {
        _.forEach(routes,(routeInfo) => {
            _.forEach(routeInfo.stopInfos,(stopInfo,index) => {
                stopInfo.sequence = index+1;
            })
        });
    }

    isNeedCompression(): boolean {
        return true;
    }


}