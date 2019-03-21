import {Injectable} from "@angular/core";
import {RoutingBaseService} from "../service/routing-base.service";
import {RootJson} from "../shared/root-json.model";
import {ColumnOptionDropDownMenuTemplate, ActivityText} from "../shared/constant";
import {RouteInfo} from "../shared/route-info.model";
import {StopInfo} from "../shared/stop-info.model";
import {TimeFieldObject} from "../shared/time-field-object.model";
import {FieldValueObject} from "../shared/field-value-object.model";
import * as _ from 'lodash';
import {CustomColumn} from "../shared/custom-column.model";
import {StopSummaryOnMap} from "../component/stopSummaryPanelOnMap/shared/stop-summary-panel-on-map.model";
import {RouteSummaryOnMap} from "../component/routeSummaryPanelOnMap/shared/route-summary-on-map.model";

@Injectable()
export class MappedRoutingForPlanService extends RoutingBaseService {

    initMapRelated() {
        this.mapService.initMap(document.getElementById('google-map'));
        this.mapService.initBindingMapEvents();
        this.mapService.initDrawingManagerOnMap();
        this.mapService.initBindingDrawingManagerEvent();
    }

    buildRootJson(serverJson: any): RootJson {
        const rootJson = new RootJson();
        rootJson.routeInfos = [];
        rootJson.isSelectAllRouteInfo = false;
        rootJson.isDrawRouteline = serverJson.DrawDirection == "True";
        rootJson.dateFormat = serverJson.DateFormat;
        rootJson.timeFormat = serverJson.TimeFormat;
        rootJson.reSeqSetting = serverJson.ReSeqSetting;
        rootJson.routeEditPermission = serverJson.RouteEditPermission;
        rootJson.isShowMoveToThisLoadSheet = false;
        rootJson.currentShowStopSummaryOnMapObj = new StopSummaryOnMap();
        rootJson.isShowStopSummaryOnMap = false;
        rootJson.currentShowRouteSummaryOnMapObj = new RouteSummaryOnMap();
        rootJson.showCustomColumnssetting = serverJson.ShowCustomColumnssetting;
        rootJson.isShowRouteSummaryOnMap = false;
        for (let route of serverJson.Routes) {
            const routeInfo = new RouteInfo();
            routeInfo.id = route.PlanID;
            routeInfo.routeID = route.RouteID;
            routeInfo.routeName = route.Route;
            routeInfo.startTime = route.StartTime;
            routeInfo.deliveryman = route.Employee;
            routeInfo.userName = route.UserName;
            routeInfo.planDate = this.utilService.dateFormat(route.PlanDate, rootJson.dateFormat).replace(" 0:00:00","");
            routeInfo.endTime = '';
            routeInfo.color = route.Color;
            routeInfo.distance = 0;
            routeInfo.duration = 0;
            routeInfo.displayColumnOption = null;
            routeInfo.startMapPointID = route.StartMapPointID;
            routeInfo.endMapPointID = route.EndMapPointID;
            routeInfo.activityTypeText = route.ActivityTypeText;
            routeInfo.allowedActivities = route.AllowedActivities;
            routeInfo.stopInfos = [];
            routeInfo.isSelected = false;
            routeInfo.isShowOnMap = true;
            routeInfo.status = route.Status;
            routeInfo.vehicleID = route.VehicleID;
            routeInfo.vehicle = route.Vehicle;
            routeInfo.helperPercent = "1";
            routeInfo.oldServiceTime = route.OldServiceTime;
            routeInfo.savedRealLoadSheetID = route.SavedRealLoadSheetID;
            routeInfo.routeSelectColumnState = ColumnOptionDropDownMenuTemplate.keyValues[0];
            routeInfo.isShowDeliverymanArray = false;
            for (let stop of route.Stops) {
                const stopInfo = new StopInfo();
                const timeObj: TimeFieldObject = {
                    startTime: '',
                    endTime: '',
                    startTimeColor: 'black',
                    endTimeColor: 'black'
                };
                stopInfo.id = stop.StopID;
                stopInfo.drivingTime = timeObj;
                stopInfo.savedRealLoadSheetID = stop.SavedRealLoadSheetID;
                stopInfo.oldRouteInfoID = routeInfo.id;
                stopInfo.imageIndex = stop.Sequence;
                stopInfo.userName = stop.UserName;
                stopInfo.customerID = stop.CustomerID;
                stopInfo.company = stop.Company;
                stopInfo.address = stop.Address;
                stopInfo.address2 = stop.Address2;
                stopInfo.city = stop.City;
                stopInfo.lat = stop.Latitude;
                stopInfo.lng = stop.Longitude;
                stopInfo.state = stop.State;
                stopInfo.postalCode = stop.PostalCode;
                stopInfo.customerServiceDuration = stop.CustomerDuration;
                stopInfo.color = route.Color;
                stopInfo.invoices = stop.Invoices;
                stopInfo.serviceWindows = [];
                stopInfo.activity = stop.Activity;
                stopInfo.activityTypeText = stop.ActivityTypeText;
                stop.Services.forEach((s: any) => {
                    let serviceTime: TimeFieldObject = {
                        startTime: s.StartTime,
                        endTime: s.EndTime,
                        startTimeColor: 'black',
                        endTimeColor: 'black'
                    };

                    stopInfo.serviceWindows.push(serviceTime);
                });
                stopInfo.sequence = stop.Sequence;
                stopInfo.oldSequence = stopInfo.sequence;
                stopInfo.customerDuration = stop.CustomerDuration;
                stopInfo.customColumnFieldValueObj = new FieldValueObject();
                stopInfo.fsm = stop.Fsm;
                stopInfo.customColumnFieldValueObj.field = ColumnOptionDropDownMenuTemplate.keyValues[0].field;
                
                //use by set Plan Route property
                stopInfo.routeID = stop.RouteID;
                stopInfo.routeColor = stop.RouteColor;
                stopInfo.routeName = stop.RouteName;
                stopInfo.routeStartTime = stop.RouteStartTime

                routeInfo.stopInfos.push(stopInfo);

            }

            if(routeInfo.routeID == "") {
                this.setPlanRouteProperty(routeInfo);
            }

            rootJson.routeInfos.push(routeInfo);
        }
        return rootJson;
    }

