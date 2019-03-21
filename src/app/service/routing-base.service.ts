import * as _ from 'lodash';
import {UtilService} from './util.service';
import {RouteInfo} from "../shared/route-info.model";
import {RequestedRoute} from "./mapService/requested-routes.model";
import {MapService} from "./mapService/map.service";
import {ObservableBusService} from './observable-bus.service';
import {StopInfo} from "../shared/stop-info.model";
import {GlobalSettingService} from "./global-setting.service";
import {RepositoryService} from "./repository.service";
import {RequestedStop} from "./mapService/requested-stop.model";
import {DataService} from "./data.service";
import {StopSummaryOnMap} from "../component/stopSummaryPanelOnMap/shared/stop-summary-panel-on-map.model";
import {FieldValueObject} from "../shared/field-value-object.model";
import {DecimalPipe} from "@angular/common";
import {RouteSummaryOnMap} from "../component/routeSummaryPanelOnMap/shared/route-summary-on-map.model";
import {TimeLineService} from "./timeline-service";
import {ColumnOptionDropDownMenuTemplate, PromptedMessage} from "../shared/constant";
import {ReSequenceService} from "./re-sequence.service";
import {LocalStorageService} from "@rars/ngx-webstorage";
import {Injectable} from "@angular/core";
import {CustomColumn} from "../shared/custom-column.model";

@Injectable()
export abstract class RoutingBaseService {
    constructor(public utilService: UtilService,
                public mapService: MapService,
                public observableBusService: ObservableBusService,
                public globalSettingService: GlobalSettingService,
                public repositoryService: RepositoryService,
                public dataService: DataService,
                public decimalPipe: DecimalPipe,
                public localstorageService: LocalStorageService,
                public timelineService: TimeLineService,
                public reSequenceService: ReSequenceService) {

        observableBusService.markForCheckAllOnPushComponent$.subscribe((routeInfoIDs) => {
            this.markForCheckOnPushComponent(routeInfoIDs);
        });

        observableBusService.setMarkerSizeAndZindex$.subscribe(arg => {
            const stopInfo: StopInfo = arg.stopInfo;

            mapService.setCenterByLatLng(stopInfo.lat, stopInfo.lng);
            mapService.setMarkerSizeAndZindexByNodeID(stopInfo.id, arg.isNormal);
        });

        observableBusService.markerClickedOnMapAnnounceSource$.subscribe(arg => {
            const stopInfoID = arg.nodeID;
            const routeInfoID = arg.parentID

            const routeInfo = this.repositoryService.findRouteInfoByKey(routeInfoID);
            const stopInfo = this.repositoryService.findStopInfoByKey(stopInfoID, routeInfo.stopInfos);
            this.mapService.setMarkerIconByNodeID(stopInfoID, (arg.isSelected ? "#EAEE4F" : "#" + routeInfo.color), arg.isSelected ? "" : stopInfo.imageIndex);

            if (arg.selectedNodeIDs.length > 0) {
                // todo
            } else {

            }
        });

        observableBusService.moveStopPanelClickedOnMapAnnounceSource$.subscribe(arg => {
            this.observableBusService.loading(true);

            const stopInfoID = arg.nodeID;
            const routeInfoID = arg.parentID;

            const routeInfo = this.repositoryService.findRouteInfoByKey(routeInfoID);
            const stopInfo = arg.needFilter ? routeInfo.stopInfos[routeInfo.stopInfos.length - 1] : this.repositoryService.findStopInfoByKey(stopInfoID, routeInfo.stopInfos);
            const selectedStopInfos = this.repositoryService.findStopInfosBykeys(arg.selectedNodeIDs);

            this.setLastChangeFlagIfHasSamePlanLoadSheet(routeInfo);
            this.moveStopsToOtherRoute(routeInfo, stopInfo, selectedStopInfos, arg.needFilter);

        });

        observableBusService.markerMouseOverOnMapAnnounceSource$.subscribe(arg => {
            const stopInfoID = arg.nodeID;
            const routeInfoID = arg.parentID;

            const routeInfo = this.repositoryService.findRouteInfoByKey(routeInfoID);
            const stopInfo = this.repositoryService.findStopInfoByKey(stopInfoID, routeInfo.stopInfos);

            this.bindingPropOnStopSummaryPanelOnMap(stopInfo, routeInfo);
        });

        observableBusService.mapClickAnnounceSource$.subscribe(arg => {
            this.globalSettingService.rootJson.isShowStopSummaryOnMap = false;
            this.globalSettingService.rootJson.isShowRouteSummaryOnMap = false;
        });

        observableBusService.polylineMouseOverOnMapAnnounceSource$.subscribe(arg => {
            const routeInfoID = arg.nodeID;

            const routeInfo = this.repositoryService.findRouteInfoByKey(routeInfoID);

            this.bindingPropOnRouteSummaryPanelOnMap(routeInfo);
        });
    }

    reCalculateRoutes(routeInfos: RouteInfo[]) {
        if (_.some(routeInfos)) {

            if(this.isNeedCompression()){
                this.reSetSeqByRoute(routeInfos);
            }

            let requestedRoutes = this.buildRequestedRoutesByRouteInfos(routeInfos);

            this.reSetImageIndexByRouteInfos(routeInfos);
            this.mapService.clearRoutesOnMap(requestedRoutes);
            this.mapService.calculateRoutes(requestedRoutes).then(() => {
                this.mapService.bindingMarkerAndPolylineEvents(requestedRoutes);
                this.showOrHideRouteOnMapByRouteInfos(routeInfos);
                this.keepRouteStateInMap();

                this.setDurationAndDistanceByRequestedRoutes(requestedRoutes, routeInfos);
                this.computeDriveDurationByRouteInfos(routeInfos);
                this.buildCustomColumn(routeInfos);
                this.buildCustomColumnsByUserSetting();
                this.timelineService.drawTimeline();

                this.buildCustomColumnOptionByRouteInfos(routeInfos);
                this.markForCheckOnPushComponent(_.map(routeInfos, r => r.id));
                this.observableBusService.loading(false);
            }, () => {

            });
        } else {
            this.observableBusService.loading(false);
        }


    }

