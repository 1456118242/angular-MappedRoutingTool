import {Injectable} from '@angular/core';
import {Http, RequestOptions, URLSearchParams} from '@angular/http'

import * as _ from 'lodash';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';

import {
    AjaxUrl,
    ReSequenceType,
    CustomerLocationSaveUrl,
    AjaxUrlForPlan,
    AjaxUrlRoutePlanner,
    PhaseType,
    PlannerType,
    actions
} from '../shared/constant';
import {getHttpOptions, HttpInterceptorService} from "ng-http-interceptor";
import {ajaxRequestType} from '../shared/constant'
import {ObservableBusService} from "./observable-bus.service";
import {ErrorDialogComponent} from "../component/errorDialog/error-dialog";
import {RoutePrintDialogPreset} from "../shared/route-common.dialog.component.context";
import {
    Modal,
} from 'ngx-modialog/plugins/vex';
import {overlayConfigFactory} from "ngx-modialog";

@Injectable()
export class DataService {

    private url: any = "";

    private count = 0;

    constructor(public http: Http, httpInterceptor: HttpInterceptorService, public observable: ObservableBusService, public modal: Modal,) {

        httpInterceptor.response().addInterceptor((res, method, cts) => {
            return res.do(r => {
                let requestAjaxType = this.requestObj(r.url).RequestAjaxType;
                let isError = false;
                switch (parseInt(requestAjaxType)) {
                    case ajaxRequestType.json:
                        try {
                            r.json()
                        } catch (e) {
                            isError = true;
                        }

                        break;
                    case ajaxRequestType.empty:
                        if (!_.isEmpty(r.text())) {
                            isError = true;
                        }

                        break;

                    case ajaxRequestType.ignore:
                        if (r.text().indexOf("<html") > -1) {
                            isError = true;
                        }

                        break;
                    default:
                        isError = false;
                }

                if (isError) {
                    this.observable.loading(false);

                    const componentContext = <RoutePrintDialogPreset>{
                        action: this.requestObj(r.url).ActionInfo,
                        errorInfo: r.text(),
                        count: this.count
                    };
                    const dialogRef = this.modal

                        .open(ErrorDialogComponent, overlayConfigFactory(componentContext));
                    this.count++;

                }
            });
        });
        this.url = this.toAbsURL(AjaxUrl);
    }

    createPlansEvents() {
        let request: any = this.requestObj();
        return this.http.get(AjaxUrl + ajaxRequestType.ignore + '&ActionInfo=Create Plans Events' + '&Action=61&LoadSheetID_List=' + request.LoadSheetID_List).toPromise();
        // buildHttpRequestConfig(ajaxRequestType.ignore, "Create Plans Events")
    }

    loadJson(loadSheetIdStr: any, productPickTypeId: any, loadGroupId: any, showColumn: any, units: any) {
        return this.http.get(AjaxUrl + ajaxRequestType.json + '&ActionInfo=loadJson' + '&Action=4&LoadSheetID_List=' + loadSheetIdStr
            + '&isBingMap=true&Columns=' + ( showColumn || "" ) + '&ProductPickTypeID='
            + ( productPickTypeId || "" ) + '&LoadGroupID=' + ( loadGroupId || "" )
            + '&Units=' + (units || "")).toPromise();
    }

    loadInitialJson() {
        let request: any = this.requestObj();
        return this.loadJson(request.LoadSheetID_List, request.ProductPickTypeID, request.LoadGroupID, request.Columns, request.Units);
    }

    loadAllVehicleData() {
        return this.http.get(AjaxUrl + ajaxRequestType.json + '&ActionInfo=loadAll Vehicle Data' + '&Action=63').toPromise();
    }

    loadMapPointData() {
        return this.http.get(AjaxUrl + ajaxRequestType.json + '&ActionInfo=Load map point data json' + '&Action=19').toPromise();
        //buildHttpRequestConfig(ajaxRequestType.json, "Load map point data json")
    }

    loadDeliverymanJson() {
        return this.http.get(AjaxUrl + ajaxRequestType.json + '&ActionInfo=Load deliveryman json' + "&Action=18").toPromise();
        // buildHttpRequestConfig(ajaxRequestType.json, "Load deliveryman json")
    }

    getAllLoadSheet(loadSheetId: any) {
        return this.http.get(AjaxUrl + ajaxRequestType.json + '&ActionInfo=Get all load sheet' + "&Action=38" + "&LoadSheetID=" + loadSheetId).toPromise();
        // buildHttpRequestConfig(ajaxRequestType.json, "Get all load sheet")
    }