    main(isSetMapCenter: boolean) {
        this.beforeCalculateRoutes(this.globalSettingService.rootJson).then(()=>{
            const requestedRoutes = this.buildRequestedRoutesByRouteInfos(this.globalSettingService.rootJson.routeInfos);
            this.mapService.clearRoutesOnMap(requestedRoutes);
            this.mapService.markers = [];
            this.mapService.polylines = [];
            this.beforeCalculateRoutes(this.globalSettingService.rootJson).then(()=>{
                this.mapService.calculateRoutes(requestedRoutes, 0).then(() => {
                    this.setDurationAndDistanceByRequestedRoutes(requestedRoutes, this.globalSettingService.rootJson.routeInfos);
                    this.computeDriveDurationByRouteInfos(this.globalSettingService.rootJson.routeInfos);

                    if (isSetMapCenter) {
                        this.mapService.setMapCenter(requestedRoutes);
                    }

                    this.mapService.bindingMarkerAndPolylineEvents(requestedRoutes);
                    this.showOrHideRouteOnMapByRouteInfos(this.globalSettingService.rootJson.routeInfos);
                    this.keepRouteStateInMap();
                    this.buildCustomColumn(this.globalSettingService.rootJson.routeInfos);
                    this.buildCustomColumnOptionByRouteInfos(this.globalSettingService.rootJson.routeInfos, ColumnOptionDropDownMenuTemplate.keyValues[0].field, ColumnOptionDropDownMenuTemplate.keyValues[0].value);
                    this.buildCustomColumnsByUserSetting();
                    this.timelineService.drawTimeline();
                    this.markForCheckOnPushComponent();
                    this.observableBusService.loading(false);
                });
            });
        });
    }