    markForCheckOnPushComponent(routeInfoIDs: string[] = this.globalSettingService.rootJson.routeInfos.map(r => r.id), isMarkForCheckRouteInfoComponent: boolean = true) {
        if (isMarkForCheckRouteInfoComponent) {
            this.observableBusService.markForCheckRouteInfoComponent(routeInfoIDs);
        }

        this.observableBusService.markForCheckRouteTableSummaryComponent();
    }

    computeDriveDurationByRouteInfos(routeInfos: Array<RouteInfo>) {
        // todo assignment
        for (let routeInfo of routeInfos) {

            if (routeInfo.stopInfos.length > 0) {
                let lastStopInfo = null;

                // if (routeInfo.helper) {
                //     hpercent = this.globalSettingService.HelperPercent;
                // }

                for (let i = 0; i < routeInfo.stopInfos.length; i++) {
                    let stopInfo = routeInfo.stopInfos[i];

                    let hpercent = 1;
                    if (stopInfo.helper) {
                        hpercent = this.globalSettingService.HelperPercent;
                    }

                    let currstopInfo;

                    if (lastStopInfo == null) {
                        lastStopInfo = stopInfo;

                        let tmpStartTimeNumber = this.utilService.convertTimeStrToNumber(routeInfo.startTime) + Number(lastStopInfo.duration);
                        let serviceTimeNumber = this.calculateServiceTime(lastStopInfo, hpercent); //lastStopInfo.customerServiceDuration * hpercent;
                        let tmpEndTimeNumber = tmpStartTimeNumber + serviceTimeNumber;

                        // var obj = calculateStartTimeAndEndTimeBaseOnStaticAssignments( lastStop, staticAssignmentsSortByStartTimeDesc, tmpStartTimeNumber, tmpEndTimeNumber, true );
                        lastStopInfo.drivingTime.startTime = this.utilService.convertTimeNumberToAMPMStr(tmpStartTimeNumber);
                        lastStopInfo.drivingTime.endTime = this.utilService.convertTimeNumberToAMPMStr(tmpEndTimeNumber);
                        lastStopInfo.drivingTime.tmpStartTimeNumber = tmpStartTimeNumber;
                        lastStopInfo.drivingTime.endTimeNumber = tmpEndTimeNumber;
                    } else {
                        currstopInfo = stopInfo;

                        let tmpStartTimeNumber = Number(lastStopInfo.drivingTime.endTimeNumber )+ Number(currstopInfo.duration);
                        let serviceTimeNumber = this.calculateServiceTime(currstopInfo, hpercent); //currstopInfo.customerServiceDuration * hpercent;
                        let tmpEndTimeNumber = tmpStartTimeNumber + serviceTimeNumber;


                        // var obj = calculateStartTimeAndEndTimeBaseOnStaticAssignments( currStop, staticAssignmentsSortByStartTimeDesc, tmpStartTimeNumber, tmpEndTimeNumber, false );
                        currstopInfo.drivingTime.startTime = this.utilService.convertTimeNumberToAMPMStr(tmpStartTimeNumber);
                        currstopInfo.drivingTime.endTime = this.utilService.convertTimeNumberToAMPMStr(tmpEndTimeNumber);
                        currstopInfo.drivingTime.tmpStartTimeNumber = tmpStartTimeNumber;
                        currstopInfo.drivingTime.endTimeNumber = tmpEndTimeNumber;

                        lastStopInfo = currstopInfo;
                    }
                }

                let endtimeSec = Number((lastStopInfo.drivingTime.endTimeNumber + Number(routeInfo.duration)).toString());
                routeInfo.endTime = this.utilService.convertTimeNumberToAMPMStr(endtimeSec);

                for (let i = 0; i < routeInfo.stopInfos.length; i++) {
                    let stopInfo = routeInfo.stopInfos[i];
                    let tmp = this.compareServiceWindow(stopInfo.serviceWindows, stopInfo.drivingTime.startTime, stopInfo.drivingTime.endTime);
                    if (!_.isNull(tmp.serviceWindow)) {
                        stopInfo.closestMatchingServiceWindow = tmp.serviceWindow;
                        stopInfo.closestMatchingServiceWindow.startTimeColor = this.utilService.getRedOrBlackColorByServiceWindow(tmp.isRight);
                    }

                    stopInfo.drivingTime.startTimeColor = this.utilService.getRedOrBlackColorByServiceWindow(tmp.startTimeIsRight);
                    stopInfo.drivingTime.endTimeColor = this.utilService.getRedOrBlackColorByServiceWindow(tmp.endTimeIsRight);
                }


            }


        }
    }

    calculateStopSequence(stopIndex: number, stopInfos: StopInfo[]) {
        if (stopIndex <= 0) {
            stopInfos[stopIndex].sequence = 1;
        } else {
            const preSequence = stopInfos[stopIndex - 1].sequence;
            const tmpSequence = preSequence + 1;
            stopInfos[stopIndex].sequence = tmpSequence <= 0 ? 1 : tmpSequence;
        }
    }