    moveInvoiceAndSave(newIdArr: any) {
        let request: any = this.requestObj();

        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('Action', "39");
        urlSearchParams.append('LoadSheetIDInvoiceIDObjList', newIdArr);
        urlSearchParams.append('ProductPickTypeID', request.ProductPickTypeID);
        urlSearchParams.append('LoadGroupID', request.LoadGroupID);
        urlSearchParams.append('Columns', request.Columns);
        urlSearchParams.append('Units', request.Units);

        return this.http.post(AjaxUrl + ajaxRequestType.empty + '&ActionInfo=Move invoice in customer list', urlSearchParams).toPromise();
        // buildHttpRequestConfig(aja + '?RequestAjaxType='+ajaxRequestType.empty+'?ActionInfo=Move invoice in customer list'xRequestType.empty, "Move invoice in customer list")
    }

    sendMessage(employee: any, route: any, startTime: any) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('Action', "3");
        urlSearchParams.append('TextMessageStr', employee + "^" + route + "^" + startTime + "|");

        return this.http.post(AjaxUrl + ajaxRequestType.ignore + '&ActionInfo=Send message', urlSearchParams).toPromise();
        // buildHttpRequestConfig(ajaxRequestType.ignore, "Send message")
    }

    setHelper(loadSheetID: any, helper: any) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('Action', "2");
        urlSearchParams.append('Helper', loadSheetID + "^" + helper);

        return this.http.post(AjaxUrl + ajaxRequestType.ignore + '&ActionInfo=Set helper', urlSearchParams).toPromise();
        // buildHttpRequestConfig(ajaxRequestType.empty, "Set helper")
    }

    getCustomerReceipt() {
        let request: any = this.requestObj();
        return this.http.get(AjaxUrl
            + ajaxRequestType.json + '&ActionInfo=Get customer receipt'
            + "&Action=95"
            + "&LoadSheetID_List=" + request.LoadSheetID_List
        ).toPromise()
            ;
        // buildHttpRequestConfig(ajaxRequestType.json, "Get customer receipt")
    }

    saveData(data: any) {
        let urlSearchParams = this.buildUrlSearchParams(data);
        return this.http.post(AjaxUrl + ajaxRequestType.json + '&ActionInfo=Save data', urlSearchParams).toPromise();
        // buildHttpRequestConfig(ajaxRequestType.json, 'Save data')
    }


    sequenceRouteFromService(type, sortCustomerIdStr, locationId, loadSheetId, customersIdAndConsumeTime) {
        let url = "";
        let urlMark = ajaxRequestType.ignore + '?ActionInfo=Sequence route, type: ' + type;
        switch (type) {
            case ReSequenceType.farthest_stop_first:
                url = AjaxUrl + urlMark + "&Action=7" + "&SortCustomerIDStr=" + sortCustomerIdStr + "&LocationID=" + locationId + "&isBingMap=1";
                break;
            case ReSequenceType.closest_stop_first:
                url = AjaxUrl + urlMark + "&Action=6" + "&SortCustomerIDStr=" + sortCustomerIdStr + "&LocationID=" + locationId + "&isBingMap=1" + urlMark;
                break;
            case ReSequenceType.shortest_distance:
                url = AjaxUrl + urlMark + "&Action=9" + "&SortCustomerIDStr=" + sortCustomerIdStr + "&LocationID=" + locationId + "&isBingMap=1" + urlMark;
                break;
            case ReSequenceType.service_windows:
                url = AjaxUrl + urlMark + "&Action=8" + "&SortCustomerIDStr=" + customersIdAndConsumeTime + "&SortLoadSheetID=" + loadSheetId + "&isBingMap=1" + urlMark;
                break;
        }
        return this.http.get(url).toPromise();//buildHttpRequestConfig(ajaxRequestType.ignore, "Sequence route, type: " + type)
    }

    saveCustomerDistancesAndDuration(saveDistanceParam) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('Action', "28");
        urlSearchParams.append('distanceList', saveDistanceParam);

        return this.http.post(AjaxUrl + ajaxRequestType.ignore + '&ActionInfo=Save customer distance and duration', urlSearchParams).toPromise(); //buildHttpRequestConfig(ajaxRequestType.ignore, "Save customer distance and duration")

        // return this.http.post(AjaxUrl, {
        //   Action: 28,
        //   distanceList: saveDistanceParam
        // }).toPromise(); //buildHttpRequestConfig(ajaxRequestType.ignore, "Save customer distance and duration")
    }

    saveSequenceOption(sequenceOption: any) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('Action', "20");
        urlSearchParams.append('ReSeqSetting', sequenceOption);

        return this.http.post(AjaxUrl, urlSearchParams).toPromise();

    }

    saveCustomerLocation(customerIdStr: any, isWarehouse: any) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append("LocationType", '1');
        urlSearchParams.append("action", 'save');
        urlSearchParams.append("accuracy", '3');
        urlSearchParams.append("list", customerIdStr);
        let urlSearchParam = new URLSearchParams();
        urlSearchParam.append("action", 'save');
        urlSearchParam.append("accuracy", '3');
        urlSearchParam.append("list", customerIdStr);
        let uriStr: any = isWarehouse ? urlSearchParams : urlSearchParam;
        return this.http.post(CustomerLocationSaveUrl + ajaxRequestType.ignore + '&ActionInfo=Save customer location', uriStr).toPromise();
        // buildHttpRequestConfig(ajaxRequestType.ignore, "Save customer location")
    }

    //Task 438254: Stop Sequence is updated by Scheduled Task not matching Stops.Sequence because Pre and Post DOT Events are sequenced 1, 2 which conflicts with delivery stop sequences 1 and 2
    createZeroInvoiceEvents(loadSheetIDArr: any) {
        var url = AjaxUrl + ajaxRequestType.empty + '&ActionInfo=Create Zero Invoice Events' + "&Action=60" + "&LoadSheetIDArr=" + JSON.stringify(loadSheetIDArr);

        return this.http.get(url).toPromise();
        // buildHttpRequestConfig(ajaxRequestType.empty, "Create Zero Invoice Events")
    }

    saveMapPoint(routeID: any, mapPointID: any, isStartMapPoint: any) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('Action', "32");
        urlSearchParams.append('MapPointsStr', routeID + "^" + mapPointID);
        urlSearchParams.append('IsStartMapPoint', isStartMapPoint);

        return this.http.post(AjaxUrl + ajaxRequestType.empty + '&ActionInfo=Save map point', urlSearchParams).toPromise();
        // buildHttpRequestConfig(ajaxRequestType.empty, "Save map point")
    }

    saveStartTime(planID: any, startTime: any) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('Action', "31");
        urlSearchParams.append('PlanStartTime', planID + "^" + startTime);

        return this.http.post(AjaxUrl + ajaxRequestType.empty + '&ActionInfo=Save start time', urlSearchParams).toPromise();
        // buildHttpRequestConfig(ajaxRequestType.empty, "Save start time")
    }

    saveDirectionsOption(isDrawDirection: any) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('Action', "27");
        urlSearchParams.append('DrawDirectionOption', isDrawDirection ? "1" : "0");

        return this.http.post(AjaxUrl + ajaxRequestType.empty + '&ActionInfo=Save directions option', urlSearchParams).toPromise();
        //buildHttpRequestConfig(ajaxRequestType.empty , "Save directions option")
    }

    getAssignments() {
        let request: any = this.requestObj();
        return this.http.get(AjaxUrl + ajaxRequestType.json + '&ActionInfo=Get assignment' + "&Action=53&LoadSheetID_List=" + request.LoadSheetID_List).toPromise();
        // buildHttpRequestConfig(ajaxRequestType.json, "Get assignment")
    }

    requestObj(location: any = window.location.search): any {
        let url: any = location;
        if (url.indexOf("?") != -1) {
            let search: any = url.substr(1);
            let requestStrArr: any = search.split("&");
            let requestObj: any = {};
            for (let i = 0; i < requestStrArr.length; i++) {
                if (requestStrArr[i].indexOf("?") != -1) {
                    let requestArr: any = requestStrArr[i].split("?");
                    for (let i = 0; i < requestArr.length; i++) {
                        if (requestArr[i].indexOf("=") != -1) {
                            let requests: any = requestArr[i].split("=");
                            requestObj[requests[0]] = unescape(requests[1]);
                        }
                    }
                    continue;
                }
                let requestArr: any = requestStrArr[i].split("=");
                requestObj[requestArr[0]] = unescape(requestArr[1]);
            }
            return requestObj;
        }

        return null;
    }

    toAbsURL(url) {
        let a = document.createElement('a');
        a.href = url;
        return a.href;
    }

    buildUrlSearchParams(keyValue) {
        let urlSearchParams = new URLSearchParams();
        for (let key in keyValue) {
            urlSearchParams.append(key, keyValue[key]);
        }

        return urlSearchParams;
    }

    loadRoutes(type?: string) {
        let search;
        let routeNames;
        if (type == "") {
            search = "";
        } else {
            search = "&Search=" + type;
        }
        return this.http.get(AjaxUrl + ajaxRequestType.json + '&Action=57' + search);

    }

    loadUsers(type?: string) {
        let search;
        if (type == "") {
            search = "";
        } else {
            search = "&Search=" + type;
        }
        return this.http.get(AjaxUrl + ajaxRequestType.json + '&Action=58' + search);
    }

    loadVehicle(type?:string){
        let search;
        if (type == "") {
            search = "";
        } else {
            search = "&Search=" + type;
        }
        return this.http.get(AjaxUrl + ajaxRequestType.json + '&Action=65' + search);
    }

    getRoute() {
        return this.http.get(AjaxUrl + ajaxRequestType.json + '&Action=57').toPromise();
    }

    getUsers() {
        return this.http.get(AjaxUrl + ajaxRequestType.json + '&Action=58').toPromise();
    }

    getVehicle() {
        return this.http.get(AjaxUrl + ajaxRequestType.json + '&Action=65').toPromise();
    }

    addLoadSheet(RouteID, Deliveryman, LSDate) {
        return this.http.get(AjaxUrl + ajaxRequestType.ignore + '&Action=59&RouteID=' + RouteID + '&Deliveryman=' + Deliveryman + '&LSDate=' + LSDate).toPromise();
    }

    sequenceRouteFromServiceForPlan(type, sortCustomerIdStr, locationId, loadSheetId, customersIdAndConsumeTime) {
        var url = "";
        switch (type) {
            case ReSequenceType.farthest_stop_first:
                url = AjaxUrlForPlan + ajaxRequestType.ignore + "&Action=7" + "&SortCustomerIDStr=" + sortCustomerIdStr + "&LocationID=" + locationId + "&isBingMap=1";
                break;
            case ReSequenceType.closest_stop_first:
                url = AjaxUrlForPlan + ajaxRequestType.ignore + "&Action=6" + "&SortCustomerIDStr=" + sortCustomerIdStr + "&LocationID=" + locationId + "&isBingMap=1";
                break;
            case ReSequenceType.shortest_distance:
                url = AjaxUrlForPlan + ajaxRequestType.ignore + "&Action=9" + "&SortCustomerIDStr=" + sortCustomerIdStr + "&LocationID=" + locationId + "&isBingMap=1";
                break;
            case ReSequenceType.service_windows:
                url = AjaxUrlForPlan + ajaxRequestType.ignore + "&Action=8" + "&SortCustomerIDStr=" + customersIdAndConsumeTime + "&SortLoadSheetID=" + loadSheetId + "&isBingMap=1";
                break;
        }
        return this.http.get(url).toPromise();
    }

    saveDataRoutePlanner(postData) {
        let urlSearchParams = this.buildUrlSearchParams(postData);
        return this.http.post(AjaxUrlRoutePlanner+ajaxRequestType.ignore,urlSearchParams).toPromise();
    }

    saveDataForPlan(data: any) {
        let urlSearchParams = this.buildUrlSearchParams(data);
        return this.http.post(AjaxUrlForPlan + ajaxRequestType.ignore + '&ActionInfo=Save data', urlSearchParams).toPromise();
        // buildHttpRequestConfig(ajaxRequestType.json, 'Save data')
    }

    saveRouteInfoStartTime(planID: any, startTime: string) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('Action', "31");
        urlSearchParams.append('PlanStartTime', planID + "^" + startTime);

        return this.http.post(AjaxUrl + ajaxRequestType.empty + '&ActionInfo=Save start time', urlSearchParams).toPromise();
    }

    selectLocationAndData(){
        return this.http.get('API.ashx?APICommand=Logistics_GetLocationAndDate').toPromise();
    }

    searchLoadSheetByLocationAndDate(location,date){
        return this.http.get('API.ashx?APICommand=Logistics_SearchLoadSheetByLocationAndDate&locations='+location+'&dates='+date).toPromise();
    }

    getRouteNamesByLoadSheetId(InvoiceIDs: string){
        return this.http.get( `${AjaxUrl}${ajaxRequestType.json}&Action=67&InvoiceIDs=${InvoiceIDs}`).toPromise();
    }

    setCustomColumn(customColumnStr: string,showColumn:string) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('Action', "68");
        urlSearchParams.append('customColumnsName', showColumn);

        urlSearchParams.append('customColumns', customColumnStr);
        return this.http.post(AjaxUrl + ajaxRequestType.empty + '&ActionInfo=Save start time',urlSearchParams).toPromise();
    }
}
