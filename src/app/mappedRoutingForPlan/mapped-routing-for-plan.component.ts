import {AfterViewInit, Component, ElementRef, OnChanges, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {MapService} from "../service/mapService/map.service";
import {ObservableBusService} from "../service/observable-bus.service";
import {GlobalSettingService} from "../service/global-setting.service";
import {MappedRoutingForPlanService} from "./mapped-routing-for-plan.service";
import {Observable} from "rxjs";
import {QueryList} from "@angular/core/src/render3";
import {
    ColumnOptionDropDownMenuTemplate, printComponentView,
    PromptedMessage,
    ReSequenceDropDownMenuTemplate
} from "../shared/constant";
import {FieldValueObject} from "../shared/field-value-object.model";
import * as _ from "lodash";
import {StopInfo} from "../shared/stop-info.model";
import {RouteInfo} from "../shared/route-info.model";
import {RouteChoosePointComponent} from "../component/routeChoosePiont/route-choose-point.dialog.component";
import {RoutePrintDialogPreset} from "../shared/route-common.dialog.component.context";
import {overlayConfigFactory} from "ngx-modialog";
import {RouteExceptgeocodeComponent} from "../component/routeExceptgeocode/route-exceptgeocode";
import {RouteMoveInvoiceComponent} from "../component/routeMoveInvoice/route-move-invoice.dialog.component";
import {RepositoryService} from "../service/repository.service";
import {ReSequenceService} from "../service/re-sequence.service";
import {Modal} from "ngx-modialog/plugins/vex";
import {RootJson} from "../shared/root-json.model";
import {UtilService} from "../service/util.service";
import {RoutePrintSummaryComponent} from "../component/routePrint/route-print-summary.dialog.component";
import {RoutePrintOptionComponent} from "../component/routePrint/route-print-option.dialog.component";
import {PrintService} from "../service/print.service";
import {ReSequenceRejectObj} from "../shared/re-sequence-reject.model";
import {RoutePrintForPlanComponent} from "../component/routePrint/route-print-for-plan.dialog.component";
import {DataForPlanService} from "../service/data-for-plan.service";
import {WindowRef} from "../service/windowRef.service";
import {LocalStorageService} from "@rars/ngx-webstorage";
import {AddPlanInForPlanDialog} from "../component/addPlanInForPlan/add-plan-in-for-plan.dialog";
import {UserTableColumnDiolgComponent} from "../component/userTableColumnDiolg/user-table-column-diolg.component";

@Component({
    templateUrl: './mapped-routing-for-plan.component.html',
    providers: []
})
export class MappedRoutingForPlanComponent implements OnInit, AfterViewInit {
    public rootData_v: any = {};
    public deliverymanList_v: any = {};
    public arrayVehicle_v: any = {};
    public showColumnGroupArray_v: Array<any>;
    public isbeforeunloadHandler = {isbeforeunloadHandler: true};
    public linearUnitOfMeasure_v: string;
    public columnOptionDropDownMenuTemplate: any;
    public isDrawRoutesByManual: boolean;

    private routeIdStr;
    private isMultiWindow: boolean;
    private PopupWindow = null;
    private dragDropToRouteInfo: RouteInfo;
    private dragToIndex: number;
    private routeIds = [];

    constructor(public http: Http,
                public mapService: MapService,
                public mappedRoutingForPlanService: MappedRoutingForPlanService,
                public observableBusService: ObservableBusService,
                public globalSettingService: GlobalSettingService,
                public dataService: DataForPlanService,
                public repositoryService: RepositoryService,
                public modal: Modal,
                public window: WindowRef,
                public localStorageService: LocalStorageService,
                public reSequenceService: ReSequenceService,
                public utilService: UtilService,
                public printService: PrintService
    ) {
        this.routeIdStr = this.dataService.requestObj(this.window.getNativeWindow().location.search).PlanID_List;
        this.globalSettingService.routeIdStr = this.routeIdStr + 'mappedRoutingForPlan';

    }

    localStorageObserver(){
        this.localStorageService.observe(this.globalSettingService.routeIdStr + 'rootData').subscribe((data) => {
            if (data) {
                this.transformLocalToMemory(data);
            }
        });
        this.localStorageService.observe(this.globalSettingService.routeIdStr + 'routeColor').subscribe((routeIdAndColor) => {
            if (routeIdAndColor) {
                this.mappedRoutingForPlanService.changeRouteColorOnMapByRouteIdAndColor(routeIdAndColor);
                this.mappedRoutingForPlanService.markForCheckOnPushComponent();
            }
        });
        this.localStorageService.observe(this.globalSettingService.routeIdStr + 'routeStateInMap').subscribe((routeInfo) => {
            if (routeInfo) {
                if (this.globalSettingService.rootJson.isDrawRouteline) {
                    this.mapService.showOrHideRoute(routeInfo.id, routeInfo.isShowOnMap);
                } else {
                    this.mapService.showOrHideRoute(routeInfo.id, routeInfo.isShowOnMap);
                    this.mapService.showOrHidePolylineByRequestedRouteID(routeInfo.id, this.globalSettingService.rootJson.isDrawRouteline);
                }
            }
        });
        this.localStorageService.observe(this.globalSettingService.routeIdStr + 'isReCalculateRoutes').subscribe((isReDrawRoutesOnMap) => {
            if(isReDrawRoutesOnMap){
                this.observableBusService.loading(true);
                this.mappedRoutingForPlanService.reCalculateRoutes(this.rootData_v.routeInfos);
            }
            // this.saveDataInLocalStorage();
        });
        this.localStorageService.observe(this.globalSettingService.routeIdStr + "clickStopOnStopList").subscribe((stopInfoClickObj) => {
            this.observableBusService.setMarkerSizeAndZindex(stopInfoClickObj);
        });
    }

    ngOnInit(): void {
        this.observableBusService.loading(true);
        this.checkIsMultiWindow();
        this.mappedRoutingForPlanService.initMapRelated();
        if (this.isMultiWindow) {
            this.initMapView();
            this.localStorageObserver();
            this.globalSettingService.rootJson = this.localStorageService.retrieve(this.globalSettingService.routeIdStr + 'rootData');
            this.rootData_v = this.globalSettingService.rootJson;
            this.globalSettingService.MapPointJsonData_Server = this.localStorageService.retrieve(this.globalSettingService.routeIdStr + 'mapPoint');
            this.isDrawRoutesByManual = this.mappedRoutingForPlanService.checkDrawRoutesByManual();
            if (this.isDrawRoutesByManual) {
                this.globalSettingService.isDrawRoutesByManual = true;
                alert(PromptedMessage.moreThan500StopMessage);
            }
            this.startUp();
        } else {
            Observable.forkJoin(this.dataService.loadInitialJson(), this.dataService.loadMapPointData(), this.dataService.getRouteTypeActivityEvents())
                .subscribe((response) => {
                    console.log(response);
                    if (response[0].text() == "") {
                        this.observableBusService.loading(false);
                        return;
                    }
                    this.globalSettingService.rootJson = this.mappedRoutingForPlanService.buildRootJson(response[0].json());
                    this.globalSettingService.MapPointJsonData_Server = response[1].json();
                    this.globalSettingService.routeTypeActivityEvents = response[2].json().RouteTypeActivityEventJson;
                    _.forEach(this.globalSettingService.rootJson.routeInfos, (routeInfo) => {
                        this.routeIds.push(routeInfo.id);
                    });
                    this.isDrawRoutesByManual = this.mappedRoutingForPlanService.checkDrawRoutesByManual();
                    if (this.isDrawRoutesByManual) {
                        this.globalSettingService.isDrawRoutesByManual = true;
                        alert(PromptedMessage.moreThan500StopMessage);
                    }
                    this.startUp();
                });
        }


    }

    startUp(isSetMapCenter: boolean = true) {
        this.initViewData();
        this.mappedRoutingForPlanService.main(isSetMapCenter);
    }

    initToolForPlan(event: QueryList<ElementRef>) {
        event.forEach((eleRef) => {
            eleRef.nativeElement.style.display = '';
        });
    }

    saveChange() {
        //;

        this.observableBusService.loading(true);
        const _self = this;
        this.mappedRoutingForPlanService.saveChanges().then(
            () => {
                _self.dataService.loadInitialJson().then(function (r2) {
                    let previousRootJson = JSON.parse(JSON.stringify(_self.globalSettingService.rootJson));
                    _self.globalSettingService.rootJson = _self.mappedRoutingForPlanService.buildRootJson(r2.json());
                    _self.keepPropertyStatusByPreviousRootJson(previousRootJson);
                    _self.startUp(false);
                })
            }, () => {
                _self.observableBusService.loading(false);
            }
        );
    }

    addPlan() {
        const componentContext = <RoutePrintDialogPreset>{
            dataService: this.dataService
        };
        const dialogRef = this.modal
            .open(AddPlanInForPlanDialog, overlayConfigFactory(componentContext));
        dialogRef.result.then((result) => {
            if (result) {
                this.dataService.addPlan(result.routeName, result.diliveryman, result.date).then((result) => {
                    const dialog = this.modal.confirm()
                        .className('default')
                        .message(PromptedMessage.isSaveChangesMessage)
                        .okBtn('Yes')
                        .cancelBtn('No').open();
                    dialog.result.then((ok) => {
                        this.observableBusService.loading(true);
                        this.mappedRoutingForPlanService.saveChanges().then(() => {
                            this.addPlanLoaded(result);
                        }, () => {
                            this.addPlanLoaded(result);
                        });
                    }, (no) => {
                        this.observableBusService.loading(true);
                        this.addPlanLoaded(result);
                    });
                });
            }
        });
    }

    reCalculate() {
        this.observableBusService.loading(true);
        this.mappedRoutingForPlanService.reCalculateRoutes(this.globalSettingService.rootJson.routeInfos);
    }

    addPlanLoaded(result) {
        let href = window.location.href;
        this.isbeforeunloadHandler.isbeforeunloadHandler = false;
        let str = href.match(/PlanID_List=(\S*)&/)[1] + result.json() + "|";
        let newhref = href.replace(/PlanID_List=(\S*)&/, "PlanID_List=" + str + "&");
        window.location.href = newhref;
        this.observableBusService.loading(false);
    }

    printSummary() {
        const componentContext = <RoutePrintDialogPreset>{routeJson: this.rootData_v, printService: this.printService};
        const dialogRef = this.modal

            .open(RoutePrintSummaryComponent, overlayConfigFactory(componentContext));
    }

    backOptimizerHandler() {
        this.clearLocal();
        window.location.href = "PlanOptimizer.aspx" + window.location.search;
    }


    printDialog() {
        this.printService.lSdataFormat(this.rootData_v.routeInfos);
        const componentContext = <RoutePrintDialogPreset>{
            routeJson: this.rootData_v,
            printService: this.printService,
            mapService: this.mapService,
            mapRoutingService: this.mappedRoutingForPlanService
        };
        const dialogRef = this.modal

            .open(RoutePrintOptionComponent, overlayConfigFactory(componentContext));
        dialogRef.result.then((result) => {
            if (result) {
                this.observableBusService.loading(true);
                const dialogRef = this.modal
                    .open(RoutePrintForPlanComponent, overlayConfigFactory(result));
            }
        })
    }

    addScheduledEvents(routeInfo: RouteInfo) {
        const _self = this;
        const isChange = this.mappedRoutingForPlanService.checkDataChanged();
        const addEventBySelected = function () {
            addTargetByJavaScript(function () {
                _self.dataService.loadSomePlanJson(routeInfo.id).then(function (result) {
                    var index = _self.repositoryService.getPlanIndexByKey(routeInfo.id);
                    if (index > -1) {
                        _self.globalSettingService.rootJson.routeInfos.splice(index, 1);
                        const rootJson = _self.mappedRoutingForPlanService.buildRootJson(result.json());
                        _self.globalSettingService.rootJson.routeInfos.splice(index, 0, rootJson.routeInfos[0]);
                        let previousRootJson = JSON.parse(JSON.stringify(_self.globalSettingService.rootJson));
                        _self.keepPropertyStatusByPreviousRootJson(previousRootJson);
                        _self.startUp(false);
                    } else {
                        _self.observableBusService.loading(false);
                    }
                });
            }, window.scrollY, "./TableEdit.aspx?Action=Add&TableEdit=Events&TableName=Events&FieldName=PlanID&FieldValue=" + routeInfo.id + "&", true);
        };
        if (isChange) {
            const dialog = this.modal.confirm()
                .className('default')
                .message(PromptedMessage.isSaveChangesMessage)
                .okBtn('Yes')
                .cancelBtn('No').open();
            dialog.result.then((ok) => {
                this.observableBusService.loading(true);
                this.mappedRoutingForPlanService.saveChanges().then(function () {
                    addEventBySelected();
                }, function () {
                    addEventBySelected();
                });
            }, (no) => {
                this.observableBusService.loading(true);
                addEventBySelected();
            });
        } else {
            this.observableBusService.loading(true);
            addEventBySelected();
        }

    }

    deletePlanHandler(LoadSheetId) {
        this.observableBusService.loading(true);
        const _self = this;
        _self.mappedRoutingForPlanService.saveChanges().then(
            () => {
                setTimeout(() => {
                    deleteRouteByJavaScript(LoadSheetId, window.scrollY, function (id) {
                        var index = _self.repositoryService.getPlanIndexByKey(id);
                        if (index > -1) {
                            const deletedPlan = _self.repositoryService.findRouteInfoByKey(id);
                            _self.mapService.clearRoutesOnMap([deletedPlan]);

                            _self.globalSettingService.rootJson.routeInfos.splice(index, 1);
                            _self.globalSettingService.oldRootJson.routeInfos.splice(index, 1);
                            _self.observableBusService.loading(false);
                            _self.observableBusService.markForCheckAllOnPushComponent();
                            //scope.$emit( customEvent.initJsonData, globalSetting.rootJson );
                        } else {
                            _self.observableBusService.loading(false);
                            _self.observableBusService.markForCheckAllOnPushComponent();
                        }
                    }, "TableMerge.aspx?MergeTable=Plans&KeyValue=" + LoadSheetId + "&CurValue=" + LoadSheetId + "&")
                }, 100);
            }, () => {
                console.log('rejected');
                setTimeout(() => {
                    deleteRouteByJavaScript(LoadSheetId, window.scrollY, function (id) {
                        var index = _self.repositoryService.getPlanIndexByKey(id);
                        if (index > -1) {
                            const deletedPlan = _self.repositoryService.findRouteInfoByKey(id);
                            _self.mapService.clearRoutesOnMap([deletedPlan]);

                            _self.globalSettingService.rootJson.routeInfos.splice(index, 1);
                            _self.globalSettingService.oldRootJson.routeInfos.splice(index, 1);
                            _self.observableBusService.loading(false);
                            _self.observableBusService.markForCheckAllOnPushComponent();
                            //scope.$emit( customEvent.initJsonData, globalSetting.rootJson );
                        } else {
                            _self.observableBusService.loading(false);
                            _self.observableBusService.markForCheckAllOnPushComponent();
                        }
                    }, "TableMerge.aspx?MergeTable=Plans&KeyValue=" + LoadSheetId + "&CurValue=" + LoadSheetId + "&")
                }, 100);
            }
        );
    }

    private initViewData() {
        this.globalSettingService.oldRootJson = JSON.parse(JSON.stringify(this.globalSettingService.rootJson));
        this.columnOptionDropDownMenuTemplate = ColumnOptionDropDownMenuTemplate;
        this.rootData_v = this.globalSettingService.rootJson;

        let reSequenceKeyValue: any = _.find(ReSequenceDropDownMenuTemplate.keyValues, r => r.value == this.globalSettingService.rootJson.reSeqSetting);

        if (typeof (reSequenceKeyValue) == 'undefined') {
            reSequenceKeyValue = ReSequenceDropDownMenuTemplate.keyValues[0];
        }
        reSequenceKeyValue.isShow = true;


        // try {
        //     this.globalSettingService.samePlanLoadSheetObjList = this.repositoryService.getSamePlanLoadSheetObj();
        // }catch(e){}

        this.showColumnGroupArray_v = _.chain(this.globalSettingService.rootJson.salesColumnGroupNameFieldValueObjectArray).filter((s: any) => s.value).map((s: FieldValueObject) => <string>s.field).value();
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
        this.mappedRoutingForPlanService.clearSelectedMarkersOnMap();
    }

    setMapCenterCallback() {
        this.mappedRoutingForPlanService.setMapCenterByRouteInfos(this.globalSettingService.rootJson.routeInfos);
    }

    expandOrShrinkAllRouteInfo(isShowAllRouteInfo: boolean) {
        this.globalSettingService.rootJson.routeInfos.forEach(r => {
            r.isSelected = isShowAllRouteInfo;
        });
        this.saveDataInLocalStorage();
        this.observableBusService.markForCheckAllOnPushComponent(this.globalSettingService.rootJson.routeInfos.map(r => r.id))
    }

    showOrHideRouteLineOnMap(isShow: boolean) {
        if (this.isDrawRoutesByManual) {
            if (isShow) {
                this.rootData_v.isDrawRouteline = isShow;
                this.isDrawRoutesByManual = this.globalSettingService.isDrawRoutesByManual = false;
                this.observableBusService.loading(true);
                this.mappedRoutingForPlanService.reCalculateRoutes(this.globalSettingService.rootJson.routeInfos);
            } else {
                this.showOrHideRouteLineOnMapNormal(isShow);
            }
        } else {
            this.showOrHideRouteLineOnMapNormal(isShow);
        }
    }

    showOrHideRouteLineOnMapNormal(isShow) {
        this.globalSettingService.rootJson.isDrawRouteline = isShow;
        this.dataService.saveDirectionsOption(isShow);
        this.mapService.showOrHideAllPolyline(isShow);
        _.forEach((this.globalSettingService.rootJson.routeInfos), (routeInfo) => {
            if (routeInfo.isShowOnMap == false) {
                this.mapService.showOrHideRoute(routeInfo.id, false)
            }
        });
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

        this.mappedRoutingForPlanService.calculateStopSequence(this.dragToIndex, this.dragDropToRouteInfo.stopInfos);

        this.mappedRoutingForPlanService.removeDuplicatesSequence(fromRouteInfo);
        this.mappedRoutingForPlanService.removeDuplicatesSequence(this.dragDropToRouteInfo);

        const reCalculateRoutesArr = fromRouteInfo.id == this.dragDropToRouteInfo.id ? [this.dragDropToRouteInfo] : [fromRouteInfo, this.dragDropToRouteInfo];
        if (this.isMultiWindow) {
            this.saveDataInLocalStorage();
            this.saveIsReDrawRoutesOnMap();
        } else {
            this.mappedRoutingForPlanService.reCalculateRoutes(reCalculateRoutesArr);
        }

        this.dragDropToRouteInfo = null;
        this.dragToIndex = 0;
    }

    dropToRouteInfoCallback(event: any) {
        this.observableBusService.loading(true);

        let dragStopInfo: StopInfo = event.dragStopInfo;
        let toIndex: number = event.toIndex;
        let toRouteInfo: RouteInfo = event.toRouteInfo;
        if (event.isBestFit) {
            toIndex = this.mappedRoutingForPlanService.getBestFitIndex(dragStopInfo, toRouteInfo);
        }

        this.dragDropToRouteInfo = toRouteInfo;
        this.dragToIndex = toIndex;
        this.observableBusService.dropEndReplayMarksState();
    }

    changeRouteInfoSelectStatus() {
        const isAllSelected = !_.some(this.globalSettingService.rootJson.routeInfos, r => !r.isSelected);
        this.globalSettingService.rootJson.isSelectAllRouteInfo = isAllSelected;
        this.saveDataInLocalStorage();
    }

    moveToThisLoadSheet(routeInfo: any) {
        this.observableBusService.loading(true);
        const selectedNodeIDs = this.mapService.getSelectedMarkerNodeIDOnMap();
        let stopInfos = this.repositoryService.findStopInfosBykeys(selectedNodeIDs);
        this.mappedRoutingForPlanService.moveStopsToOtherRoute(routeInfo, routeInfo.stopInfos[routeInfo.stopInfos.length - 1], stopInfos, true)
    }

    changeRouteOnMapStatusCallback(routeInfo: RouteInfo) {
        let routeOnMapState = {id: routeInfo.id, isShowOnMap: routeInfo.isShowOnMap};
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
        this.saveColorInLocalStorageByRouteInfo(this.mappedRoutingForPlanService.buildRouteIdAndColor(routeInfo));
        this.saveDataInLocalStorage();
        this.mappedRoutingForPlanService.changeRouteColorOnMapByRouteInfo(routeInfo);
        // this.timelineService.drawTimeline();
        this.mappedRoutingForPlanService.markForCheckOnPushComponent();
    }

    reSequenceHandler(event: any) {
        this.reSequenceService.reSequenceRouteInfo(event.routeInfo, this.mappedRoutingForPlanService.buildRequestedRouteByRouteInfo(event.routeInfo), event.sequenceType, printComponentView.mappedRoutingForPlan).then((result: any) => {
            if (result.isReSequenceByGoogle) {
                this.mappedRoutingForPlanService.reSetStopInfoSequenceByRequestedRoute(result.routeInfo, result.afterReSequenceData);
            } else {
                this.mappedRoutingForPlanService.reSetStopInfoSequenceByReSequence(result.routeInfo, result.afterReSequenceData);
            }
            if (this.isMultiWindow) {
                this.saveDataInLocalStorage();
                this.saveIsReDrawRoutesOnMap();
            } else {
                this.mappedRoutingForPlanService.reCalculateRoutes([result.routeInfo])
            }
        }, (reSequenceRejectObj: ReSequenceRejectObj) => {

            if (reSequenceRejectObj.message != "") {
                alert(reSequenceRejectObj.message + "    Memo: " + reSequenceRejectObj.rejectFunctionName);
            }
            this.observableBusService.loading(false);
        });
    }

    changeColumn(routeInfo: RouteInfo) {
        this.mappedRoutingForPlanService.buildCustomColumnOptionByRouteInfos([routeInfo]);
        this.observableBusService.markForCheckAllOnPushComponent([routeInfo.id]);
    }

    changeRouteInfoStartTime(routeInfo: any) {
        this.dataService.saveRouteInfoStartTime(routeInfo.id, this.utilService.convertValidTimeNumStr(routeInfo.startTime));
        this.mappedRoutingForPlanService.computeDriveDurationByRouteInfos([routeInfo]);
        // this.timelineService.drawTimeline();
        this.mappedRoutingForPlanService.markForCheckOnPushComponent([routeInfo.id]);
    }

    trackByRouteInfo(index: number, routeInfo: RouteInfo): number {
        return index;
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

                    this.dataService.saveMapPoint(event.route.id, result, event.changePoint == "startMapPointID");

                    this.mappedRoutingForPlanService.reCalculateRoutes(this.rootData_v.routeInfos);
                }
            }
        }, () => {
            return;
        });

    }

    geocodeStop(event: any) {
        const componentContext = <RoutePrintDialogPreset>{
            mapService: this.mapService,
            mapRoutingService: this.mappedRoutingForPlanService,
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
                                    _self.globalSettingService.rootJson = _self.mappedRoutingForPlanService.buildRootJson(initJson.json());
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

    deletePlan(event: any) {
        const stop = event.stop;
        const route = event.route;
        this.observableBusService.loading(true);
        let deleteEventList = [];
        let deleteEventStr = stop.id;
        deleteEventList.push(deleteEventStr);
        const _self = this;
        this.dataService.deleteEvent(deleteEventList).then(function (result) {
            if (result.text() == 'True') {
                _.remove(route.stopInfos, function (s: StopInfo) {
                    return s.id == stop.id;
                });

                var oldRoute = _self.repositoryService.findRouteInfoByKey(route.RouteID, _self.globalSettingService.oldRootJson.routeInfos);
                if (!_.isNull(oldRoute)) {
                    _.remove(route.stopInfos, function (s: StopInfo) {
                        return s.id == stop.id;
                    });
                }
                _self.mappedRoutingForPlanService.reCalculateRoutes([route]);
            } else {
                _self.observableBusService.loading(false);
                alert(PromptedMessage.cannotDeleteReason);
                return;
            }

        });

    }

    beforeunloadHandler($event) {
        if (!this.isbeforeunloadHandler.isbeforeunloadHandler) {
            this.clearLocal();
            return true;
        }
        const result = this.mappedRoutingForPlanService.checkDataChanged();
        if (result) {
            this.clearLocal();
        }
        return !result;
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

    geocodeStopOnMap(event) {
        const routeId = event.routeId;
        const stopId = event.stopId;
        const routeInfo = _.find(this.rootData_v.routeInfos, (routeInfo) => {
            return routeInfo.id == routeId;
        });
        const stopInfo = _.find(routeInfo.stopInfos, (stopInfo) => {
            return stopInfo.id == stopId;
        });
        const componentContext = <RoutePrintDialogPreset>{
            mapService: this.mapService,
            mapRoutingService: this.mappedRoutingForPlanService,
            stopInfo: stopInfo,
            routeInfo: routeInfo
        };
        const dialogRef = this.modal

            .open(RouteExceptgeocodeComponent, overlayConfigFactory(componentContext));
    }

    openOtherWindow(isMulti): void {
        this.globalSettingService.isMultiWindow = this.isMultiWindow = isMulti;
        if (isMulti) {
            this.OpenWindow('MapView', this.window.getNativeWindow().location.href + '#/MapView', this.window.getNativeWindow().screen.availHeight - 60, this.window.getNativeWindow().screen.availWidth - 10);
            let map = <HTMLElement>this.window.getNativeWindow().document.querySelector("#google-map");
            let toolsbar = <HTMLElement>this.window.getNativeWindow().document.querySelector(".toolsbar");
            let markertips = this.window.getNativeWindow().document.querySelector(".markertip");
            map.style.display = 'none';
            toolsbar.style.display = 'none';
            this.saveDataInLocalStorage();
            this.localStorageService.store(this.globalSettingService.routeIdStr + 'mapPoint', this.globalSettingService.MapPointJsonData_Server);
            this.localStorageObserver();
            _.forEach(markertips, (markertip: HTMLElement) => {
                markertip.style.display = 'none';
            })
        } else {
            this.PopupWindow.close();
            this.observableBusService.loading(true);
            this.globalSettingService.rootJson = this.rootData_v;
            this.mappedRoutingForPlanService.main(true);
            let map = <HTMLElement>this.window.getNativeWindow().document.querySelector("#google-map");
            let toolsbar = <HTMLElement>this.window.getNativeWindow().document.querySelector(".toolsbar");
            let markertips = this.window.getNativeWindow().document.querySelector(".markertip");
            map.style.display = '';
            toolsbar.style.display = '';
            _.forEach(markertips, (markertip: HTMLElement) => {
                markertip.style.display = '';
            });
            this.clearLocal();
        }

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

    private checkIsMultiWindow() {

        let nativeStrArr = this.window.getNativeWindow().location.href.split("#");
        if (nativeStrArr.length == 3) {
            this.isMultiWindow = true;
        } else {
            this.isMultiWindow = false;
            // const routeButtons = <HTMLElement>this.window.getNativeWindow().document.querySelector(".routeButtons");
            // const routeTable = <HTMLElement>this.window.getNativeWindow().document.querySelector(".routeTableSummery");
            // routeButtons.style.display = 'none';
            // routeTable.style.display = 'none'
        }
    }

    saveDataInLocalStorage() {
        this.globalSettingService.rootJson = this.rootData_v;
        this.localStorageService.store(this.globalSettingService.routeIdStr + 'rootData', this.rootData_v);
    }

    initMapView(): void {
        const tableGroup = <HTMLElement>this.window.getNativeWindow().document.querySelector(".table-group");
        const routeButtons = <HTMLElement>this.window.getNativeWindow().document.querySelector(".btn-group");
        tableGroup.style.display = 'none';
        routeButtons.style.display = 'none';

    }

    clearLocal(): void {
        if (!this.isMultiWindow) {
            this.localStorageService.clear(this.globalSettingService.routeIdStr + 'rootData');
            this.localStorageService.clear(this.globalSettingService.routeIdStr + 'routeColor');
            this.localStorageService.clear(this.globalSettingService.routeIdStr + 'routeStateInMap');
            this.localStorageService.clear(this.globalSettingService.routeIdStr + 'mapPoint');
            this.localStorageService.clear(this.globalSettingService.routeIdStr + 'isReCalculateRoutes');
            this.localStorageService.clear(this.globalSettingService.routeIdStr + 'clickStopOnStopList');
        }
    }

    transformLocalToMemory(data?) {
        this.globalSettingService.rootJson = this.rootData_v = data ? data : this.localStorageService.retrieve(this.routeIdStr + 'rootData');
        this.observableBusService.markForCheckAllOnPushComponent(this.routeIds);
    }

    ngAfterViewInit(): void {
        const routeInfos = this.window.getNativeWindow().document.getElementsByClassName('routelist-wrapper');
        _.forEach(routeInfos, (routeInfo: HTMLElement) => {
            routeInfo.style.display = 'none';
        })
    }

    saveRouteStateInMapInLSByRouteInfo(routeStateInMap) {
        this.localStorageService.store(this.globalSettingService.routeIdStr + 'routeStateInMap', routeStateInMap);
    }


    saveColorInLocalStorageByRouteInfo(routeInfo){
        this.localStorageService.store(this.globalSettingService.routeIdStr+'routeColor',routeInfo);
    }

    onunloadHandler($event) {
        this.clearLocal();
    }

    clickCustomerInfo(clickedListItem: any) {
        this.saveClickedListItemObj(clickedListItem);
    }

    saveClickedListItemObj(clickedListItemObj) {
        this.localStorageService.store(this.globalSettingService.routeIdStr + 'clickStopOnStopList', clickedListItemObj);
    }

    saveIsReDrawRoutesOnMap() {
        this.localStorageService.store(this.globalSettingService.routeIdStr + 'isReCalculateRoutes', Math.random());
    }

    selectColumns() {
        const componentContext = <RoutePrintDialogPreset>{
            currentTableColumnsDisplayObjs:this.rootData_v.routeInfos[0].customColumns
        };
        const dialogClose = this.modal.open(UserTableColumnDiolgComponent,overlayConfigFactory(componentContext));

        dialogClose.result.then((customColumnStr)=>{
            if(customColumnStr){
                this.globalSettingService.rootJson.showCustomColumnssetting=customColumnStr;
                this.dataService.setCustomColumn(customColumnStr);
                this.mappedRoutingForPlanService.setRouteInfosCustomColumnByFirstRoute();
                this.observableBusService.markForCheckAllOnPushComponent();
            }
        })
    }
}