    buildCustomColumn(routeInfos: RouteInfo[]){
        this.buildCustomColumnByEachRouteInfo(routeInfos);
        this.buildSumOfCustomColumn(routeInfos);
    }

    buildSumOfCustomColumn(routeInfos){
        let columns = [];
        let deliveryStopsColumn = new CustomColumn("Delivery Stops","Delivery",this.sumOfStopsByRouteInfo(routeInfos,'Delivery'));
        let SalesStopsColumn = new CustomColumn("Sales","Sales",this.sumOfStopsByRouteInfo(routeInfos,'Sales'));
        let MerchandiserStopsColumn = new CustomColumn("Merchandiser","Merchandiser",this.sumOfStopsByRouteInfo(routeInfos,'Merchandiser'));
        let StopsColumn = new CustomColumn("Total Stops","Stops", _.sumBy(this.globalSettingService.rootJson.routeInfos, function(s1) {return Number(s1.stopInfos.length)} ))
        let travelTimeColumn = new CustomColumn("Travel Time", "travelTime", this.sumOfTimeByRouteInfos('Travel Time'));
        let serviceTimeColumn = new CustomColumn("Service Time", "serviceTime",  this.sumOfTimeByRouteInfos('Service Time'));
        let totalTimeColumn = new CustomColumn("Total Time", "totalTime",  this.sumOfTimeByRouteInfos('Total Time'));

        columns.push(deliveryStopsColumn,SalesStopsColumn,MerchandiserStopsColumn,StopsColumn,travelTimeColumn,serviceTimeColumn,totalTimeColumn);

        this.globalSettingService.rootJson.sumOfCustomColumns = columns;

    }

    buildCustomColumnByEachRouteInfo( routeInfos: RouteInfo[] ){
        _.forEach(routeInfos, routeInfo => {
            this.buildCustomColumnByRouteInfo(routeInfo);
        });
    }

    buildCustomColumnByRouteInfo(routeInfo:RouteInfo){
        let columns = [];
        let routeColumn = new CustomColumn("Route",'route',"",'notText');
        let dateColumn = new CustomColumn("Date",'date',routeInfo.planDate,'notText');
        let colorColumn = new CustomColumn("Color",'color',"",'notText');
        let userColumn = new CustomColumn("User",'user',"",'notText');
        let vehicleColumn = new CustomColumn("Vehicle",'vehicle',"",'notText');
        let deliveryColumn = new CustomColumn("Delivery Stops",'Delivery',this.calculateSumOfStopByRouteByActivity(routeInfo,'Delivery'));
        let salesColumn = new CustomColumn("Sales Stops",'Sales',this.calculateSumOfStopByRouteByActivity(routeInfo,"Sales"));
        let merchandiserColumn = new CustomColumn("Merchandiser Stops",'Merchandiser',this.calculateSumOfStopByRouteByActivity(routeInfo,'Merchandiser'))
        let stopsColumn = new CustomColumn("Total Stops",'stops',routeInfo.stopInfos.length);
        let travelTimeColumn = new CustomColumn("Travel Time", "travelTime", this.calculateTotalTimeByStops(routeInfo,'Travel Time'));
        let serviceTimeColumn = new CustomColumn("Service Time", "serviceTime",  this.calculateTotalTimeByStops(routeInfo,'Service Time'));
        let totalTimeColumn = new CustomColumn("Total Time", "totalTime",  this.calculateTotalTimeByStops(routeInfo,'Total Time'));
        let distanceColumn = new CustomColumn("Total Distance", "totalDistance", this.calculateTotalDistanceByRouteInfo(routeInfo), "text", false);
        columns.push(routeColumn,dateColumn,colorColumn,userColumn,vehicleColumn,
            deliveryColumn, salesColumn,merchandiserColumn,stopsColumn,travelTimeColumn,
            serviceTimeColumn,totalTimeColumn,distanceColumn);

        routeInfo.customColumns = columns;
    }

