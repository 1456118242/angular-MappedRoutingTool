import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {actions, ajaxRequestType, AjaxUrl, AjaxUrlForPlan, AjaxUrlRoutePlanner, PlannerType} from "../shared/constant";
import * as _ from "lodash";
import {ObservableBusService} from "./observable-bus.service";
import {Http, URLSearchParams} from "@angular/http";
import {HttpInterceptorService} from "ng-http-interceptor";
import {Modal} from "ngx-modialog/plugins/vex";

@Injectable()
export class DataRoutePlannerService extends DataService{

    loadActivityJson() {
        return this.http.get(AjaxUrlRoutePlanner+ajaxRequestType.json+
            "&Action=" + actions.ACTIVITY_ROUTEPLANNER
            + "&Planner=" + PlannerType).toPromise();
    }

    loadRouteJson() {
        return this.http.get( AjaxUrlRoutePlanner
            +ajaxRequestType.json
            + "&Action=" + actions.DELIVERYMAN_ROUTEPLANNER_ACTIONS_ALLROUTEJSON
            + "&Planner=" + PlannerType).toPromise();
    }

    loadSomeRouteJson(result: any) {
        var request = this.requestObj( );
        return this.loadJson(result, request);
    }

    getRouteOfSearchStr(searchString){
        return this.http.get( AjaxUrlRoutePlanner
            +ajaxRequestType.json
            + "&Action=" + actions.LOAD_CUSTOMERS
            + "&SearchString=" + searchString).toPromise();
    }

    getCustomer(searchString){
        return this.http.get( AjaxUrlRoutePlanner
            +ajaxRequestType.json
            + "&Action=" + actions.SEARCH_CUSTOMER
            + "&CustmoerNumCompany=" + searchString).toPromise();
    }

    addScheduledStop(routeCustomerStr: string) {
        let request = {"RouteCustomerStr":routeCustomerStr,"Action": actions.ADD_SCHEDULEDSTOP};
        let routeCustomer = this.buildUrlSearchParams(request);
        return this.http.post( AjaxUrlRoutePlanner+ajaxRequestType.ignore, routeCustomer ).toPromise();
    }

    deleteStop(deleteStopStr: string) {
        let request = {"deleteStopStr":deleteStopStr,"Action": 24};
        let deleteStop = this.buildUrlSearchParams(request);
        return this.http.post(AjaxUrlRoutePlanner+ajaxRequestType.ignore , deleteStop ).toPromise();
    }

    toQueryPair(key, value) {
        if (typeof value == 'undefined'){
            return key;
        }
        return key + '=' + String(value);
    }

    toUrlSearch(obj) {
        var ret = [];
        for(var key in obj){
            key = encodeURIComponent(key);
            var values = obj[key];
            if(values && values.constructor == Array){//数组
                var queryValues = [];
                for (var i = 0, len = values.length, value; i < len; i++) {
                    value = values[i];
                    queryValues.push(this.toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            }else{ //字符串
                ret.push(this.toQueryPair(key, values));
            }
        }
        return ret.join('&');
    }

    //overwrite
    loadInitialJson() {
        const request = this.requestObj();
        let loadRoutesStr = "";
        let loadRoutes =  request.RoutesIDRouteVersionIDStr.split("|");
        _.forEach(loadRoutes,(routestr)=>{
            loadRoutesStr += routestr.split("^")[0]+"|";
        });
        const startDate = request.StartDate?request.StartDate:'';
        const endDate = request.StartDate?request.EndDate:'';
        // const loadRoutesStr = request.RoutesIDRouteVersionIDStr;
        const reqstr = AjaxUrlRoutePlanner
            + ajaxRequestType.json
            + "&LoadRoutesStr=" + loadRoutesStr
            + "&StartDate=" + startDate
            + "&EndDate=" + endDate
            + "&Action=" + actions.DELIVERYMAN_ROUTEPLANNER_ACTIONS_WRITE_ROUTE_JSON
            + "&AccountStatusStr=" + request.AccountStatusStr
            + "&ProductPickTypes=" + request.ProductPickTypes
            + "&WeeklyProductPickTypes=" + request.WeeklyProductPickTypes
            + "&IsNewPlanner=true"
            + "&PlannerType=" + PlannerType;
        return this.http.get(reqstr).toPromise();
    }

    //overwrite
    loadMapPointData() {
        return this.http.get(AjaxUrlRoutePlanner+ajaxRequestType.json+ "&Action=" + actions.DELIVERYMAN_ROUTEPLANNER_ACTIONS_MAPPOINTS).toPromise();
    }

    //overwrite
    loadDeliverymanJson() {
        return this.http.get( AjaxUrlRoutePlanner+ajaxRequestType.json+ "&Action=" + actions.DELIVERYMAN_ROUTEPLANNER_ACTIONS_ALLDELIVERYMAN ).toPromise();
    }

    //overwrite
    loadJson( LoadRoutesStr, request ) {
        // var isMerchandiser;
        // isMerchandiser = "";
        return this.http.get( AjaxUrlRoutePlanner
            +ajaxRequestType.json
            + "&LoadRoutesStr=" + LoadRoutesStr
            + "&StartDate=" + request.StartDate
            + "&EndDate=" + request.EndDate
            + "&Action=" + actions.DELIVERYMAN_ROUTEPLANNER_ACTIONS_WRITE_ROUTE_JSON
            + "&AccountStatusStr=" + request.AccountStatusStr
            + "&ProductPickTypes=" + request.ProductPickTypes
            + "&WeeklyProductPickTypes=" + request.WeeklyProductPickTypes
            +"&IsNewPlanner=true"
            + "&PlannerType=" + PlannerType
            // + "&isMerchandiser=" + isMerchandiser
            // + "&isBingMap=true"
        ).toPromise();
    }

    //overwrite
    saveRouteInfoStartTime(routeID: any, startTime: any) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('Action', "31");
        urlSearchParams.append('RouteStartTime', routeID + "^" + startTime);

        return this.http.post(AjaxUrlRoutePlanner + ajaxRequestType.empty + '&ActionInfo=Save start time', urlSearchParams).toPromise();
    }

    //overwrite
    saveMapPoint(routeID: any, mapPointID: any, isStartMapPoint: any) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('Action', "32");
        urlSearchParams.append('MapPointsStr', routeID + "^" + mapPointID);
        urlSearchParams.append('IsStartMapPoint', isStartMapPoint);

        return this.http.post(AjaxUrlRoutePlanner + ajaxRequestType.empty + '&ActionInfo=Save map point', urlSearchParams).toPromise();
        // buildHttpRequestConfig(ajaxRequestType.empty, "Save map point")
    }

    setCustomColumn(customColumnStr: string) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('Action', "68");
        urlSearchParams.append('customColumns', customColumnStr);
        return this.http.post(AjaxUrlRoutePlanner + ajaxRequestType.empty + '&ActionInfo=Save start time',urlSearchParams).toPromise();
    }
}