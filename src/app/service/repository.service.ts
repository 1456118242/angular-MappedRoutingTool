import {Injectable} from '@angular/core'

import * as _ from 'lodash'

import {GlobalSettingService} from '../service/global-setting.service';
import {RouteInfo} from "../shared/route-info.model";
import {StopInfo} from "../shared/stop-info.model";
import {ActivityText} from "../shared/constant";

@Injectable()
export class RepositoryService {
    constructor(public globalSettingService: GlobalSettingService) {

    }

    findRouteInfoByKey(id: string, routeInfos: Array<RouteInfo> = this.globalSettingService.rootJson.routeInfos) {
        return _.find(routeInfos, r => r.id == id);
    }

    findStopInfoByKey(id: string, stopInfos: Array<StopInfo>): StopInfo {
        return _.find(stopInfos, c => c.id == id);
    }

    findRouteInfoByStopInfoKey(stopInfoId: string, routeInfos: Array<RouteInfo> = this.globalSettingService.rootJson.routeInfos) {
        for (let i = 0; i < routeInfos.length; i++) {
            for (let j = 0; j < routeInfos[i].stopInfos.length; j++) {
                if (routeInfos[i].stopInfos[j].id == stopInfoId) {
                    return routeInfos[i];
                }
            }
        }
    }

    findStopInfosBykeys(stopInfoIDs: string[], routeInfos: Array<RouteInfo> = this.globalSettingService.rootJson.routeInfos) {
        let result: StopInfo[] = [];

        for (let i = 0; i < routeInfos.length; i++) {
            for (let j = 0; j < routeInfos[i].stopInfos.length; j++) {
                if (_.includes(stopInfoIDs, routeInfos[i].stopInfos[j].id)) {
                    result.push(routeInfos[i].stopInfos[j])
                }
            }
        }

        return result;
    }

    findStopInfosByInvoiceId(InvoiceId:string,routeInfos: Array<RouteInfo> = this.globalSettingService.rootJson.routeInfos):Array<StopInfo>{
        let resultStops = [];
        _.forEach(routeInfos,(routeInfo:RouteInfo)=>{
            _.forEach(routeInfo.stopInfos,(stopInfo:StopInfo)=>{
                _.forEach(stopInfo.allInvoices,(invoice) =>{
                    if(invoice == InvoiceId){
                        resultStops.push(stopInfo);
                    }
                })
            });
        });
        return resultStops ;
    }

    getLatLngByMapPointID(mapPointID) {
        let latLng: any;
        // latLng = _.chain(this.globalSettingService.MapPointJsonData_Server.MapPointsJson)
        //   .find((mapPoint: any) => {
        //     return mapPoint.MapPointID == mapPointID
        //   })
        //   .map((mapPoint1: any) => {
        //     // return {lat: mapPoint1.Latitude, lng: mapPoint1.Longitude}
        //       return mapPoint1.Latitude;
        //   })
        //   .value();

        let mapPoint: any = _.find(this.globalSettingService.MapPointJsonData_Server.MapPointsJson, (m: any) => {
            return m.MapPointID == mapPointID;
        });

        latLng = {lat: mapPoint.Latitude, lng: mapPoint.Longitude};


        return latLng;
    }

    getStopInfoByCustomerID(customerID, routeInfo) {
        return _.find(routeInfo.stopInfos, function (s) {
            return s.customerID == customerID;
        });
    }

    getSamePlanLoadSheetObj(routeInfos: RouteInfo[] = this.globalSettingService.rootJson.routeInfos) {

        let tmpList = [];

        let allPlanIDList = _.chain(routeInfos)
            .uniqBy("PlanID")
            .map("PlanID")
            .value();

        for (let i = 0; i < allPlanIDList.length; i++) {
            let tmpPlanID = allPlanIDList[i];

            let tmpLoadSheetList = _.chain(routeInfos)
                .filter(function (r) {
                    return r.planID == tmpPlanID;
                })
                .map("LoadSheetID")
                .value();

            let tmpSamePlanLoadSheetObj = {
                planID: tmpPlanID,
                loadSheetIDList: tmpLoadSheetList
            };

            tmpList.push(tmpSamePlanLoadSheetObj);

        }

        return tmpList;
    }

    getReceiptByCustomerIDAndLoadSheetID(customerID, loadSheetID) {
        let receipts = this.globalSettingService.CustomerReceipt_Server;
        return _.find(receipts, (r) => {
            return r.CustomerID == customerID && r.LoadSheetID == loadSheetID;
        })
    }

    getPlanIndexByKey(planId, plans = this.globalSettingService.rootJson.routeInfos) {
        return _.findIndex(plans, function (plan) {
            return plan.id == planId;
        });
    }

    getEmptyStopList(routes) {
        routes = routes || this.globalSettingService.rootJson.routeInfos;
        let self = this;
        let emptyStopList = [];
        _.forEach(routes, function (route) {
            let EmptyStops = self.getEmptyStopListByRoute(route);
            if (!_.isEmpty(EmptyStops)) {
                emptyStopList.push(EmptyStops);
            }
        });
        return emptyStopList;
    }

    getEmptyStopListByRoute(route) {
        let emptyStopList = [];
        _.forEach(route.stopInfos, function (stop) {
            if (stop.lat === "" || stop.lng === "") {
                emptyStopList.push(stop);
            }
        });
        return emptyStopList;
    }

    getIsHideOnMap(routeInfos: Array<RouteInfo>) {
       return _.filter(routeInfos,(routeInfo)=>{
            return !routeInfo.isShowOnMap
        });
    }

    findRouteInfoIndexByKey(id: any,routes=this.globalSettingService.rootJson.routeInfos) {
        return _.findIndex( routes, function( route ){
            return route.id == id;
        });
    }

    getPhaseTextByValue(value: string) {
        let tmpValue;
        switch (value) {
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

    getRouteIndexByKey(id: any,routes = this.globalSettingService.rootJson.routeInfos) {
            return _.findIndex( routes, function( route ){
                return route.id == id;
            });
    }

    getRouteByKey(id: any,routes = this.globalSettingService.rootJson.routeInfos) {
        return _.find( routes, function ( r ) {
            return r.id == id;
        } );
    }

    checkExistDeliveryActivityByStopInfos(stopInfos: StopInfo[]){
        return _.some(stopInfos, (s: StopInfo) => {
            return s.activityTypeText == ActivityText.delivery;
        })
    }

    checkExistSalesActivityByStopInfos(stopInfos: StopInfo[]){
        return _.some(stopInfos, (s: StopInfo) => {
            return s.activityTypeText == ActivityText.sales;
        })
    }

    checkExistMerchandiserActivityByStopInfos(stopInfos: StopInfo[]){
        return _.some(stopInfos, (s: StopInfo) => {
            return s.activityTypeText == ActivityText.sales;
        })
    }
}