    saveChanges() {
        const _self = this;
        return new Promise((resolve, reject) => {
            let saveObj = _self.buildSaveDataStr();
            if (saveObj.isChanged) {
                this.dataService.saveDataForPlan(saveObj.postData).then(function (result) {
                    _self.changeJsonAfterSuccessSave( );
                    resolve(result.text());
                }, function () {
                    reject();
                });
            } else {
                reject();
            }
        });
    }

    buildSaveDataStr() {
        // todo budui
        let rootJson = this.globalSettingService.rootJson;
        let oldRootJson = this.globalSettingService.oldRootJson;
        let
            isChanged = false,
            EventIDSequenceStr = "",
            driveTimeStr = "",
            distancesStr = "",
            moveEventStr = "";

        let moveInvoiceToLoadSheetStr = [];
        let moveInvoiceToRouteIfNotHaveLoadSheetStr = [];

        // let colorList = [];
        let employeeList = [];
        let planVehicleList = [];
        let reSeqPlanIDStr = "";

        let reDrawRouteList = [];


        for (let i = 0; i < rootJson.routeInfos.length; i++) {

            let route = rootJson.routeInfos[i];
            let oldroute = oldRootJson.routeInfos[i];

            // if (route.color != oldroute.color) {
            //     let tmpRouteID = route.routeID;
            //     tmpRouteID += "^" + route.color + "|";

            //     if (colorList.indexOf(tmpRouteID) == -1) {
            //         colorList.push(tmpRouteID);
            //     }
            // }

            if (route.deliveryman != oldroute.deliveryman) {
                let tmpLoadSheetId = route.id;
                tmpLoadSheetId = tmpLoadSheetId + "^" + route.deliveryman + "|";

                if (employeeList.indexOf(tmpLoadSheetId) == -1) {
                    employeeList.push(tmpLoadSheetId);
                }
            }

            if (route.vehicleID != oldroute.vehicleID) {
                let tmpPlanVehicleObj = {};
                tmpPlanVehicleObj['PlanID'] = route.id;
                tmpPlanVehicleObj['VehicleID'] = route.vehicleID;

                planVehicleList.push(tmpPlanVehicleObj);
            }

            // if(route.Stops.length > 0){
            //     let firstNewTime = getFirstNewTime(route.PlanDate,  route.Stops[ 0 ].StartTime);
            //     let hasDiffDate = checkHasDiffDate(route);
            // }

            for (let j = 0; j < route.stopInfos.length; j++) {
                let stop: StopInfo = route.stopInfos[j];

                let l;
                if (stop.oldRouteInfoID != route.id) {
                    if (stop.invoices.length > 0 && stop.invoices[0] != "") {
                        for (let m = 0; m < stop.invoices.length; m++) {
                            if (route.savedRealLoadSheetID != "") {
                                //moveInvoiceToLoadSheetStr += stop.Invoices[i] + "^" + route.SavedRealLoadSheetID + "|"
                                let findTmpObj = null;
                                _.forEach(moveInvoiceToLoadSheetStr, function (LoadSheetIDInvoiceIDObj) {
                                    if (LoadSheetIDInvoiceIDObj.SourceLoadSheetID == stop.savedRealLoadSheetID && LoadSheetIDInvoiceIDObj.DestLoadSheetID == route.savedRealLoadSheetID) {
                                        findTmpObj = LoadSheetIDInvoiceIDObj;
                                    }
                                });
                                if (this.utilService.isUndefinedOrNull(findTmpObj)) {
                                    let tmpLoadSheetIDInvoiceIDObj = {
                                        SourceLoadSheetID: stop.savedRealLoadSheetID,
                                        DestLoadSheetID: route.savedRealLoadSheetID,
                                        InvoiceIDArr: [stop.invoices[m]]
                                    };
                                    moveInvoiceToLoadSheetStr.push(tmpLoadSheetIDInvoiceIDObj);
                                } else {
                                    findTmpObj.InvoiceIDArr.push(stop.invoices[m]);
                                }
                            } else {

                                if (route.routeID == "") {
                                    //reset plan route property if drag drop or move
                                    this.setPlanRouteProperty(route);
                                }
                                let tmpEntity = {
                                    InvoiceID: stop.invoices[m],
                                    RouteID: route.routeID,
                                    PlanID: route.id,
                                    LSDate: route.planDate
                                };

                                moveInvoiceToRouteIfNotHaveLoadSheetStr.push(tmpEntity);
                            }
                        }

                    } else {
                        moveEventStr += stop.id + "^" + route.id + "|";
                    }
                }


                if (stop.sequence != stop.oldSequence) {
                    EventIDSequenceStr += stop.id + "^" + stop.sequence + "^" + route.status + "|";
                }


            }

        }

        // let colorStr = "";

        // _.forEach(colorList, function (c) {
        //     colorStr += c;
        // });

        let employeeStr = "";
        _.forEach(employeeList, function (e) {
            employeeStr += e;
        });

        //let reSeqPlanIDStr = "";
        //_.forEach( reSeqPlanIDList, function( r ){
        //    reSeqPlanIDStr += r + "^"
        //});

        let postData = {
            Action: "0",
            DriveTimeStr: driveTimeStr,
            DistanceStr: distancesStr,
            EventIDSequenceStr: EventIDSequenceStr,
            ReSeqPlanIDStr: reSeqPlanIDStr,
            // ColorStr_BingMap: colorStr,
            deliverymanStr: employeeStr,
            MoveEventStr: moveEventStr,
            MoveInvoiceToLoadSheetStr: JSON.stringify(moveInvoiceToLoadSheetStr),
            InvoiceMoveToRouteEntity: JSON.stringify(moveInvoiceToRouteIfNotHaveLoadSheetStr),
            PlansVehicleEntity: (planVehicleList.length != 0 ? JSON.stringify(planVehicleList) : "")

        };

        isChanged =
            driveTimeStr != "" ||
            distancesStr != "" ||
            employeeStr != "" ||
            EventIDSequenceStr != "" ||
            moveEventStr != "" ||
            moveInvoiceToRouteIfNotHaveLoadSheetStr.length != 0 ||
            moveInvoiceToLoadSheetStr.length != 0 ||
            planVehicleList.length != 0;
        return {
            isChanged: isChanged,
            postData: postData,
            reDrawRouteList: reDrawRouteList
        };
    }

