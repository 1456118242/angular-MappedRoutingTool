import {AfterViewInit, Component, HostListener, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';
import {polyfill} from 'mobile-drag-drop';
import {scrollBehaviourDragImageTranslateOverride} from "mobile-drag-drop/scroll-behaviour";

import {ObservableBusService} from '../service/observable-bus.service';
import {MappedRoutingService} from './mapped-routing.service';
import {MapService} from '../service/mapService/map.service';
import {StopInfo} from "../shared/stop-info.model";
import {RouteInfo} from "../shared/route-info.model";
import {FieldValueObject} from "../shared/field-value-object.model";
import {ReSequenceService} from "../service/re-sequence.service";
import {GlobalSettingService} from "../service/global-setting.service";
import {PrintService} from '../service/print.service'
import {DataService} from "../service/data.service";
import {UtilService} from "../service/util.service";
import {RepositoryService} from "../service/repository.service";
import {
    ReSequenceDropDownMenuTemplate,
    ColumnOptionDropDownMenuTemplate,
    PromptedMessage
} from '../shared/constant';
import {RootJson} from "../shared/root-json.model";
import {RoutePrintDialogPreset} from "../shared/route-common.dialog.component.context";
import {RoutePrintSummaryComponent} from "../component/routePrint/route-print-summary.dialog.component";
import {RoutePrintOptionComponent} from "../component/routePrint/route-print-option.dialog.component";
import {Modal} from 'ngx-modialog/plugins/vex';
import {overlayConfigFactory} from "ngx-modialog";
import {RouteSendMessageComponent} from "../component/routeSendMessage/route-send-message.dialog.component";
import {
    RouteChoosePointComponent
} from "../component/routeChoosePiont/route-choose-point.dialog.component";
import {TimeLineService} from "../service/timeline-service";
import {RouteaAddLoadSheetComponent} from "../component/addLoadSheet/route-add-loadsheet.dialog.component";
import {RouteExceptgeocodeComponent} from "../component/routeExceptgeocode/route-exceptgeocode";
import {RouteMoveInvoiceComponent} from "../component/routeMoveInvoice/route-move-invoice.dialog.component";
import {OptimizeRouteDialogComponent} from "../component/optimizeRoute/optimize-route.dialog.component";
import {ReSequenceRejectObj} from "../shared/re-sequence-reject.model";
import {RoutePrintComponent} from "../component/routePrint/route-print.dialog.component";
import {LocalStorage, LocalStorageService} from "@rars/ngx-webstorage";
import {WindowRef} from "../service/windowRef.service";
import {SelectRoutesInMappedRoutingComponent} from "../component/selelctRoutesInMappedRouting/select-routes-in-mapped-routing.component";
import {RouteChangesComponent} from "../component/routeChanges/route-changes.component";
import {UserTableColumnDiolgComponent} from "../component/userTableColumnDiolg/user-table-column-diolg.component";
import {ChangedShopInfo} from '../shared/interface'
import {CustomColumn} from "../shared/custom-column.model";

@Component({
    templateUrl: './mapped-routing.component.html',
    providers: []
})

export class MappedRoutingComponent implements OnInit,AfterViewInit{

    public rootData_v: any = {};
    public deliverymanList_v: any = {};
    public arrayVehicle_v: any = {};
    public showColumnGroupArray_v: Array<any>;
    public columnOptionDropDownMenuTemplate:any;
    public linearUnitOfMeasure_v: string;
    public isDrawRoutesByManual:boolean;
    public isbeforeunloadHandler = {isbeforeunloadHandler: true};

    private dragDropToRouteInfo: RouteInfo;
    private dragToIndex: number;
    private routeIds = [];
    private routeIdStr ;
    private isMultiWindow:boolean;
    private PopupWindow = null;
    private isBeforeunload = true;


    constructor(public http: Http,
                public mappedRoutingService: MappedRoutingService,
                public mapService: MapService,
                public printService: PrintService,
                public observableBusService: ObservableBusService,
                public reSequenceService: ReSequenceService,
                public globalSettingService: GlobalSettingService,
                public dataService: DataService,
                public window:WindowRef,
                public modal: Modal,
                public localStorageService:LocalStorageService,
                public util:UtilService,
                public repositoryService: RepositoryService,
                public timelineService: TimeLineService,
                public utilService: UtilService) {

        this.routeIdStr = this.dataService.requestObj(this.window.getNativeWindow().location.search).LoadSheetID_List+'mappedRouting';
        this.globalSettingService.routeIdStr = this.routeIdStr;

    }

    localStorageObserver(){
        this.localStorageService.observe(this.routeIdStr + 'rootData').subscribe((data)=>{
            if(data){
                this.transformLocalToMemory(data);
                this.showColumnGroupArray_v = _.chain(this.globalSettingService.rootJson.salesColumnGroupNameFieldValueObjectArray).filter((s: any) => s.value).map((s: FieldValueObject) => <string>s.field).value();
            }
        });
        this.localStorageService.observe(this.routeIdStr + 'routeColor').subscribe((routeIdAndColor)=>{
            if(routeIdAndColor){
                this.mappedRoutingService.changeRouteColorOnMapByRouteIdAndColor(routeIdAndColor);
                this.timelineService.drawTimeline();
                this.mappedRoutingService.markForCheckOnPushComponent();
            }
        });
        this.localStorageService.observe(this.routeIdStr + 'routeStateInMap').subscribe((routeInfo)=>{
            if(routeInfo){
                if (this.globalSettingService.rootJson.isDrawRouteline) {
                    this.mapService.showOrHideRoute(routeInfo.id, routeInfo.isShowOnMap);
                } else {
                    this.mapService.showOrHideRoute(routeInfo.id, routeInfo.isShowOnMap);
                    this.mapService.showOrHidePolylineByRequestedRouteID(routeInfo.id, this.globalSettingService.rootJson.isDrawRouteline);
                }
            }
        });
        this.localStorageService.observe(this.routeIdStr + 'isReCalculateRoutes').subscribe((isReDrawRoutesOnMap)=>{
            if(isReDrawRoutesOnMap){
                this.observableBusService.loading(true);
                this.mappedRoutingService.reCalculateRoutes(this.rootData_v.routeInfos);
            }
        });
        this.localStorageService.observe(this.routeIdStr + "clickStopOnStopList").subscribe((stopInfoClickObj) => {
            this.observableBusService.setMarkerSizeAndZindex(stopInfoClickObj);
        });
    }

    ngOnInit(): void {
        this.observableBusService.loading(true);
        this.linearUnitOfMeasure_v = linearUnitOfMeasure;
        this.mappedRoutingService.initMapRelated();
        this.checkIsMultiWindow();
        if(this.isMultiWindow){
            this.initMapView();
            this.localStorageObserver();
            this.globalSettingService.rootJson = this.localStorageService.retrieve(this.routeIdStr+'rootData');
            this.rootData_v = this.globalSettingService.rootJson;
            this.globalSettingService.MapPointJsonData_Server = this.localStorageService.retrieve(this.routeIdStr+'mapPoint');
            if (linearUnitOfMeasure == '2') {
                this.globalSettingService.MilesConversionConstant = 1000;
            }
            this.isDrawRoutesByManual = this.mappedRoutingService.checkDrawRoutesByManual();
            if (this.isDrawRoutesByManual){
                this.globalSettingService.isDrawRoutesByManual = true;
                alert(PromptedMessage.moreThan500StopMessage);
            }
            this.initViewData();
            this.mappedRoutingService.main(true);

        }else {
            this.dataService.createPlansEvents().then(() => {
                Observable.forkJoin(this.dataService.loadInitialJson(), this.dataService.loadMapPointData())
                    .subscribe((response) => {
                        if (response[0].text() == "") {
                            this.observableBusService.loading(false);
                            return;
                        }

                        this.globalSettingService.rootJson = this.mappedRoutingService.buildRootJson(response[0].json());
                        this.globalSettingService.MapPointJsonData_Server = response[1].json();
                        if (linearUnitOfMeasure == '2') {
                            this.globalSettingService.MilesConversionConstant = 1000;
                        }
                        _.forEach(this.globalSettingService.rootJson.routeInfos,(routeInfo)=>{
                            this.routeIds.push(routeInfo.id);
                        });
                        this.isDrawRoutesByManual = this.mappedRoutingService.checkDrawRoutesByManual();
                        if (this.isDrawRoutesByManual){
                            this.globalSettingService.isDrawRoutesByManual = true;
                            alert(PromptedMessage.moreThan500StopMessage);
                        }
                        this.startUp(true,false);
                    });
            });
        }
        polyfill({
            dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride
        });
        try {
            window.addEventListener("touchmove", function () {
            }, {passive: false});

        }
        catch (e) {
        }
    }

    startUp(isSetMapCenter: boolean = true,isSaveChange:boolean = true) {

        return new Promise((resolve, reject) => {
            this.initViewData();
            this.mappedRoutingService.main(isSetMapCenter).then(()=>{
                if(!isSaveChange){
                    this.refresh();
                }

                resolve();
            });
        });

    }

    initViewData() {
        this.globalSettingService.oldRootJson = JSON.parse(JSON.stringify(this.globalSettingService.rootJson));
        this.columnOptionDropDownMenuTemplate = ColumnOptionDropDownMenuTemplate;
        this.rootData_v = this.globalSettingService.rootJson;
        this.observableBusService.routeInfosCompeleted();
        let reSequenceKeyValue: any = _.find(ReSequenceDropDownMenuTemplate.keyValues, r => r.value == this.globalSettingService.rootJson.reSeqSetting);

        if (typeof(reSequenceKeyValue) == 'undefined') {
            reSequenceKeyValue = ReSequenceDropDownMenuTemplate.keyValues[0];
        }
        reSequenceKeyValue.isShow = true;

        try {
            this.globalSettingService.samePlanLoadSheetObjList = this.repositoryService.getSamePlanLoadSheetObj();
        } catch (e) {
        }

        this.showColumnGroupArray_v = _.chain(this.globalSettingService.rootJson.salesColumnGroupNameFieldValueObjectArray).filter((s: any) => s.value).map((s: FieldValueObject) => <string>s.field).value();
    }

    dropToRouteInfoCallback(event: any) {
        if(!this.isMultiWindow){
            this.observableBusService.loading(true);
        }
        let dragStopInfo: StopInfo = event.dragStopInfo;
        let toIndex: number = event.toIndex;
        let toRouteInfo: RouteInfo = event.toRouteInfo;
        if (event.isBestFit) {
            toIndex = this.mappedRoutingService.getBestFitIndex(dragStopInfo, toRouteInfo);
        }

        this.dragDropToRouteInfo = toRouteInfo;
        this.dragToIndex = toIndex;
        this.observableBusService.dropEndReplayMarksState();
    }

    moveFromRouteInfoCallback(event: any) {

        let dragStopInfo: StopInfo = event.dragStopInfo;
        let fromRouteInfo: RouteInfo = event.fromRouteInfo;

        const fromIndex = fromRouteInfo.stopInfos.indexOf(dragStopInfo);

        if (fromRouteInfo.id == this.dragDropToRouteInfo.id && this.dragToIndex > fromIndex) {
            this.dragToIndex = this.dragToIndex - 1 < 0 ? 0 : this.dragToIndex - 1;
        }

        //Task 413181
        if (dragStopInfo.locked && fromRouteInfo.id != this.dragDropToRouteInfo.id) {
            alert("Invoice is locked and cannot be moved");
            this.observableBusService.loading(false);
            return;
        }

        fromRouteInfo.stopInfos.splice(fromIndex, 1);
        this.dragDropToRouteInfo.stopInfos.splice(this.dragToIndex, 0, dragStopInfo);

        this.mappedRoutingService.calculateStopSequence(this.dragToIndex, this.dragDropToRouteInfo.stopInfos);

        this.mappedRoutingService.removeDuplicatesSequence(fromRouteInfo);
        this.mappedRoutingService.removeDuplicatesSequence(this.dragDropToRouteInfo);

        this.mappedRoutingService.setLastChangeFlagIfHasSamePlanLoadSheet(fromRouteInfo);
        this.mappedRoutingService.setLastChangeFlagIfHasSamePlanLoadSheet(this.dragDropToRouteInfo);

        const reCalculateRoutesArr  = fromRouteInfo.id == this.dragDropToRouteInfo.id ? [this.dragDropToRouteInfo] :[fromRouteInfo, this.dragDropToRouteInfo];
        if(this.isMultiWindow){
            this.saveDataInLocalStorage();
            this.saveIsReDrawRoutesOnMap();
        }else {
            this.mappedRoutingService.reCalculateRoutes(reCalculateRoutesArr);
        }
        this.dragDropToRouteInfo = null;
        this.dragToIndex = 0;

    }

    selectMarkersOnMapByRectCallback() {
        this.mapService.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.RECTANGLE);
    }

    selectMarkersOnMapByCaustomPolygonCallback() {
        this.mapService.isDrawPolygon = true;
        this.mapService.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    }

    changeMapModeToMoveCallback() {
        this.mapService.isDrawPolygon = false;
        this.mapService.drawingManager.setDrawingMode(null);
    }

    unSelectMarkersOnMapCallback() {
        this.mappedRoutingService.clearSelectedMarkersOnMap();
    }

    setMapCenterCallback() {
        this.mappedRoutingService.setMapCenterByRouteInfos(this.globalSettingService.rootJson.routeInfos);
    }

    expandOrShrinkAllRouteInfo(isShowAllRouteInfo: boolean) {
        this.rootData_v.routeInfos.forEach(r => {
            r.isSelected = isShowAllRouteInfo;
        });

        this.observableBusService.markForCheckAllOnPushComponent(this.globalSettingService.rootJson.routeInfos.map(r => r.id))
        this.saveDataInLocalStorage();
    }

    changeSalesColumnGroupNameFieldValueObjectArray(field:string) {
        let columnFieldValueObj = this.rootData_v.salesColumnGroupNameFieldValueObjectArray.find(s => s.field == field);
        columnFieldValueObj.value = !columnFieldValueObj.value;
        this.showColumnGroupArray_v = _.chain(this.rootData_v.salesColumnGroupNameFieldValueObjectArray).filter((s: any) => s.value).map((s: any) => s.field).value();
        this.observableBusService.markForCheckAllOnPushComponent(this.globalSettingService.rootJson.routeInfos.map(r => r.id));
        this.saveDataInLocalStorage();
    }

    showOrHideRouteLineOnMap(isShow: boolean){
        if(this.isDrawRoutesByManual){
            if(isShow){
                this.rootData_v.isDrawRouteline= isShow;
                this.isDrawRoutesByManual = this.globalSettingService.isDrawRoutesByManual = false;
                this.observableBusService.loading(true);
                this.mappedRoutingService.reCalculateRoutes(this.globalSettingService.rootJson.routeInfos);
            }else {
                this.showOrHideRouteLineOnMapNormal(isShow);
            }
        }else {
            this.showOrHideRouteLineOnMapNormal(isShow);
        }
    }

    showOrHideRouteLineOnMapNormal(isShow){
        this.globalSettingService.rootJson.isDrawRouteline = isShow;
        this.dataService.saveDirectionsOption(isShow);
        this.mapService.showOrHideAllPolyline(isShow);
        _.forEach((this.globalSettingService.rootJson.routeInfos),(routeInfo)=>{
            if(routeInfo.isShowOnMap == false){
                this.mapService.showOrHideRoute(routeInfo.id,false)
            }
        });
    }

    reSequenceHandler(event: any) {
        this.reSequenceService.reSequenceRouteInfo(event.routeInfo, this.mappedRoutingService.buildRequestedRouteByRouteInfo(event.routeInfo), event.sequenceType).then((result: any) => {
            if (result.isReSequenceByGoogle) {
                this.mappedRoutingService.reSetStopInfoSequenceByRequestedRoute(result.routeInfo, result.afterReSequenceData);
            } else {
                this.mappedRoutingService.reSetStopInfoSequenceByReSequence(result.routeInfo, result.afterReSequenceData);
            }
            if(this.isMultiWindow){
                this.saveDataInLocalStorage();
                this.saveIsReDrawRoutesOnMap();
            }else {
                this.mappedRoutingService.reCalculateRoutes([result.routeInfo]);
            }
        }, (reSequenceRejectObj: ReSequenceRejectObj) => {
            if (reSequenceRejectObj.message != "") {
                alert(reSequenceRejectObj.message + "    Memo: " + reSequenceRejectObj.rejectFunctionName);
            }

            this.observableBusService.loading(false);
        });
    }

    changeRouteInfoSelectStatus() {
        const isAllSelected = !_.some(this.rootData_v.routeInfos, r => !r.isSelected);
        this.rootData_v.isSelectAllRouteInfo = isAllSelected;
        this.saveDataInLocalStorage();
    }

    changeRouteOnMapStatusCallback(routeInfo: RouteInfo) {
        let routeOnMapState = {id:routeInfo.id,isShowOnMap:routeInfo.isShowOnMap};
        this.saveRouteStateInMapInLSByRouteInfo(routeOnMapState);
        this.saveDataInLocalStorage();
        if (this.globalSettingService.rootJson.isDrawRouteline) {
            this.mapService.showOrHideRoute(routeInfo.id, routeInfo.isShowOnMap);
        } else {
            this.mapService.showOrHideRoute(routeInfo.id, routeInfo.isShowOnMap);
            this.mapService.showOrHidePolylineByRequestedRouteID(routeInfo.id, this.globalSettingService.rootJson.isDrawRouteline);
        }

    }

    changeRouteColorCallback(routeInfo: RouteInfo) {
        this.saveColorInLocalStorageByRouteInfo(this.mappedRoutingService.buildRouteIdAndColor(routeInfo));
        this.saveDataInLocalStorage();
        this.mappedRoutingService.changeRouteColorOnMapByRouteInfo(routeInfo);
        this.timelineService.drawTimeline();
        this.mappedRoutingService.markForCheckOnPushComponent();
    }

    changeRouteInfoHelper(routeInfo: RouteInfo) {
        this.dataService.setHelper(routeInfo.id, routeInfo.helper);
        this.mappedRoutingService.changeStopInfosHelperByRouteInfoHelper(routeInfo);
        this.mappedRoutingService.computeDriveDurationByRouteInfos([routeInfo]);
        this.mappedRoutingService.buildCustomColumn([routeInfo]);
        this.mappedRoutingService.markForCheckOnPushComponent([routeInfo.id]);
    }

    changeColumn(routeInfo: RouteInfo) {
        this.mappedRoutingService.buildCustomColumnOptionByRouteInfos([routeInfo]);
        this.observableBusService.markForCheckRouteInfoComponent(routeInfo.id);
    }

    changeRouteInfoStartTime(routeInfo: RouteInfo) {
        this.dataService.saveStartTime(routeInfo.planID, this.utilService.convertValidTimeNumStr(routeInfo.startTime));
        this.mappedRoutingService.computeDriveDurationByRouteInfos([routeInfo]);
        this.timelineService.drawTimeline();
        this.mappedRoutingService.markForCheckOnPushComponent([routeInfo.id]);
    }

    trackByRouteInfo(index: number, routeInfo: RouteInfo): number {
        return index;
    }


    saveChangesHandler() {
            const _self = this;
            _self.observableBusService.loading(true);
            this.globalSettingService.isSaveDataAction = true;
            this.mappedRoutingService.saveChanges(this.rootData_v).then(function (result: any) {
                let changeInfos ;
                if (result != "") {
                    const saveMassgeObj: any = JSON.parse(result);
                    if (saveMassgeObj.MessageCode == 2) {
                        alert(saveMassgeObj.ErrorMessage);
                    }
                    if(saveMassgeObj.MessageCode == 1){
                        changeInfos = JSON.parse(saveMassgeObj.MessageAotuRoute);
                    }
                }
                 _self.dataService.loadInitialJson().then(function (r2) {
                                let previousRootJson = JSON.parse(JSON.stringify(_self.globalSettingService.rootJson));
                                _self.globalSettingService.rootJson = _self.mappedRoutingService.buildRootJson(r2.json());

                                if (previousRootJson.routeInfos.length != _self.globalSettingService.rootJson.routeInfos.length){
                                    _self.dataService.createPlansEvents().then(() => {
                                        _self.dataService.loadInitialJson().then(function (r2) {
                                            _self.globalSettingService.rootJson = _self.mappedRoutingService.buildRootJson(r2.json());

                                            _self.keepPropertyStatusByPreviousRootJson(previousRootJson);
                                            _self.startUp(false).then(()=>{
                                                if(changeInfos && changeInfos.length>0){
                                                    _self.addDistRouteName(changeInfos,previousRootJson);
                                                    const componentContext = <RoutePrintDialogPreset>{changeInfos:changeInfos};
                                                    const dialogRef = _self.modal
                                                        .open(RouteChangesComponent, overlayConfigFactory(componentContext));
                                                }
                                                if(_.isArray(changeInfos) && changeInfos.length == 0){
                                                    alert(PromptedMessage.defaultRouteNotFoundMessage);
                                                }
                                            });
                                        });
                                    });

                                }else{
                                    _self.keepPropertyStatusByPreviousRootJson(previousRootJson);
                                    _self.startUp(false).then(() => {
                                        if(changeInfos && changeInfos.length>0){
                                            _self.addDistRouteName(changeInfos,previousRootJson);
                                            const componentContext = <RoutePrintDialogPreset>{changeInfos:changeInfos};
                                            const dialogRef = _self.modal
                                                .open(RouteChangesComponent, overlayConfigFactory(componentContext));
                                        }
                                        if(_.isArray(changeInfos) && changeInfos.length == 0){
                                            alert(PromptedMessage.defaultRouteNotFoundMessage);
                                        }
                                    });
                                }
                            });
            }, function () {
                _self.observableBusService.loading(false);
            })
    }
    addDistRouteName(changedStopInfos:Array<ChangedShopInfo>,previousRouteJson){
        _.forEach(changedStopInfos,(changedStopInfo:ChangedShopInfo) => {
            const nowStopArray = this.repositoryService.findStopInfosByInvoiceId(changedStopInfo.InvoiceID,previousRouteJson.routeInfos);
            _.forEach(nowStopArray,(stop:StopInfo) => {
                changedStopInfo.previousRoute = stop.routeName;
                changedStopInfo.customer = stop.userName;
                changedStopInfo.previousSequence = String(stop.sequence);
            });
        })
    }


    changeSaveOption(value: boolean) {
        this.globalSettingService.rootJson.isSaveLoadSheetAndRoute = value;
    }

    changeAutoRouteOption(value: boolean) {
        this.globalSettingService.rootJson.isAutoRoute = value;
    }

    createZeroInvoiceEventsHandler() {
        this.observableBusService.loading(true);
        const _self = this;
        this.dataService.createZeroInvoiceEvents(_.map(this.globalSettingService.rootJson.routeInfos, "id")).then(function () {
            _self.dataService.loadInitialJson().then(function (r2) {
                let previousRootJson = JSON.parse(JSON.stringify(_self.globalSettingService.rootJson));
                _self.globalSettingService.rootJson = _self.mappedRoutingService.buildRootJson(r2.json());
                _self.keepPropertyStatusByPreviousRootJson(previousRootJson);
                _self.startUp(false);
            });
        });
    }

    changeTimelineStatusHandler(isShowTimeline: boolean) {
        this.globalSettingService.rootJson.isShowTimeline = isShowTimeline;
        this.timelineService.drawTimeline();
        this.mappedRoutingService.markForCheckOnPushComponent([], false);
    }


    keepPropertyStatusByPreviousRootJson(previousRootJson: RootJson) {
        // globalSetting.rootJson.isShowTimeline = previousRootJson.isShowTimeline;

        for (let i = 0; i < previousRootJson.routeInfos.length; i++) {
            this.globalSettingService.rootJson.routeInfos[i].isSelected = previousRootJson.routeInfos[i].isSelected;
            this.globalSettingService.rootJson.routeInfos[i].isShowOnMap = previousRootJson.routeInfos[i].isShowOnMap;

        }

        // if ( isAutoRouted ) {
        //   try {
        //     mappedRoutingService.autoRouteCompareLoadSheetList( previousRootJson.Routes, globalSetting.rootJson.Routes );
        //   } catch ( e ) {
        //     console.log( "auto route color and text error" );
        //     console.log( e );
        //   }
        // }
    }

    printSummary() {
        const componentContext = <RoutePrintDialogPreset>{routeJson: this.rootData_v, printService: this.printService};
        const dialogRef = this.modal

            .open(RoutePrintSummaryComponent, overlayConfigFactory(componentContext));
    }

    printDialog() {
        const _self = this;

        _self.observableBusService.loading(true);
        _self.mappedRoutingService.setCustomerReceipt().then(function (receiptJson) {
            _self.observableBusService.loading(false);

            _self.printService.lSdataFormat(_self.rootData_v.routeInfos);
            const componentContext = <RoutePrintDialogPreset>{
                routeJson: _self.rootData_v,
                printService: _self.printService,
                mapService: _self.mapService,
                mapRoutingService: _self.mappedRoutingService,
            };
            const dialogRef = _self.modal

                .open(RoutePrintOptionComponent, overlayConfigFactory(componentContext));
            dialogRef.result.then((result)=>{
                if(result){
                    _self.observableBusService.loading(true);
                    const dialogRef = _self.modal
                        .open(RoutePrintComponent, overlayConfigFactory(result));
                }
            })
        });
    }

    sendMessage(routeInfo: any) {
        const componentContext = <RoutePrintDialogPreset>{routeInfo: routeInfo, dataService: this.dataService};
        const dialogRef = this.modal

            .open(RouteSendMessageComponent, overlayConfigFactory(componentContext));
    }

    changePoint(event: any) {
        const componentContext = <RoutePrintDialogPreset>{
            mapPointID: event.route[event.changePoint],
            mapPoints: this.globalSettingService.MapPointJsonData_Server
        };
        const dialogRef = this.modal

            .open(RouteChoosePointComponent, overlayConfigFactory(componentContext));
        dialogRef.result.then((result) => {
            if (result) {
                this.observableBusService.loading(true);

                if (event.route[event.changePoint] == result) {
                    this.observableBusService.loading(false);
                } else {
                    event.route[event.changePoint] = result;

                    this.dataService.saveMapPoint(event.route.planID, result, event.changePoint == "startMapPointID");

                    this.mappedRoutingService.reCalculateRoutes(this.rootData_v.routeInfos);
                }
            }
        }, () => {
            return;
        });

    }

    addLoadSheet() {
        const componentContext = <RoutePrintDialogPreset>{
            dataService:this.dataService
        };
        const dialogRef = this.modal
            .open(RouteaAddLoadSheetComponent, overlayConfigFactory(componentContext));
        dialogRef.result.then((result) => {
            if(result){
                this.globalSettingService.newLoadSheetId = result;
                this.dataService.addLoadSheet(result.routeName,result.diliveryman,result.date).then((result)=>{
                    //this.dialog.close(result.json());
                    const dialog = this.modal.confirm()
                        .className('default')
                        .message(PromptedMessage.isSaveChangesMessage)
                        .okBtn('Yes')
                        .cancelBtn('No').open();
                    dialog.result.then((ok)=>{
                        this.observableBusService.loading(true);
                        this.mappedRoutingService.saveChanges(this.rootData_v).then(()=>{
                            this.observableBusService.loading(true);
                            this.addLoadSheetLoaded(result);
                        },()=>{
                            this.observableBusService.loading(true);
                            this.addLoadSheetLoaded(result);
                        });
                    },(no)=>{
                        this.observableBusService.loading(true);
                        this.addLoadSheetLoaded(result);
                    });

                });
            }

        });
    }

    addLoadSheetLoaded(result){
        let href = window.location.href;
        this.isbeforeunloadHandler.isbeforeunloadHandler = false;
        let str = href.match(/LoadSheetID_List=(\S*)&PicksheetID_List/)[1]+result.json()+"|";
        let newstr = str.replace(/&isAddLoadSheet=true/g,'');
        let newhref = href.replace(/LoadSheetID_List=(\S*)&PicksheetID_List/,"LoadSheetID_List="+newstr+"&isAddLoadSheet=true&PicksheetID_List");

        window.location.href = newhref;
        this.observableBusService.loading(false);
    }

    geocodeStop(event: any) {
        const componentContext = <RoutePrintDialogPreset>{
            mapService: this.mapService,
            mapRoutingService: this.mappedRoutingService,
            stopInfo: event.stop,
            routeInfo: event.route
        };
        const dialogRef = this.modal

            .open(RouteExceptgeocodeComponent, overlayConfigFactory(componentContext));
    }

    moveInvoice(event: any) {
        this.observableBusService.loading(true);
        const _self = this;
        this.dataService.getAllLoadSheet(event.route.id).then(function (result) {
                if (result.statusText.toLowerCase() === "ok") {
                    _.forEach(result.json().LoadSheetJson, function (loadSheet) {
                        loadSheet.dateAndRoute = loadSheet.Date + " " + loadSheet.Route;
                    });

                    let loadSheetFilted = _.find(result.json().LoadSheetJson, function (loadSheet) {
                        return loadSheet.LoadSheetID === event.route.id;
                    });
                    if (_.isUndefined(loadSheetFilted)) {
                        loadSheetFilted = result.json().LoadSheetJson[0];
                    }
                    const componentContext = <RoutePrintDialogPreset>{
                        loadSheetFilted: loadSheetFilted,
                        stopInfo: event.stop,
                        result: result,
                        dataService: _self.dataService
                    };
                    const dialogRef = _self.modal

                        .open(RouteMoveInvoiceComponent, overlayConfigFactory(componentContext));
                    _self.observableBusService.loading(false);
                    dialogRef.result.then((result) => {
                        if (result) {
                            if (result.statusText.toLowerCase() === "ok") {
                                _self.dataService.loadInitialJson().then(function (initJson) {
                                    let previousRootJson = JSON.parse(JSON.stringify(_self.globalSettingService.rootJson));
                                    _self.globalSettingService.rootJson = _self.mappedRoutingService.buildRootJson(initJson.json());
                                    _self.keepPropertyStatusByPreviousRootJson(previousRootJson);
                                    _self.startUp(false);
                                });
                            } else {
                            }
                        }
                    }, () => {
                        return;
                    });


                }
            }
        );

    }

    geocodeStopOnMap(event: any) {
        const routeId = event.routeId;
        const stopId = event.stopId;
        const routeInfo = _.find(this.rootData_v.routeInfos, (routeInfo) => {
            return routeInfo.id == routeId;
        });
        const stopInfo = _.find(routeInfo.stopInfos, (stopInfo) => {
            return  stopInfo.id == stopId;
        });
        const componentContext = <RoutePrintDialogPreset>{
            mapService: this.mapService,
            mapRoutingService: this.mappedRoutingService,
            stopInfo: stopInfo,
            routeInfo: routeInfo
        };
        const dialogRef = this.modal

            .open(RouteExceptgeocodeComponent, overlayConfigFactory(componentContext));
    }

    beforeunloadHandler($event) {
        if (!this.isbeforeunloadHandler.isbeforeunloadHandler || !this.isBeforeunload) {
            this.clearLocal();
            return true;
        }
        let result = this.mappedRoutingService.checkDataChanged(this.rootData_v);
        if(result){
            this.clearLocal();
        }
        return !result;
    }

    moveToThisLoadSheet(routeInfo: any) {
        this.observableBusService.loading(true);
        const selectedNodeIDs = this.mapService.getSelectedMarkerNodeIDOnMap();
        let stopInfos = this.repositoryService.findStopInfosBykeys(selectedNodeIDs);
        this.mappedRoutingService.moveStopsToOtherRoute(routeInfo, routeInfo.stopInfos[routeInfo.stopInfos.length - 1], stopInfos, true)
        this.observableBusService.showToLoadSheetRouteName(false);
    }

    initToolView(event) {
        event.forEach((eleRef) => {
            eleRef.nativeElement.style.display = '';
        });
    }

    backOptimizerHander() {
        this.clearLocal();
        window.location.href = "LoadSheetOptimizer.aspx" + window.location.search.replace('isMulti='+this.isMultiWindow+'&','');
    }

    openOptimizeRoute() {

        const componentContext = <RoutePrintDialogPreset>{rootJson: this.globalSettingService.rootJson};
        const dialogRef = this.modal
            .open(OptimizeRouteDialogComponent, overlayConfigFactory(componentContext));
        dialogRef.result.then((userInput) => {
            let alertinfo = "";
            if (userInput) {
                const fromRouteInfos = userInput["fromRouteInfos"];
                const toRouteInfos = userInput["toRouteInfos"];

                const selectedReSequence = userInput["selectedReSequence"];
                this.mappedRoutingService.optimizeRouteInfo(fromRouteInfos, toRouteInfos, selectedReSequence);
            }
        });
    }

    private checkIsMultiWindow() {

        let nativeStrArr = this.window.getNativeWindow().location.href.split("#");

        if (nativeStrArr.length == 2) {
            this.globalSettingService.isMultiWindow = this.isMultiWindow = false;
        } else {
            this.globalSettingService.isMultiWindow =  this.isMultiWindow = true;
        }
    }

    private refresh(){
        let isMulti = this.util.getRequestObj(this.window.getNativeWindow().location).isMulti;
        if(isMulti == 'true'){
            this.openOtherWindow(true);
            this.observableBusService.notifyTableIsMutil()
        }
    }

    saveDataInLocalStorage(){
        this.globalSettingService.rootJson = this.rootData_v;
        this.localStorageService.store(this.routeIdStr+'rootData', this.rootData_v);
    }


    saveColorInLocalStorageByRouteInfo(routeInfo){
        this.localStorageService.store(this.routeIdStr+'routeColor',routeInfo);
    }

    saveRouteStateInMapInLSByRouteInfo(routeStateInMap){
        this.localStorageService.store(this.routeIdStr+'routeStateInMap',routeStateInMap);
    }

    transformLocalToMemory(data?){
        this.globalSettingService.rootJson = this.rootData_v = data ? data : this.localStorageService.retrieve(this.routeIdStr+'rootData');
        this.observableBusService.markForCheckAllOnPushComponent(this.routeIds);
    }

    openOtherWindow(isMulti): void {
        this.globalSettingService.isMultiWindow = this.isMultiWindow = isMulti;
        if(isMulti){
            this.OpenWindow('MapView',this.window.getNativeWindow().location.href + '#/MapView',this.window.getNativeWindow().screen.availHeight - 60, this.window.getNativeWindow().screen.availWidth - 10);
            let map = <HTMLElement>this.window.getNativeWindow().document.querySelector("#google-map");
            let toolsbar = <HTMLElement>this.window.getNativeWindow().document.querySelector(".toolsbar");
            let markertips = this.window.getNativeWindow().document.querySelector(".markertip");
            map.style.display = 'none';
            toolsbar.style.display = 'none';
            _.forEach(markertips,(markertip:HTMLElement)=>{
                markertip.style.display = 'none';
            });
            this.saveDataInLocalStorage();
            this.localStorageService.store(this.routeIdStr+'mapPoint', this.globalSettingService.MapPointJsonData_Server);
            this.localStorageObserver();
        }else {
            this.PopupWindow.close();
            this.observableBusService.loading(true);
            this.globalSettingService.rootJson = this.rootData_v;
            this.mappedRoutingService.main();
            let map = <HTMLElement>this.window.getNativeWindow().document.querySelector("#google-map");
            let toolsbar = <HTMLElement>this.window.getNativeWindow().document.querySelector(".toolsbar");
            let markertips = this.window.getNativeWindow().document.querySelector(".markertip");
            map.style.display = '';
            toolsbar.style.display = '';
            _.forEach(markertips,(markertip:HTMLElement)=>{
                markertip.style.display = '';
            });
            this.clearLocal();
        }

    }

    selectRoutes():void{
        const isSaveChange = this.mappedRoutingService.checkDataChanged(this.rootData_v);
        let urlobj = this.util.getRequestObj(this.window.getNativeWindow().location);
        let locationIDstr = unescape(urlobj.LocationID);
        let lSDatestr = unescape(urlobj.LSDate);
        if(locationIDstr == 'undefined'){
            locationIDstr = "Null";
        }
        if(lSDatestr == 'undefined'){
            lSDatestr = "Null";
        }
        let loadSheetIDstr = urlobj.LoadSheetID_List;
        const _self = this;
        this.dataService.selectLocationAndData().then(
            (data)=>{
                const componentContext = <RoutePrintDialogPreset>{
                    result:data.text(),
                    dataService:this.dataService,
                    isSaveChange:isSaveChange,
                    locationIDstr:locationIDstr,
                    loadSheetIDstr:loadSheetIDstr,
                    lSDatestr:lSDatestr,
                    routeInfos:this.rootData_v.routeInfos
                };
                const dialogClose = this.modal.open(SelectRoutesInMappedRoutingComponent,overlayConfigFactory(componentContext));
                dialogClose.result.then((resultStr)=>{
                    if(resultStr){

                        const dialog = this.modal.confirm()
                            .className('default')
                            .message(PromptedMessage.isSaveChangesMessage)
                            .okBtn('Yes')
                            .cancelBtn('No').open();
                        dialog.result.then((ok)=>{
                            _self.observableBusService.loading(true);
                            this.mappedRoutingService.saveChanges(this.rootData_v).then((result)=>{
                                _self.isBeforeunload = false;
                                this.loadedLoadSheet(resultStr);
                            },(result)=>{
                                this.loadedLoadSheet(resultStr);
                            });

                        },(no)=>{
                            _self.observableBusService.loading(true);
                            this.loadedLoadSheet(resultStr);
                        });
                    }
                })
            }
        );

    }

    selectColumns():void{
        let columnTableStr = "";
        const componentContext = <RoutePrintDialogPreset>{
            currentTableColumnsDisplayObjs:this.rootData_v.routeInfos[0].customColumns
        };
        const dialogClose = this.modal.open(UserTableColumnDiolgComponent,overlayConfigFactory(componentContext));

        dialogClose.result.then((customColumnStr)=>{
            if(customColumnStr){
                this.dataService.setCustomColumn(customColumnStr,this.rootData_v.showColumn);
                this.globalSettingService.rootJson.showCustomColumnssetting=customColumnStr;
                this.mappedRoutingService.setRouteInfosCustomColumnByFirstRoute();
                this.observableBusService.markForCheckAllOnPushComponent();
            }
        })
    }

    loadedLoadSheet(resultStr){
        this.observableBusService.loading(false);
        const urlObj = this.util.getRequestObj(this.window.getNativeWindow().location);
        const loadSheetStr = urlObj.LoadSheetID_List;
        let urlstr = this.window.getNativeWindow().location.href.replace(loadSheetStr,resultStr);
        urlstr=urlstr.replace('isMulti='+urlObj.isMulti+'&','');
        const arryStr = urlstr.split('?');
        urlstr = arryStr[0]+'?isMulti='+this.isMultiWindow+'&'+arryStr[1];
        this.window.getNativeWindow().location.href = urlstr;
    }

    initMapView():void{
        const tableGroup = <HTMLElement>this.window.getNativeWindow().document.querySelector(".table-group");
        const routeButtons = <HTMLElement>this.window.getNativeWindow().document.querySelector(".btn-group");
        tableGroup.style.display = 'none';
        routeButtons.style.display = 'none';

    }

     OpenWindow(WindowTitle, Url, Height, Width) {
        let PopupOptions;
        if (this.PopupWindow != null && this.PopupWindow.closed == false) {
            this.PopupWindow.close();
        }

        PopupOptions = "status=no,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes";

        if (Width != undefined && Width > 0) {
            PopupOptions += ',width=' + Width;
        }

        if (Height != undefined && Height > 0) {
            PopupOptions += ',height=' + Height;
        }

         this.PopupWindow = this.window.getNativeWindow().open(Url, WindowTitle.replace(/ /g, "_"), PopupOptions, false);

        if (this.PopupWindow != null && this.PopupWindow.focus) {
            this.PopupWindow.focus();
            this.PopupWindow.blur();
            this.PopupWindow.focus();
        }
    }

    clearLocal(): void {
            if(!this.isMultiWindow){
                this.localStorageService.clear(this.routeIdStr+'rootData');
                this.localStorageService.clear(this.routeIdStr+'routeColor');
                this.localStorageService.clear(this.routeIdStr+'routeStateInMap');
                this.localStorageService.clear(this.routeIdStr+'mapPoint');
                this.localStorageService.clear(this.routeIdStr+'isReCalculateRoutes');
                this.localStorageService.clear(this.routeIdStr+"clickStopOnStopList");
            }
    }

    ngAfterViewInit(): void {
        const routeInfos = this.window.getNativeWindow().document.getElementsByClassName('routelist-wrapper');
        _.forEach(routeInfos,(routeInfo:HTMLElement)=>{
            routeInfo.style.display = 'none';
        })
    }

    onunloadHandler($event) {
        this.clearLocal();
    }

    clickCustomerInfo(clickedListItem: any) {
        this.saveClickedListItemObj(clickedListItem);
    }

    saveClickedListItemObj(clickedListItemObj) {
        this.localStorageService.store(this.routeIdStr + 'clickStopOnStopList', clickedListItemObj);
    }

    private saveIsReDrawRoutesOnMap() {
        this.localStorageService.store(this.routeIdStr + 'isReCalculateRoutes', Math.random());
    }

}