    getBestFitIndex(stopInfo: StopInfo, toRoute: RouteInfo) {
        //Task 466150:ECP 18.02 Dynamic Routing: Move by Best Fit, the event left in Original plan
        if (toRoute.stopInfos.length == 0) {
            return 0;
        }
        const _self = this;
        const shortestStop: any = _.chain(toRoute.stopInfos)
            .sortBy(function (s) {
                let tmpDistance = _self.utilService.getStraightLineDistance(stopInfo.lat, stopInfo.lng, s.lat, s.lng);
                if (s.id == stopInfo.id) {
                    tmpDistance = 1000000;
                }

                return tmpDistance;
            })
            .head()
            .value();

        let shortestStopIndex = _.indexOf(toRoute.stopInfos, shortestStop);
        let subtractValue = (!this.utilService.isUndefinedOrNull(toRoute.stopInfos[shortestStopIndex - 1]) && toRoute.stopInfos[shortestStopIndex - 1].id == stopInfo.id) ? 2 : 1;
        let additionValue = (!this.utilService.isUndefinedOrNull(toRoute.stopInfos[shortestStopIndex + 1]) && toRoute.stopInfos[shortestStopIndex + 1].id == stopInfo.id) ? 2 : 1;

        let preStopDistance = 0;
        if (shortestStopIndex - subtractValue < 0) {
            let startPointLatLng = this.getMapPointLatLng(toRoute, "startMapPointID");
            preStopDistance = this.utilService.getStraightLineDistance(stopInfo.lat, stopInfo.lng, startPointLatLng.lat, startPointLatLng.lng);
        } else {

            let preStop = toRoute.stopInfos[shortestStopIndex - subtractValue];
            preStopDistance = this.utilService.getStraightLineDistance(stopInfo.lat, stopInfo.lng, preStop.lat, preStop.lng);
        }

        let nextStopDistance = 0;
        if (shortestStopIndex + additionValue >= toRoute.stopInfos.length) {
            let endPointLatLng = this.getMapPointLatLng(toRoute, "endMapPointID");
            nextStopDistance = this.utilService.getStraightLineDistance(stopInfo.lat, stopInfo.lng, endPointLatLng.lat, endPointLatLng.lng);
        } else {
            let nextStop = toRoute.stopInfos[shortestStopIndex + additionValue];
            nextStopDistance = this.utilService.getStraightLineDistance(stopInfo.lat, stopInfo.lng, nextStop.lat, nextStop.lng);
        }

        if (preStopDistance <= nextStopDistance) {
            return shortestStopIndex;
        } else {
            return shortestStopIndex + 1;

        }
    }

    removeDuplicatesSequence(routeInfo: RouteInfo) {
        if (routeInfo.stopInfos.length > 0) {
            var lastSequence = routeInfo.stopInfos[0].sequence;

            for (var i = 1; i < routeInfo.stopInfos.length; i++) {
                var stop = routeInfo.stopInfos[i];

                if (stop.sequence <= lastSequence) {
                    stop.sequence = lastSequence + 1;
                }

                lastSequence = stop.sequence;
            }
        }
    }

    showOrHideRouteOnMapByRouteInfos(routeInfos: RouteInfo[]) {
        _.forEach(routeInfos, r => {
            this.mapService.showOrHideRoute(r.id, r.isShowOnMap);
        });
    }

    reSetImageIndexByRouteInfos(routeInfos: RouteInfo[]) {
        _.forEach(routeInfos, (r) => {
            _.forEach(r.stopInfos, (s, index) => {
                s.imageIndex = s.sequence;
            });
        });
    }

    getMapPointLatLng(routeInfo: RouteInfo, mapPointProperty) {
        let pointLatLng: any = {};

        if (routeInfo[mapPointProperty] == -1) {
            if (routeInfo.stopInfos.length > 0) {

                pointLatLng = mapPointProperty == "startMapPointID" ? {
                    lat: routeInfo.stopInfos[0].lat,
                    lng: routeInfo.stopInfos[0].lng
                } : {
                    lat: routeInfo.stopInfos[routeInfo.stopInfos.length - 1].lat,
                    lng: routeInfo.stopInfos[routeInfo.stopInfos.length - 1].lng
                }
            }
        } else {
            pointLatLng = this.repositoryService.getLatLngByMapPointID(routeInfo[mapPointProperty]);
        }

        return pointLatLng;
    }

    setDurationAndDistanceByRequestedRoutes(requestedRoutes: Array<RequestedRoute>, routeInfos: Array<RouteInfo>) {
        for (let i = 0; i < routeInfos.length; i++) {
            this.setDurationAndDistanceBySingleRequestedRoute(requestedRoutes[i], routeInfos[i]);
        }
    }

    setDurationAndDistanceBySingleRequestedRoute(requestedRoute: RequestedRoute, routeInfo: RouteInfo) {
        routeInfo.distance = requestedRoute.distance;
        routeInfo.duration = requestedRoute.duration;

        for (let i = 0; i < routeInfo.stopInfos.length; i++) {
            routeInfo.stopInfos[i].distance = requestedRoute.requestStops[i].distance;
            routeInfo.stopInfos[i].duration = requestedRoute.requestStops[i].duration;
            routeInfo.stopInfos[i].distanceBetween = this.utilService.convertMeterToMiles(requestedRoute.requestStops[i].distanceBetween);
            routeInfo.stopInfos[i].distanceWarehouse = this.utilService.convertMeterToMiles(requestedRoute.requestStops[i].distanceWarehouse);
        }
    }

    moveStopsToOtherRoute(routeInfo: RouteInfo, stopInfo: StopInfo, selectedStopInfos: StopInfo[], needFilter: boolean) {
        const _self = this;
        let tmpSelectedStopInfos = _.filter(selectedStopInfos, function (s) {
            return (_.isUndefined(s.locked) || s.locked == false);
        });

        let filterAndSortedStopInfos;
        if (needFilter) {
            filterAndSortedStopInfos = _.chain(tmpSelectedStopInfos)
                .filter(function (selectedStopInfo) {
                    let fromRouteInfo: RouteInfo = _self.repositoryService.findRouteInfoByStopInfoKey(selectedStopInfo.id);
                    if (!_.isNull(fromRouteInfo)) {
                        return fromRouteInfo.id != routeInfo.id
                    }

                    return true;
                })
                .orderBy(function (selectedStopInfo) {
                    return Number(selectedStopInfo.sequence);
                }, 'desc')
                .value();
        } else {
            filterAndSortedStopInfos = _.orderBy(tmpSelectedStopInfos, function (selectedStopInfo) {
                return Number(selectedStopInfo.sequence);
            }, 'desc');
        }

        this.moveStopInfosToOtherRouteBySelected(routeInfo, stopInfo, filterAndSortedStopInfos).then((reDrawRouteInfos: RouteInfo[]) => {
            this.mapService.removeMoveStopDialog();
            this.clearSelectedMarkersOnMap();
            this.reCalculateRoutes(reDrawRouteInfos);
            this.saveDataInLocalStorage();
        });
    }