    changeJsonAfterSuccessSave( ) {
        const rootJson = this.globalSettingService.rootJson;
        const _self = this;
        _.forEach( rootJson.routeInfos, function ( route ) {
            var serviceTimeSecond = _self.utilService.convertTimeStrToNumber( route.customColumns.find((customColum)=>{return customColum.field == 'serviceTime'}).value );
            if ( serviceTimeSecond != route.oldServiceTime ) {
                route.oldServiceTime = serviceTimeSecond;
            }
            var travelTimeSecond = _self.utilService.convertTimeStrToNumber( route.customColumns.find((customColum)=>{return customColum.field == 'travelTime'}).value);
            if ( route.driveTime != travelTimeSecond ) {
                route.driveTime = travelTimeSecond;
            }

            _.forEach( route.stopInfos, function ( stop ) {
                if ( stop.oldRouteInfoID != route.id ) {
                    stop.oldRouteInfoID = route.id;
                }

                if ( stop.oldSequence != stop.sequence) {
                    stop.oldSequence = stop.sequence;
                }
            } )
        } );
    }

    checkDataChanged(){
        var saveObj = this.buildSaveDataStr();
        return saveObj.isChanged;
    }

    calculateServiceTime(stopInfo: StopInfo, hpercent: number): number{
        return (isNaN(stopInfo.customerDuration) ? 0.0 : stopInfo.customerDuration) * ( hpercent ? Number(hpercent) : 1 ) + stopInfo.fsm;
    }

