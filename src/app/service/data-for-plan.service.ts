import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {ajaxRequestType, AjaxUrl, AjaxUrlForPlan, ReSequenceType} from "../shared/constant";
import {Http, URLSearchParams} from "@angular/http";
import {ObservableBusService} from "./observable-bus.service";
import {HttpInterceptorService} from "ng-http-interceptor";
import {Modal} from "ngx-modialog/plugins/vex";

@Injectable()
export class DataForPlanService extends DataService {


    addPlan(RouteID, UserName, LSDate) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('Action', "62");
        urlSearchParams.append('RouteID', RouteID);
        urlSearchParams.append('UserID', UserName);
        urlSearchParams.append('SelectedDate', LSDate);
        return this.http.post(AjaxUrlForPlan + ajaxRequestType.ignore, urlSearchParams).toPromise();
    }

    getRouteTypeActivityEvents() {
        const request = this.requestObj();
        return this.http.get(AjaxUrlForPlan + ajaxRequestType.json + "&Action=53&PlanID_List=" + request.PlanID_List).toPromise();
    }

    loadSomePlanJson(loadSheetIdStr: any) {
        return this.loadJson(loadSheetIdStr);
    }

    deleteEvent(deleteEventList: any[]) {
        let request = {"Action":24,"DeleteEventList": JSON.stringify(deleteEventList)};
        let deleteEvent = this.buildUrlSearchParams(request);
        return this.http.post(AjaxUrlForPlan + ajaxRequestType.ignore, deleteEvent).toPromise();
    }

    //overwrite
    loadJson(loadSheetIdStr) {
        return this.http.get(AjaxUrlForPlan + ajaxRequestType.json
            + '&Action=4&PlanID_List=' + loadSheetIdStr
            + "&ActionInfo=loadJson"
            + '&isBingMap=true').toPromise();
    }

    //overwrite
    loadInitialJson() {
        let request: any = this.requestObj();
        return this.loadJson(request.PlanID_List);
    }

    //overwrite
    saveRouteInfoStartTime(planID: any, startTime: any) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('Action', "31");
        urlSearchParams.append('PlanStartTime', planID + "^" + startTime);

        return this.http.post(AjaxUrlForPlan + ajaxRequestType.empty + '&ActionInfo=Save start time', urlSearchParams).toPromise();
    }

    //overwrite
    getUsers() {
        return this.http.get(AjaxUrlForPlan + ajaxRequestType.json + '&Action=58').toPromise();
    }

    //overwrite
    loadUsers(type?: string) {
        let search;
        if (type == "") {
            search = "";
        } else {
            search = "&Search=" + type;
        }
        return this.http.get(AjaxUrlForPlan + ajaxRequestType.json + '&Action=58' + search);
    }
    //overwrite
    saveMapPoint(routeID: any, mapPointID: any, isStartMapPoint: any) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('Action', "32");
        urlSearchParams.append('MapPointsStr', routeID + "^" + mapPointID);
        urlSearchParams.append('IsStartMapPoint', isStartMapPoint);

        return this.http.post(AjaxUrlForPlan + ajaxRequestType.empty + '&ActionInfo=Save map point', urlSearchParams).toPromise();
        // buildHttpRequestConfig(ajaxRequestType.empty, "Save map point")
    }

    setCustomColumn(customColumnStr: string) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('Action', "68");
        urlSearchParams.append('customColumns', customColumnStr);
        return this.http.post(AjaxUrlForPlan + ajaxRequestType.empty + '&ActionInfo=Save start time',urlSearchParams).toPromise();
    }
}