    moveStopInfosToOtherRouteBySelected(toRouteInfo: RouteInfo, toStopInfo: StopInfo, selectedStopInfos: StopInfo[]) {
        const _self = this;
        let promiseFun: any = function (resolve, reject) {
            let reDrawRouteInfos: RouteInfo[] = [];
            if (selectedStopInfos.length > 0) {
                reDrawRouteInfos.push(toRouteInfo);
            }

            _.forEach(selectedStopInfos, function (s, index) {
                // clearStopAutoRouteInfo( s );

                let insertedIndex = -1;
                if (!_.isNull(toStopInfo) && !_.isUndefined(toStopInfo)) {
                    insertedIndex = _.findIndex(toRouteInfo.stopInfos, function (s1) {
                        return s1.id == toStopInfo.id;
                    });
                }

                let fromRouteInfo = _self.repositoryService.findRouteInfoByStopInfoKey(s.id);
                let removedIndex = _.findIndex(fromRouteInfo.stopInfos, function (removeStopInfo: StopInfo) {
                    return removeStopInfo.id == s.id;
                });
                insertedIndex = insertedIndex + 1;
                _self.changeStops(toRouteInfo, fromRouteInfo, insertedIndex, removedIndex, selectedStopInfos[index]);

                _self.removeDuplicatesSequence(fromRouteInfo);
                _self.removeDuplicatesSequence(toRouteInfo);

                if (!_.includes(reDrawRouteInfos, fromRouteInfo)) {
                    reDrawRouteInfos.push(fromRouteInfo);
                }
            });

            resolve(reDrawRouteInfos);
        };

        return new Promise(promiseFun);

    }

    changeStops(toRouteInfo: RouteInfo, fromRouteInfo: RouteInfo, insertedIndex: number, removedIndex: number, fromStopInfo: StopInfo) {
        let isSameRouteInfo = fromRouteInfo.id == toRouteInfo.id;
        fromRouteInfo.stopInfos.splice(removedIndex, 1);
        if (isSameRouteInfo) {
            if (insertedIndex > removedIndex) {
                insertedIndex = insertedIndex - 1 < 0 ? 0 : insertedIndex - 1;
            }
        }
        toRouteInfo.stopInfos.splice(insertedIndex, 0, fromStopInfo);

        this.calculateStopSequence(insertedIndex, toRouteInfo.stopInfos);

        if (!isSameRouteInfo) {
            this.reSetImageIndexByRouteInfos([fromRouteInfo]);
        }

        this.reSetImageIndexByRouteInfos([toRouteInfo]);
    }

    clearSelectedMarkersOnMap() {
        const _self = this;
        this.mapService.clearSelectedMarkersOnMap(true, function (routeInfoID) {
            const routeInfo = _self.repositoryService.findRouteInfoByKey(routeInfoID);
            _self.observableBusService.showToLoadSheetRouteName(false);
            _self.observableBusService.markForCheckRouteTableSummaryComponent();
            return "#" + routeInfo.color;
        });
    }

    setMapCenterByRouteInfos(routeInfos: RouteInfo[]) {
        const requestedRoutes = this.buildRequestedRoutesByRouteInfos(routeInfos);
        this.mapService.setMapCenter(requestedRoutes);
    }

    saveRouteInfoStartTimeByIdAndStartTime(id, startTime) {
        this.dataService.saveStartTime(id, this.utilService.convertValidTimeNumStr(startTime));
    }

    bindingPropOnStopSummaryPanelOnMap(stopInfo: StopInfo, routeInfo: RouteInfo, stopSummaryOnMap: StopSummaryOnMap = this.globalSettingService.rootJson.currentShowStopSummaryOnMapObj) {
        this.globalSettingService.rootJson.isShowRouteSummaryOnMap = false;
        this.globalSettingService.rootJson.isShowStopSummaryOnMap = true;

        stopSummaryOnMap.parentID = routeInfo.id;
        stopSummaryOnMap.id = stopInfo.id;
        stopSummaryOnMap.customerID = stopInfo.customerID;
        stopSummaryOnMap.userName = stopInfo.userName;
        stopSummaryOnMap.company = stopInfo.company;
        stopSummaryOnMap.address = stopInfo.address;
        stopSummaryOnMap.address2 = stopInfo.address2;
        stopSummaryOnMap.routeName = routeInfo.routeName;

        stopSummaryOnMap.fieldValueObjects = [];
        let salesColumnName = this.globalSettingService.rootJson.salesColumnGroupName;
        if (salesColumnName) {
            for (let f of salesColumnName) {
                let fieldValueObj = new FieldValueObject();
                fieldValueObj.field = f;
                fieldValueObj.value = stopInfo[f];

                stopSummaryOnMap.fieldValueObjects.push(fieldValueObj);
            }
        }
        stopSummaryOnMap.totalFieldValueObjects = [];
        if (salesColumnName) {
            for (let f of salesColumnName) {
                let column = routeInfo.customColumns.find(c => c.field == f);
                if (!_.isUndefined(column) && !_.isNull(column)) {
                    let fieldValueObj = new FieldValueObject();
                    fieldValueObj.field = column.displayText;
                    fieldValueObj.value = column.value;

                    stopSummaryOnMap.totalFieldValueObjects.push(fieldValueObj);
                }
            }
        }
        stopSummaryOnMap.serviceTimes = stopInfo.serviceWindows;

        //todo total
        // totalFieldValueObjects?: FieldValueObject[];
    }

    bindingPropOnRouteSummaryPanelOnMap(routeInfo: RouteInfo, routeSummaryOnMap: RouteSummaryOnMap = this.globalSettingService.rootJson.currentShowRouteSummaryOnMapObj) {
        this.globalSettingService.rootJson.isShowStopSummaryOnMap = false;
        this.globalSettingService.rootJson.isShowRouteSummaryOnMap = true;

        routeSummaryOnMap.routeName = routeInfo.routeName;
        routeSummaryOnMap.deliveryman = routeInfo.deliveryman;
        routeSummaryOnMap.stopCount = routeInfo.stopInfos.length;

        routeSummaryOnMap.totalFieldValueObjects = [];
        let salesColumnName = this.globalSettingService.rootJson.salesColumnGroupName;
        if (salesColumnName) {
            for (let f of salesColumnName) {
                let column = routeInfo.customColumns.find(c => c.field == f);
                if (!_.isUndefined(column) && !_.isNull(column)) {
                    let fieldValueObj = new FieldValueObject();
                    fieldValueObj.field = column.displayText;
                    fieldValueObj.value = column.value;

                    routeSummaryOnMap.totalFieldValueObjects.push(fieldValueObj);
                }
            }
        }

        routeSummaryOnMap.travelTime = routeInfo.customColumns.find(c => c.field == "travelTime").value;
        routeSummaryOnMap.serviceTime = routeInfo.customColumns.find(c => c.field == "serviceTime").value;
        routeSummaryOnMap.totalTime = routeInfo.customColumns.find(c => c.field == "totalTime").value;

    }