    private sumOfStopsByRouteInfo(routeInfos: RouteInfo, activityTypeText: string) {
        var sum = 0;
        const _self = this;
        _.forEach( routeInfos, function ( routeInfo ) {
            _.forEach(routeInfo.customColumns,function (customColumn) {
                if(customColumn.field == activityTypeText){
                    sum += parseInt(customColumn.value);
                }
            });
        } );

        return sum;
    }

    private calculateSumOfStopByRouteByActivity( route, ActivityTypeText ) {
        var sum = 0;
        _.forEach( route.stopInfos, function ( stop ) {
            if ( stop.activity.indexOf(ActivityTypeText) > -1){
                sum ++;
            }
        } );

        return sum;
    }

    private setPlanRouteProperty(routeInfo: RouteInfo){
        //RouteID,RouteColor,RouteName, RouteStartTime
        routeInfo.routeID = this.getRouteIDByStopInfos(routeInfo);
        routeInfo.color = this.getRouteColorByStopInfos(routeInfo);

        _.forEach(routeInfo.stopInfos, (s: StopInfo) => {
            s.color = routeInfo.color;
        });
        
        routeInfo.routeName = this.getRouteNameByStopInfos(routeInfo);
        
        if (routeInfo.startTime == ""){
            routeInfo.startTime = this.getRouteStartTimeByStopInfos(routeInfo);
        }

        if(routeInfo.activityTypeText == ""){
            routeInfo.activityTypeText = this.getRouteActivityTypeTextByStopInfos(routeInfo);
            
            if (routeInfo.activityTypeText == ActivityText.delivery){
                routeInfo.allowedActivities.push(ActivityText.delivery);
            }

        }
        
    }

    private getRouteIDByStopInfos(routeInfo: RouteInfo){
        if (routeInfo.stopInfos.length == 0){
            return "";
        }

        for(let i = 0; i < routeInfo.stopInfos.length; i++){
            if (routeInfo.stopInfos[i].activityTypeText == ActivityText.delivery){
                return routeInfo.stopInfos[i].routeID;
            }
        }

        for(let i = 0; i < routeInfo.stopInfos.length; i++){
            if (routeInfo.stopInfos[i].activityTypeText == ActivityText.sales){
                return routeInfo.stopInfos[i].routeID;
            }
        }

        for(let i = 0; i < routeInfo.stopInfos.length; i++){
            if (routeInfo.stopInfos[i].activityTypeText == ActivityText.merchandiser){
                return routeInfo.stopInfos[i].routeID;
            }
        }

        if(routeInfo.stopInfos.length > 0){
            return ActivityText.other;
        }
    }

    private getRouteColorByStopInfos(routeInfo: RouteInfo){
        if (routeInfo.stopInfos.length > 0){
            return routeInfo.stopInfos[0].routeColor;
        }

        return "0000FF";
    }

    private getRouteNameByStopInfos(routeInfo: RouteInfo){
        if (routeInfo.stopInfos.length > 0){
            return routeInfo.stopInfos[0].routeName;
        }

        return "Not Set";
    }

    private getRouteStartTimeByStopInfos(routeInfo: RouteInfo){
        if (routeInfo.stopInfos.length > 0){
            return routeInfo.stopInfos[0].routeStartTime;
        }

        return "6:00 AM";
    }

    private getRouteActivityTypeTextByStopInfos(routeInfo: RouteInfo){
        if (routeInfo.stopInfos.length == 0){
            return ActivityText.delivery;
        }

        if (this.repositoryService.checkExistDeliveryActivityByStopInfos(routeInfo.stopInfos)){
            return ActivityText.delivery;
        }

        if (this.repositoryService.checkExistSalesActivityByStopInfos(routeInfo.stopInfos)){
            return ActivityText.sales;
        }

        if (this.repositoryService.checkExistMerchandiserActivityByStopInfos(routeInfo.stopInfos)){
            return ActivityText.merchandiser;
        }
    }

    isNeedSaveReDrawInMap(): boolean {
        return this.globalSettingService.isMultiWindow;
    }



}