    calculateTotalTimeByStops(route: RouteInfo, timeField: string, isFormat: boolean = true) {
        let sum = 0;
        let _self = this;
        let sumOfTravelTime = function () {
            _.forEach(route.stopInfos, function (stop) {
                sum += Number(stop.duration);
            });
            sum += Number(route.duration);
        };

        let sumOfServiceTime = function () {
            _.forEach(route.stopInfos, function (stop) {
                sum += _self.calculateServiceTime(stop, stop.helper ? Number(_self.globalSettingService.HelperPercent) : 1);
                // sum += (isNaN(stop.customerDuration) ? 0.0 : stop.customerDuration) * ( route.helper ? Number(route.helperPercent) : 1 ) + stop.fsm;
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

    calculateTotalDistanceByRouteInfo(routeInfo: RouteInfo, isFormat: boolean = true) {
        let sumOfDistance = 0;
        _.forEach(routeInfo.stopInfos, function (s) {
            sumOfDistance += Number(s.distance);
        });

        sumOfDistance += Number(routeInfo.distance);

        sumOfDistance = this.utilService.convertMeterToMiles(sumOfDistance);

        if (isNaN(sumOfDistance)) {
            sumOfDistance = 0;
        }

        return isFormat ? sumOfDistance.toFixed(2) : sumOfDistance;
    }

    calculateRouteCost(routeInfo: RouteInfo, isFormat: boolean = true) {
        let sumOfDistance: number = Number(this.calculateTotalDistanceByRouteInfo(routeInfo, false));

        if (!_.isUndefined(routeInfo.costPerMile) && !_.isNull(routeInfo.costPerMile) && routeInfo.costPerMile != "") {
            return isFormat ? "$" + (Number(routeInfo.costPerMile) * sumOfDistance).toFixed(2) : (Number(routeInfo.costPerMile) * sumOfDistance).toFixed(2);
        } else {
            //return isFormat ? "$" + sumOfDistance.toFixed(2) : sumOfDistance;
            return isFormat ? "$" + 0 : 0;
        }

    }

    sumOfTimeByRouteInfos(timeField: string, routeInfos: RouteInfo[] = this.globalSettingService.rootJson.routeInfos, isFormat: boolean = true) {
        let result = 0;

        for (let i = 0; i < routeInfos.length; i++) {
            result += parseInt(this.calculateTotalTimeByStops(routeInfos[i], timeField, false));
        }

        return isFormat ? this.utilService.convertTimeNumberToStr(result) : result;
    }

    checkDrawRoutesByManual(routeInfos: Array<RouteInfo> = this.globalSettingService.rootJson.routeInfos) {
        let stopCount = 0;
        _.forEach(routeInfos, (routeInfo) => {
            stopCount += routeInfo.stopInfos.length;
        });

        return stopCount >= 1000;
    }

    sumOfRouteCostByRouteInfos(routeInfos: RouteInfo[] = this.globalSettingService.rootJson.routeInfos, isFormat: boolean = true) {
        let result: number = 0;

        for (let i = 0; i < routeInfos.length; i++) {
            result += Number(this.calculateRouteCost(routeInfos[i], false));
        }

        return isFormat ? "$" + result.toFixed(2) : result.toFixed(2);
    }

    sumOfDistanceByRouteInfos(routeInfos: RouteInfo[] = this.globalSettingService.rootJson.routeInfos) {
        let result: number = 0;

        for (let i = 0; i < routeInfos.length; i++) {
            result += Number(this.calculateTotalDistanceByRouteInfo(routeInfos[i], false));
        }

        return result.toFixed(2);
    }

    changeRouteColorOnMapByRouteInfo(routeInfo: RouteInfo) {
        this.mapService.setRouteColor(this.buildRequestedRouteByRouteInfo(routeInfo));
        this.mapService.clearSelectedMarkersOnMap(false, function (id) {
            return routeInfo.color
        }, routeInfo.id);
    }

    changeRouteColorOnMapByRouteIdAndColor(routeIdAndColor) {
        this.mapService.setRouteColor(routeIdAndColor);
        this.mapService.clearSelectedMarkersOnMap(false, function (id) {
            return routeIdAndColor.color
        }, routeIdAndColor.id);
    }
    compareServiceWindow(services, startTime, endTime) {
        let resultFlag = services.length <= 0;
        let startTimeIsRight = true;
        let endTimeIsRight = true;
        let sTime = this.utilService.convertTimeStrToNumber(startTime);
        let eTime = this.utilService.convertTimeStrToNumber(endTime);

        let serviceWindow: any = null;
        for (let k = 0; k < services.length; k++) {
            startTimeIsRight = true;
            endTimeIsRight = true;

            serviceWindow = services[k];

            let serviceWin = services[k];
            let tmpStartTime = this.utilService.convertTimeStrToNumber(serviceWin.startTime);
            let tmpEndTime = this.utilService.convertTimeStrToNumber(serviceWin.endTime);
            if (sTime >= tmpStartTime && eTime <= tmpEndTime) {
                resultFlag = true;
                break;
            } else {
                if (sTime < tmpStartTime || sTime > tmpEndTime) {
                    startTimeIsRight = false;
                }

                if (eTime < tmpStartTime || eTime > tmpEndTime) {
                    endTimeIsRight = false;
                }
            }
        }

        return {
            serviceWindow: serviceWindow,
            isRight: resultFlag,
            startTimeIsRight: startTimeIsRight,
            endTimeIsRight: endTimeIsRight
        };
    }

    setLastChangeFlagIfHasSamePlanLoadSheet(routeInfo) {
        try {
            let samePlanLoadSheetObjList = this.globalSettingService.samePlanLoadSheetObjList;

            if (samePlanLoadSheetObjList.length > 0) {
                for (let i = 0; i < samePlanLoadSheetObjList.length; i++) {
                    let samePlanObj = samePlanLoadSheetObjList[i];

                    if (samePlanObj.planID == routeInfo.planID) {
                        for (let j = 0; j < samePlanObj.loadSheetIDList.length; j++) {
                            let tmpLoadSheetID = samePlanObj.loadSheetIDList[j];
                            if (tmpLoadSheetID == routeInfo.id) {
                                routeInfo.lastChange = true;
                            } else {
                                let notLastChangeLoadSheet: any = _.find(this.globalSettingService.rootJson.routeInfos, function (r) {
                                    return r.id == tmpLoadSheetID;
                                });

                                notLastChangeLoadSheet.lastChange = false;
                            }
                        }
                    }
                }
            }
        } catch (e) {

        }

    }

    compressSequence(routeInfo: RouteInfo) {
        for (let i = 0; i < routeInfo.stopInfos.length; i++) {
            routeInfo.stopInfos[i].sequence = i + 1;
        }
    }

    reSetStopInfoSequenceByRequestedRoute(routeInfo: RouteInfo, requestedRoute: RequestedRoute, isCompressSequence: boolean = true) {
        const tempStopInfos: any = [];
        for (let i = 0; i < requestedRoute.requestStops.length; i++) {
            let stopInfo = this.repositoryService.findStopInfoByKey(requestedRoute.requestStops[i].id, routeInfo.stopInfos);
            tempStopInfos.push(stopInfo);
        }

        routeInfo.stopInfos = tempStopInfos;

        if (isCompressSequence) {
            this.compressSequence(routeInfo);
        }

    }

    reSetStopInfoSequenceByReSequence(routeInfo: RouteInfo, data: any, isCompressSequence: boolean = true) {
        if (!_.isEmpty(data)) {
            let sortedCustomerIDArr = data.split('^');

            for (let i = 0; i < sortedCustomerIDArr.length; i++) {
                let stopInfo = this.repositoryService.getStopInfoByCustomerID(sortedCustomerIDArr[i], routeInfo);
                let index = _.indexOf(routeInfo.stopInfos, stopInfo);
                if (index != -1) {
                    let temp = routeInfo.stopInfos[index];
                    routeInfo.stopInfos[index] = routeInfo.stopInfos[i];
                    routeInfo.stopInfos[i] = temp;
                }
            }

            if (isCompressSequence) {
                this.compressSequence(routeInfo);
            }
        }
    }

    buildRequestedRoutesByRouteInfos(routeInfos: RouteInfo[]): Array<RequestedRoute> {
        let googleMapRequest = [];
        routeInfos.forEach(r => {
            const requestedRoute = this.buildRequestedRouteByRouteInfo(r);
            googleMapRequest.push(requestedRoute);
        });

        return googleMapRequest;
    }

    buildRequestedRouteByRouteInfo(routeInfo: RouteInfo): RequestedRoute {
        let startMapPointLatLng = this.getMapPointLatLng(routeInfo, "startMapPointID");
        let endMapPointLatLng = this.getMapPointLatLng(routeInfo, 'endMapPointID');

        const requestedRoute = new RequestedRoute();
        requestedRoute.startLat = startMapPointLatLng.lat;
        requestedRoute.startLng = startMapPointLatLng.lng;
        requestedRoute.endLat = endMapPointLatLng.lat;
        requestedRoute.endLng = endMapPointLatLng.lng;
        requestedRoute.requestStops = [];
        requestedRoute.color = routeInfo.color;
        requestedRoute.id = routeInfo.id;
        requestedRoute.name = routeInfo.routeName;

        routeInfo.stopInfos.forEach(c => {
            const requestStop = new RequestedStop();
            requestStop.id = c.id;
            requestStop.lat = <any>c.lat;
            requestStop.lng = <any>c.lng;
            requestStop.label = c.sequence.toString();
            requestedRoute.requestStops.push(requestStop);
        });

        return requestedRoute;
    }

    buildCustomColumnOptionByRouteInfos(routeInfos: RouteInfo[], field?, value?) {

        routeInfos.forEach(r => {
            r.routeSelectColumnState.field = field ? field : r.routeSelectColumnState.field;
            r.routeSelectColumnState.value = value ? value : r.routeSelectColumnState.value;
            r.stopInfos.forEach(s => {
                s.customColumnFieldValueObj.field = r.routeSelectColumnState.field;
                s.customColumnFieldValueObj.value = s[r.routeSelectColumnState.value];
            });
        });
    }

    initRouteSelectColumnState(routeInfos: RouteInfo[] = this.globalSettingService.rootJson.routeInfos) {
        routeInfos.forEach((routeInfo) => {
            routeInfo.routeSelectColumnState = ColumnOptionDropDownMenuTemplate.keyValues[0];
        })
    }

    optimizeRouteInfo(fromRouteInfos: RouteInfo[], toRouteInfos: RouteInfo[], sequenceType: any) {
        this.reSequenceRouteInfos(fromRouteInfos, sequenceType).then(() => {
            let needOptimizerFromRouteInfos: RouteInfo[] = this.getNeedOptimizerRouteInfos(fromRouteInfos, false) as RouteInfo[];
            let needOptimizerToRouteInfos: RouteInfo[] = this.getNeedOptimizerRouteInfos(toRouteInfos) as RouteInfo[];

            if (needOptimizerToRouteInfos.length > 0) {

                for (let i = 0; i < needOptimizerFromRouteInfos.length; i++) {
                    let beyondCostRouteInfo = needOptimizerFromRouteInfos[i];

                    for (let j = beyondCostRouteInfo.stopInfos.length - 1; j >= 0; j--) {
                        let beyondCostStopInfo = beyondCostRouteInfo.stopInfos[j];

                        if (this.checkRouteInfoOptimizationRules(beyondCostRouteInfo).checked) {
                            break;
                        }

                        this.moveToOptimizerRouteInfo(needOptimizerToRouteInfos, beyondCostStopInfo, beyondCostRouteInfo);

                    }
                }

            }
            this.reSequenceRouteInfos(toRouteInfos, sequenceType).then(() => {
                // _.forEach(fromRouteInfos, this.compressSequence);
                let allRouteInfos = _.uniq(_.concat(fromRouteInfos, toRouteInfos));

                let message = this.getOptimizerFailMessage(allRouteInfos);
                if (message != "") {
                    alert(message);
                }

                this.reCalculateRoutes(allRouteInfos);
            });

        });
    }

    sumOfNumUnitByRouteInfos(field: string, routeInfos: RouteInfo[] = this.globalSettingService.rootJson.routeInfos) {
        let result = 0;

        for (let i = 0; i < routeInfos.length; i++) {
            result += parseInt(this.sumOfNumUnitByRouteInfo(routeInfos[i], field, false));
        }

        return this.decimalPipe.transform(result);
    }

    sumOfNumUnitByRouteInfo(routeInfo: RouteInfo, field: string, isTransform: boolean = true) {
        let result = 0;

        for (let i = 0; i < routeInfo.stopInfos.length; i++) {
            result += parseInt(routeInfo.stopInfos[i][field]);
        }

        return isTransform ? this.decimalPipe.transform(result) : result;
    }

    codeLngLatEmpty(emptyStopsList, i?, deferred?) {
        const _self = this;
        return new Promise((resolve, reject) => {
            let stop = emptyStopsList[i];
            let address = stop.address + stop.city + stop.state;
            this.mapService.codeAddress(address).then(successCallBack, failCallback);

            function successCallBack(result) {
                stop.lat = result.latLng.lat;
                stop.lng = result.latLng.lng;
                //var tmpStopStr = stop.CustomerID + "^" + stop.Latitude + "^" + stop.Longitude + "|";
                //dataService.saveCustomerLocation( tmpStopStr, false );
                ++i;
                if (i < emptyStopsList.length) {
                    resolve(_self.codeLngLatEmpty(emptyStopsList, i, deferred));
                } else {
                    _self.buildSaveCustomerLocation(emptyStopsList);
                    resolve();
                }
            }

            function failCallback(result) {
                ++i;
                if (i < emptyStopsList.length) {
                    _self.codeLngLatEmpty(emptyStopsList, i, deferred);
                } else {
                    _self.buildSaveCustomerLocation(emptyStopsList);
                    reject(result);
                }
            }
        });
    }

    buildSaveCustomerLocation(customerList) {
        let _self = this;
        _.forEach(customerList, function (customer) {
            let tmpStopStr = customer.customerID + "^" + customer.lat + "^" + customer.lng + "|";
            _self.dataService.saveCustomerLocation(tmpStopStr, false);
        });

    }

    keepRouteStateInMap() {
        this.mapService.showOrHideAllPolyline(this.globalSettingService.rootJson.isDrawRouteline);
        const hideRouteOnMaps = this.repositoryService.getIsHideOnMap(this.globalSettingService.rootJson.routeInfos);
        _.forEach(hideRouteOnMaps, (hideRouteOnMap) => {
            this.mapService.showOrHideRoute(hideRouteOnMap.id, hideRouteOnMap.isShowOnMap);
        });
    }

    changeStopInfosHelperByRouteInfoHelper(routeInfo: RouteInfo) {

        var filterStopInfos = _.filter(routeInfo.stopInfos, s => {
            return s.savedRealLoadSheetID == routeInfo.id;
        });

        _.forEach(filterStopInfos, s => {
            s.helper = routeInfo.helper;
        });
    }

    //********************   private   ********************//

    private moveToOptimizerRouteInfo(toRouteInfos: RouteInfo[], beyondCostStopInfo: StopInfo, beyondCostRouteInfo: RouteInfo) {
        for (let i = 0; i < toRouteInfos.length; i++) {
            let toRouteInfo: RouteInfo = toRouteInfos[i];

            if (this.checkRouteInfoOptimizationRules(toRouteInfo, beyondCostStopInfo).checked) {
                toRouteInfo.stopInfos.push(beyondCostStopInfo);

                _.remove(beyondCostRouteInfo.stopInfos, (s: StopInfo) => {
                    return s.id == beyondCostStopInfo.id;
                });
                break;
            }
        }
    }

    private checkRouteInfoOptimizationRules(routeInfo: RouteInfo, increasedStopInfo: StopInfo = null): any {
        let increasedWeight: number = 0;
        let increasedCases: number = 0;
        let increasedStopCount: number = 0;

        if (increasedStopInfo != null) {
            increasedCases = parseInt(increasedStopInfo["Total"]);
            increasedWeight = parseInt(increasedStopInfo["weight"]);
            increasedStopCount = 1
        }

        let result: any = {};
        result.checked = true;
        result.notMatchRules = [];

        if (!this.utilService.isUndefinedOrNull(routeInfo.maxStopCount) && routeInfo.maxStopCount.toString() != "") {
            if (routeInfo.stopInfos.length + increasedStopCount > routeInfo.maxStopCount) {
                result.checked = false;
                result.notMatchRules.push("MaxStopCount");
            }
        }

        if (!this.utilService.isUndefinedOrNull(routeInfo.maxCargoWeight) && routeInfo.maxCargoWeight != "") {
            let routeInfoTotalWeight = this.getRouteInfoTotalWeight(routeInfo);
            if (routeInfoTotalWeight + increasedWeight > Number(routeInfo.maxCargoWeight)) {
                result.checked = false;
                result.notMatchRules.push("MaxWeight");

            }
        }

        if (!this.utilService.isUndefinedOrNull(routeInfo.maxCases) && routeInfo.maxCases.toString() != "") {
            let routeInfoTotalCases = this.getRouteInfoTotalCases(routeInfo);
            if (routeInfoTotalCases + increasedCases > Number(routeInfo.maxCases)) {
                result.checked = false;
                result.notMatchRules.push("MaxCases");
            }
        }

        result.notMatchRules = _.uniq(result.notMatchRules);

        return result;
    }

    private getNeedOptimizerRouteInfos(routeInfos: RouteInfo[], isMeet: boolean = true) {
        let needOptimizerRouteInfos = _.filter<RouteInfo>(routeInfos, r => {
            return isMeet ? this.checkRouteInfoOptimizationRules(r).checked : !this.checkRouteInfoOptimizationRules(r).checked;
        });

        return needOptimizerRouteInfos;
    }

    private getOptimizerFailMessage(routeInfos: RouteInfo[]) {
        let message: string = "";

        try {
            let notMatchRules = [];

            for (let i = 0; i < routeInfos.length; i++) {
                let routeInfo: RouteInfo = routeInfos[i];
                let tmpRules: any = this.checkRouteInfoOptimizationRules(routeInfo);

                if (tmpRules.checked) {
                    continue;
                } else {
                    notMatchRules = _.concat(notMatchRules, tmpRules.notMatchRules);
                }
            }

            notMatchRules = _.uniq(notMatchRules);

            if (notMatchRules.length > 0) {

                for (let i = 0; i < notMatchRules.length; i++) {
                    switch (notMatchRules[i]) {
                        case "MaxStopCount":
                            message += PromptedMessage.optimizeRouteInfoNotMatchMaxStopCountFailMessage;
                            break;
                        case "MaxWeight":
                            message += PromptedMessage.optimizeRouteInfoNotMatchMaxWeightFailMessage;
                            break;
                        case "MaxCases":
                            message += PromptedMessage.optimizeRouteInfoNotMatchMaxCasesFailMessage;
                            break;
                    }
                }
            }
        } catch (e) {
            message += e.message;
        }

        return message;

    }

    private reSequenceRouteInfos(routeInfos: RouteInfo[], sequenceType: any, index: number = 0) {
        const self = this;
        this.observableBusService.loading(true);
        return new Promise((resolve, reject) => {
            if (routeInfos.length == 0) {
                resolve();
            } else {

                self.reSequenceService.reSequenceRouteInfo(routeInfos[index], self.buildRequestedRouteByRouteInfo(routeInfos[index]), sequenceType).then((result: any) => {
                    if (result.isReSequenceByGoogle) {
                        self.reSetStopInfoSequenceByRequestedRoute(result.routeInfo, result.afterReSequenceData);
                    } else {
                        self.reSetStopInfoSequenceByReSequence(result.routeInfo, result.afterReSequenceData);
                    }

                    index++;
                    if (index < routeInfos.length) {
                        resolve(self.reSequenceRouteInfos(routeInfos, sequenceType, index));//
                    } else {
                        resolve();
                    }
                }, () => {
                    index++;
                    if (index < routeInfos.length) {
                        resolve(self.reSequenceRouteInfos(routeInfos, sequenceType, index));//
                    } else {
                        resolve();
                    }
                });
            }

        })
    }

    private getRouteInfoTotalWeight(routeInfo: RouteInfo): number {
        return Number(this.sumOfNumUnitByRouteInfo(routeInfo, "weight", false));
    }

    private getRouteInfoTotalCases(routeInfo: RouteInfo): number {
        return Number(this.sumOfNumUnitByRouteInfo(routeInfo, "Total", false));
    }

    protected buildRouteInfosMaxCasesAndMaxStopCount(routeInfos: RouteInfo[] = this.globalSettingService.rootJson.routeInfos) {
        _.forEach(routeInfos, r => {
            r.maxCases = this.getRouteInfoTotalCases(r) + "";
            r.maxStopCount = r.stopInfos.length;
        });
    }

    compressSequenceByRouteInfos(routeInfos: RouteInfo[] = this.globalSettingService.rootJson.routeInfos) {
        _.forEach(routeInfos, (routeInfo) => {
            this.compressSequence(routeInfo);
        });
    }

    saveDataInLocalStorage() {
        const oneDay = 24*60*60*1000;
        let expireDate = this.localstorageService.retrieve('expireDate');
        if(expireDate){
            if((new Date().getTime() - Number(expireDate))>oneDay){
                this.localstorageService.clear();
            }
        }else {
            this.localstorageService.store("expireDate",new Date().getTime());
        }

        this.localstorageService.store(this.globalSettingService.routeIdStr + 'rootData', this.globalSettingService.rootJson);
    }

    buildRouteIdAndColor(routeInfo: RouteInfo) {
        return {id:routeInfo.id,color:routeInfo.color};
    }

    buildCustomColumnsByUserSetting() {
        if(this.globalSettingService.rootJson.showCustomColumnssetting){
            _.forEach(this.globalSettingService.rootJson.routeInfos,(routeInfo)=>{
                _.forEach(routeInfo.customColumns,(column) => {
                    if(this.globalSettingService.rootJson.showCustomColumnssetting.indexOf(column.field) != -1){
                        column.isShowInRouteSummary = true;
                    }else {
                        column.isShowInRouteSummary = false;
                    }
                });
            })
        }else {

        }
    }

    setRouteInfosCustomColumnByFirstRoute() {
        _.forEach(this.globalSettingService.rootJson.routeInfos,(routeInfo,index)=>{
            if(Number(index) > 0){
                _.forEach(routeInfo.customColumns,(customColumn:CustomColumn,index) => {
                    customColumn.isShowInRouteSummary = this.globalSettingService.rootJson.routeInfos[0].customColumns[index].isShowInRouteSummary;
                })
            }
        })
    }

    //

    //********************   Abstract   ********************//
    abstract buildCustomColumn(routeInfos: RouteInfo[]): void;
    // buildCustomColumn(routeInfos: RouteInfo[]): void {
    //
    // };


    //****************** Children Can Overwrite ***************
    calculateServiceTime(stopInfo: StopInfo, hpercent: number): number {
        return stopInfo.customerServiceDuration * hpercent;
    }

    isNeedCompression():boolean{
        return false
    }

    reSetSeqByRoute(routes: Array<RouteInfo>){

    }

    beforeCalculateRoutes(rootJson) {
        const _self = this;
        return new Promise((resolve, reject) => {
            var emptyStopList = _self.repositoryService.getEmptyStopList(rootJson.routeInfos);
            if (!_.isEmpty(emptyStopList)) {
                emptyStopList = _.flatten(emptyStopList);
                _self.codeLngLatEmpty(emptyStopList, 0).then(function () {
                    resolve();
                }, function (result) {
                    resolve(result);
                });
            } else {
                resolve();
            }
        });
    }



}
