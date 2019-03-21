import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {RepositoryService} from "../service/repository.service";
import {ColumnOptionDropDownMenuTemplate, Phase, PromptedMessage} from "../shared/constant";
import {PrintService} from "../service/print.service";
import {Modal} from "ngx-modialog/plugins/vex";
import {ObservableBusService} from "../service/observable-bus.service";
import {ReSequenceService} from "../service/re-sequence.service";
import {GlobalSettingService} from "../service/global-setting.service";
import {Http} from "@angular/http";
import {MapService} from "../service/mapService/map.service";
import {Observable} from "../../../node_modules/rxjs";
import {RoutePlannerService} from "./route-planner.service";
import {OptimizeRouteDialogComponent} from "../component/optimizeRoute/optimize-route.dialog.component";
import {overlayConfigFactory} from "ngx-modialog";
import {RoutePrintDialogPreset} from "../shared/route-common.dialog.component.context";
import {SelectRoutesComponent} from "../component/selectRoutes/select-routes.component";
import * as _ from "lodash";
import {ReSequenceDropDownMenuTemplate, PhaseType} from "../shared/constant";
import {FieldValueObject} from "../shared/field-value-object.model";
import {RouteInfo} from "../shared/route-info.model";
import {RouteExceptgeocodeComponent} from "../component/routeExceptgeocode/route-exceptgeocode";
import {RouteChoosePointComponent} from "../component/routeChoosePiont/route-choose-point.dialog.component";
import {ChangeActivityDialogComponent} from "../component/changeActivity/change-activity.dialog.component";
import {ChangePhaseDialogComponent} from "../component/changePhase/change-phase.dialog.component";
import {StopInfo} from "../shared/stop-info.model";
import {ReSequenceRejectObj} from "../shared/re-sequence-reject.model";
import {RoutePrintOptionComponent} from "../component/routePrint/route-print-option.dialog.component";
import {RoutePrintSummaryComponent} from "../component/routePrint/route-print-summary.dialog.component";
import {AddRouteDialogComponent} from "../component/addRoute/add-route.dialog.component";
import {RoutePrintRoutePlanner} from "../component/routePrint/route-print-route-planner";
import {DataRoutePlannerService} from "../service/data-route-planner.service";
import {UtilService} from "../service/util.service";
import {WindowRef} from "../service/windowRef.service";
import {LocalStorageService} from "@rars/ngx-webstorage";
import {CustomColumn} from "../shared/custom-column.model";
import {RequestedRoute} from "../service/mapService/requested-routes.model";
import {UserTableColumnDiolgComponent} from "../component/userTableColumnDiolg/user-table-column-diolg.component";

@Component({
    templateUrl: './route-planner.component.html',
    providers: []
})
export class RoutePlannerComponent implements OnInit, AfterViewInit {
    public linearUnitOfMeasure_v: string;
    public arrayActivity: any = {};
    public rootData_v: any = {};
    public deliverymanList_v: any = {};
    public isDrawRoutesByManual: boolean;
    public showColumnGroupArray_v: Array<any>;
    public columnOptionDropDownMenuTemplate = ColumnOptionDropDownMenuTemplate;

    private dragDropToRouteInfo: RouteInfo;
    private dragToIndex: number;
    private routeIds = [];
    private routeIdStr = {routeStr:""};
    private isMultiWindow: boolean;
    private PopupWindow = null;
    public currrentPhase;
    public routePlannerTableData;

    constructor(public http: Http,
                public routePlanner: RoutePlannerService,
                public mapService: MapService,
                public printService: PrintService,
                public observableBusService: ObservableBusService,
                public reSequenceService: ReSequenceService,
                public globalSettingService: GlobalSettingService,
                public dataService: DataRoutePlannerService,
                public utilService: UtilService,
                public localStorageService: LocalStorageService,
                public modal: Modal,
                public window: WindowRef,
                public repositoryService: RepositoryService,) {
        this.routeIdStr.routeStr = this.dataService.requestObj(this.window.getNativeWindow().location.search).RoutesIDRouteVersionIDStr + 'routePlanner';
        this.globalSettingService.routeIdStr = this.routeIdStr.routeStr;
    }

    localStorageObserver(){
        this.localStorageService.observe(this.routeIdStr.routeStr + 'rootData').subscribe((data) => {
            if (data) {
                this.transformLocalToMemory(data);
                this.showColumnGroupArray_v = _.chain(this.globalSettingService.rootJson.salesColumnGroupNameFieldValueObjectArray).filter((s: any) => s.value).map((s: FieldValueObject) => <string>s.field).value();
            }
        });
        this.localStorageService.observe(this.routeIdStr.routeStr + 'routeColor').subscribe((routeIdAndColor) => {
            if (routeIdAndColor) {
                this.routePlanner.changeRouteColorOnMapByRouteIdAndColor(routeIdAndColor);
                this.routePlanner.markForCheckOnPushComponent();
            }
        });
        this.localStorageService.observe(this.routeIdStr.routeStr + 'routeStateInMap').subscribe((routeInfo) => {
            if (routeInfo) {
                if (this.globalSettingService.rootJson.isDrawRouteline) {
                    if(_.isArray(routeInfo)){
                        _.forEach(routeInfo,(item)=>{
                            this.mapService.showOrHideRoute(item.id, item.isShowOnMap);
                        })
                    }else {
                        this.mapService.showOrHideRoute(routeInfo.id, routeInfo.isShowOnMap);
                    }
                } else {
                    if(_.isArray(routeInfo)){
                        _.forEach(routeInfo,(item)=>{
                            this.mapService.showOrHideRoute(item.id, item.isShowOnMap);
                            this.mapService.showOrHidePolylineByRequestedRouteID(item.id, this.globalSettingService.rootJson.isDrawRouteline);
                        })
                    }else {
                        this.mapService.showOrHideRoute(routeInfo.id, routeInfo.isShowOnMap);
                        this.mapService.showOrHidePolylineByRequestedRouteID(routeInfo.id, this.globalSettingService.rootJson.isDrawRouteline);
                    }

                }
            }
        });
        this.localStorageService.observe(this.routeIdStr.routeStr + "clickStopOnStopList").subscribe((stopInfoClickObj) => {
            // this.repositoryService.findStopInfosBykeys([stopInfoClickObj.stopInfoId]);
            this.observableBusService.setMarkerSizeAndZindex(stopInfoClickObj);

        });
        this.localStorageService.observe(this.routeIdStr.routeStr + 'clearRouteOnMap').subscribe((reqRouteList)=>{
            this.mapService.clearRoutesOnMap(reqRouteList);
            this.routeIdStr.routeStr = reqRouteList[0].observerId;
            this.localStorageObserver();
        });
        this.localStorageService.observe(this.routeIdStr.routeStr + 'selectRouteOnMap').subscribe((observerId)=>{
            this.routePlanner.reCalculateRoutes(this.rootData_v.routeInfos);
            this.routeIdStr.routeStr = observerId;
            this.localStorageObserver();
        });
        this.localStorageService.observe(this.routeIdStr.routeStr + "isReDrawRoutesOnMap").subscribe((isReDrawRoutesOnMap) => {
            if(isReDrawRoutesOnMap){
                this.observableBusService.loading(true);
                this.routePlanner.reCalculateRoutes(this.rootData_v.routeInfos);
            }
        });
    }

    ngOnInit(): void {
        this.observableBusService.loading(true);
        this.linearUnitOfMeasure_v = linearUnitOfMeasure;
        this.routePlanner.initMapRelated();
        this.checkIsMultiWindow();
        if (this.isMultiWindow) {
            this.localStorageObserver();
            this.initMapView();
            this.globalSettingService.rootJson = this.localStorageService.retrieve(this.routeIdStr.routeStr+'rootData');
            this.rootData_v = this.globalSettingService.rootJson;
            this.globalSettingService.MapPointJsonData_Server = this.localStorageService.retrieve(this.routeIdStr.routeStr + 'mapPoint');
            if (linearUnitOfMeasure == '2') {
                this.globalSettingService.MilesConversionConstant = 1000;
            }
            this.isDrawRoutesByManual = this.routePlanner.checkDrawRoutesByManual();
            if (this.isDrawRoutesByManual) {
                this.globalSettingService.isDrawRoutesByManual = true;
                alert(PromptedMessage.moreThan500StopMessage);
            }
            this.initViewData();
            this.routePlanner.main(true);
        } else {
            Observable.forkJoin(this.dataService.loadInitialJson(), this.dataService.loadMapPointData(), this.dataService.loadRouteJson(),
                this.dataService.loadActivityJson())
                .subscribe((response) => {
                    if (response[0].text() == "") {
                        this.observableBusService.loading(false);
                        return;
                    }

                    this.globalSettingService.rootJson = this.routePlanner.buildRootJson(response[0].json());
                    this.globalSettingService.MapPointJsonData_Server = response[1].json();
                    this.globalSettingService.Route_Server = response[2].json().Routes;
                    this.globalSettingService.Activity_Server = response[3].json().ActivityJson;
                    this.currrentPhase = this.globalSettingService.rootJson.currentShowPhase;
                    this.arrayActivity = this.globalSettingService.Activity_Server;
                    if (linearUnitOfMeasure == '2') {
                        this.globalSettingService.MilesConversionConstant = 1000;
                    }
                    _.forEach(this.globalSettingService.rootJson.routeInfos, (routeInfo) => {
                        this.routeIds.push(routeInfo.id);
                    });
                    this.isDrawRoutesByManual = this.routePlanner.checkDrawRoutesByManual();
                    if (this.isDrawRoutesByManual) {
                        this.globalSettingService.isDrawRoutesByManual = true;
                        alert(PromptedMessage.moreThan500StopMessage);
                    }
                    this.startUp();
                });
        }


    }

    private startUp(isSetMapCenter?: boolean) {
        this.initViewData();
        this.routePlanner.main(isSetMapCenter);
    }

    private initViewData() {
        this.globalSettingService.oldRootJson = JSON.parse(JSON.stringify(this.globalSettingService.rootJson));
        this.rootData_v = this.globalSettingService.rootJson;
        this.arrayActivity = this.globalSettingService.Activity_Server ? this.globalSettingService.Activity_Server : [];
        this.deliverymanList_v = this.globalSettingService.DeliverymanList_Server ? this.routePlanner.buildDeliveryman(this.globalSettingService.DeliverymanList_Server) : [];
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
        this.columnOptionDropDownMenuTemplate = this.initDropDownMenuTemplate(ColumnOptionDropDownMenuTemplate);
        this.buildTableData(this.rootData_v.routeInfos);
    }


    initRoutePlanner(event: any) {
        if (_.isArray) {
            event.forEach((eleRef) => {
                eleRef.nativeElement.style.display = '';
            });
        } else {
            event.nativeElement.style.display = '';
        }
    }

    selectRoutes() {
        const componentContext = <RoutePrintDialogPreset>{
            routeInfos: this.globalSettingService.rootJson.routeInfos,
            allRoute: this.globalSettingService.Route_Server
        };
        let _self = this;
        const dialogRef = this.modal
            .open(SelectRoutesComponent, overlayConfigFactory(componentContext));
        dialogRef.result.then((result) => {
            if (result) {
                this.observableBusService.loading(true);
                let loadSomeRouteJsonBySelected = function () {
                    _self.dataService.loadSomeRouteJson(result).then(function (result) {
                        //clear marker and polyline
                        if (!_self.globalSettingService.rootJson.routeInfos) {
                            _self.globalSettingService.rootJson.routeInfos = [];
                        }
                        let OneRouteRouteJson = _self.routePlanner.buildRootJson(result.json());
                        _self.globalSettingService.rootJson.routeInfos.push(OneRouteRouteJson.routeInfos[0]);
                        _self.routePlanner.updateStopsAndHideStopsByRouteListByChangePhase(_self.globalSettingService.rootJson.routeInfos,'All');
                        _self.startUp(true);
                        _self.globalSettingService.rootJson.currentShowPhase = PhaseType.all;
                        _self.currrentPhase = { text: "All",value:"All" };
                        let routeVersionId = '';
                        if (_self.globalSettingService.rootJson.routeInfos) {
                            _.forEach(_self.globalSettingService.rootJson.routeInfos, (routeInfo) => {
                                routeVersionId = routeVersionId + routeInfo.id + "^" + routeInfo.routeVersionID + "|"
                            });
                        }
                        let urlObj = _self.dataService.requestObj();
                        urlObj.RoutesIDRouteVersionIDStr = routeVersionId;
                        history.replaceState("afterDelete", null, "RoutePlannerTool.aspx?" + _self.dataService.toUrlSearch(urlObj) + "#/routePlanner");
                        _self.saveAfterSelectData(routeVersionId);
                        _self.afterAddDeleteRouteLocalStorageChange(routeVersionId);
                    });
                };
                this.routePlanner.saveChange(this.globalSettingService.rootJson).then(function () {
                    loadSomeRouteJsonBySelected();
                }, function () {
                    loadSomeRouteJsonBySelected();
                });
            }

        });

    }

    trackByRouteInfo(index: number, routeInfo: RouteInfo): number {
        return index;
    }

    private initDropDownMenuTemplate(ColumnOptionDropDownMenuTemplate: any) {
        ColumnOptionDropDownMenuTemplate.menuText = "Distance";
        if (ColumnOptionDropDownMenuTemplate.keyValues.length > 2) {
            ColumnOptionDropDownMenuTemplate.keyValues.pop();
            ColumnOptionDropDownMenuTemplate.keyValues.pop();
        }
        return ColumnOptionDropDownMenuTemplate;
    }

    deselectRoute() {
        const _self = this;

        let deleteRouteList = _.remove(this.globalSettingService.rootJson.routeInfos, function (routeInfo) {
            return routeInfo.isSelected == true;
        });
        if (_self.globalSettingService.rootJson.routeInfos.length == 0) {
            _self.globalSettingService.rootJson.routeInfos = null;
        }
        let routeVersionId = '';
        if (this.globalSettingService.rootJson.routeInfos) {
            _.forEach(this.globalSettingService.rootJson.routeInfos, (routeInfo) => {
                routeVersionId = routeVersionId + routeInfo.id + "^" + routeInfo.routeVersionID + "|"
            });
        }
        let urlObj = this.dataService.requestObj();
        urlObj.RoutesIDRouteVersionIDStr = routeVersionId;
        history.replaceState("afterDelete", null, "RoutePlannerTool.aspx?" + this.dataService.toUrlSearch(urlObj) + "#/routePlanner");
        if (_self.globalSettingService.rootJson.routeInfos) {
            this.routePlanner.buildCustomColumn(_self.globalSettingService.rootJson.routeInfos);
        }
        this.observableBusService.markForCheckRouteTableSummaryComponent();
        let reqRouteList = this.routePlanner.buildRequestedRoutesByRouteInfos(deleteRouteList);
        this.mapService.clearRoutesOnMap(reqRouteList);
        let reRouteList = this.buildDeleteRouteList(routeVersionId,reqRouteList);
        if(this.isMultiWindow){
            this.localStorageService.store(this.routeIdStr.routeStr + 'clearRouteOnMap',reRouteList);
            this.afterAddDeleteRouteLocalStorageChange(routeVersionId);
        }

    }

    afterAddDeleteRouteLocalStorageChange(newRouteId){
        this.localStorageService.clear(this.routeIdStr.routeStr+"rootData");
        this.localStorageService.clear(this.routeIdStr.routeStr+"mapPoint");
        this.routeIdStr.routeStr = newRouteId+"routePlanner";
        this.localStorageObserver();
        this.saveDataInLocalStorage();
        this.saveMapPointJsonData();
    }

    addRoute() {
        const _self = this;
        const isChange = this.routePlanner.checkDataChanged();
        let addSomeRouteBySelected = function () {
            addTargetByJavaScript(function (routeId) {
                if (!_.isUndefined(routeId) && !_.isNull(routeId)) {
                    Observable.forkJoin(_self.dataService.loadSomeRouteJson(routeId), _self.dataService.loadRouteJson()).subscribe((result) => {
                        _self.globalSettingService.Route_Server = result[1].json().Routes;
                        let routeInfo = _self.routePlanner.buildRootJson(result[0].json()).routeInfos[0];
                        _self.globalSettingService.rootJson.routeInfos.push(routeInfo);
                        _self.routePlanner.main();
                    });
                } else {
                    _self.observableBusService.loading(false);
                }
            }, window.scrollY);
        };
        if (isChange) {
            const dialog = this.modal.confirm()
                .className('default')
                .message(PromptedMessage.isSaveChangesMessage)
                .okBtn('Yes')
                .cancelBtn('No').open();
            dialog.result.then((ok) => {
                this.observableBusService.loading(true);
                this.routePlanner.saveChange(this.globalSettingService.rootJson).then(function () {
                    addSomeRouteBySelected();
                }, function () {
                    addSomeRouteBySelected();
                });
            }, (no) => {
                this.observableBusService.loading(true);
                addSomeRouteBySelected();
            });
        } else {
            this.observableBusService.loading(true);
            addSomeRouteBySelected();
        }

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
        this.routePlanner.clearSelectedMarkersOnMap();
    }

    setMapCenterCallback() {
        this.routePlanner.setMapCenterByRouteInfos(this.globalSettingService.rootJson.routeInfos);
    }

    expandOrShrinkAllRouteInfo(isShowAllRouteInfo: boolean) {
        this.globalSettingService.rootJson.routeInfos.forEach(r => {
            r.isSelected = isShowAllRouteInfo;
        });
        this.saveDataInLocalStorage();
        this.observableBusService.markForCheckAllOnPushComponent(this.globalSettingService.rootJson.routeInfos.map(r => r.id))
    }

    changeSalesColumnGroupNameFieldValueObjectArray(field: string) {
        let columnFieldValueObj = this.rootData_v.salesColumnGroupNameFieldValueObjectArray.find(s => s.field == field);
        columnFieldValueObj.value = !columnFieldValueObj.value;
        this.showColumnGroupArray_v = _.chain(this.rootData_v.salesColumnGroupNameFieldValueObjectArray).filter((s: any) => s.value).map((s: any) => s.field).value();
        this.observableBusService.markForCheckAllOnPushComponent(this.globalSettingService.rootJson.routeInfos.map(r => r.id));
        this.saveDataInLocalStorage();
    }

    showOrHideRouteLineOnMap(isShow: boolean) {
        if (this.isDrawRoutesByManual) {
            if (isShow) {
                this.rootData_v.isDrawRouteline = isShow;
                this.isDrawRoutesByManual = this.globalSettingService.isDrawRoutesByManual = false;
                this.observableBusService.loading(true);
                this.routePlanner.reCalculateRoutes(this.globalSettingService.rootJson.routeInfos);
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

    deleteRoute(routeId: any) {
        this.observableBusService.loading(true);
        const self = this;
        deleteRouteByJavaScript(routeId, window.scrollY, function (id) {
            if (!_.isUndefined(id) && !_.isNull(id)) {
                var index = self.repositoryService.getRouteIndexByKey(id);

                if (index > -1) {
                    var deletedRoute = self.repositoryService.getRouteByKey(id);
                    self.mapService.clearRoutesOnMap([deletedRoute]);
                    self.globalSettingService.rootJson.routeInfos.splice(index, 1);
                    self.globalSettingService.oldRootJson.routeInfos.splice(index, 1);

                    self.dataService.loadRouteJson().then(function (r) {
                        self.globalSettingService.Route_Server = r.json().Routes;
                        self.observableBusService.loading(false)
                    });
                    self.routePlanner.markForCheckOnPushComponent();
                } else {
                    self.observableBusService.loading(false);
                }
            } else {
                self.observableBusService.loading(false);
            }
        });
    }

    changeRouteOnMapStatus(routeInfos: any) {

        let routeInfosState = [];
        _.forEach(routeInfos, (routeInfo) => {
            let routeOnMapState = {id: routeInfo.id, isShowOnMap: routeInfo.isShowOnMap};
            routeInfosState.push(routeOnMapState);
            if (this.globalSettingService.rootJson.isDrawRouteline) {
                this.mapService.showOrHideRoute(routeInfo.id, routeInfo.isShowOnMap);
            } else {
                this.mapService.showOrHideRoute(routeInfo.id, routeInfo.isShowOnMap);
                this.mapService.showOrHidePolylineByRequestedRouteID(routeInfo.id, this.globalSettingService.rootJson.isDrawRouteline);
            }

        });

        this.saveRouteStateInMapInLSByRouteInfo(routeInfosState);
        this.saveDataInLocalStorage();
    }

    addScheduleEvent(route: RouteInfo) {
        const componentContext = <RoutePrintDialogPreset>{
            dataService: this.dataService
        };
        const self = this;
        const dialogRef = this.modal

            .open(AddRouteDialogComponent, overlayConfigFactory(componentContext));
        dialogRef.result.then((customerInfo) => {
            if (customerInfo) {
                this.observableBusService.loading(true);
                let addCustomerBySelected = () => {
                    let requestInfo = route.id + "^" + customerInfo.CustomerID;
                    this.dataService.addScheduledStop(requestInfo).then(function (result) {
                        self.dataService.loadSomeRouteJson(route.id).then(function (result) {
                            var index = self.repositoryService.getRouteIndexByKey(route.id);
                            if (index > -1) {
                                self.globalSettingService.rootJson.routeInfos.splice(index, 1);
                                let routeInfo = self.routePlanner.buildRootJson(result.json()).routeInfos[0];
                                self.globalSettingService.rootJson.routeInfos.splice(index, 0, routeInfo);
                                self.startUp();
                            } else {
                                this.observableBusService.loading(false);
                            }

                        });
                    })
                };
                self.routePlanner.saveChange(self.globalSettingService.rootJson).then(function () {
                    addCustomerBySelected();
                }, function () {
                    addCustomerBySelected();
                });
            }
        });
    }

    editRoute(routeId: any) {
        const _self = this;
        const isChange = this.routePlanner.checkDataChanged();
        let editRouteBySelected = function () {
            editRouteByJavaScript(routeId, window.scrollY, function (id) {
                if (!_.isUndefined(id) && !_.isNull(id)) {
                    _self.dataService.loadSomeRouteJson(routeId).then(function (result) {
                        let changedRoute = result.json() != "" && _self.routePlanner.buildRootJson(result.json()).routeInfos[0];
                        if (!_.isUndefined(changedRoute)) {
                            let index = _self.repositoryService.findRouteInfoIndexByKey(id);
                            if (Number(index) > -1) {
                                _self.globalSettingService.rootJson.routeInfos.splice(index, 1);
                                _self.globalSettingService.rootJson.routeInfos.splice(index, 0, changedRoute);
                                _self.startUp();
                            } else {
                                _self.observableBusService.loading(false);
                            }
                        } else {
                            _self.observableBusService.loading(false);
                        }
                    });
                } else {
                    _self.observableBusService.loading(false);
                }
            });
        };
        if (isChange) {
            const dialog = this.modal.confirm()
                .className('default')
                .message(PromptedMessage.isSaveChangesMessage)
                .okBtn('Yes')
                .cancelBtn('No').open();
            dialog.result.then((ok) => {
                this.observableBusService.loading(true);
                this.routePlanner.saveChange(this.globalSettingService.rootJson).then(function () {
                    editRouteBySelected();
                }, function () {
                    editRouteBySelected();
                });
            }, (no) => {
                this.observableBusService.loading(true);
                editRouteBySelected();
            });
        } else {
            this.observableBusService.loading(true);
            editRouteBySelected();
        }
    }

    changeRouteColorHandler(routeInfo) {
        this.saveColorInLocalStorageByRouteInfo(this.routePlanner.buildRouteIdAndColor(routeInfo));
        this.saveDataInLocalStorage();
        this.routePlanner.changeRouteColorOnMapByRouteInfo(routeInfo);
        this.routePlanner.markForCheckOnPushComponent();
    }

    setThisRouteCenter(route: RouteInfo) {
        this.mapService.setMapCenter(this.routePlanner.buildRequestedRoutesByRouteInfos([route]));
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
            mapRoutingService: this.routePlanner,
            stopInfo: stopInfo,
            routeInfo: routeInfo
        };
        const dialogRef = this.modal

            .open(RouteExceptgeocodeComponent, overlayConfigFactory(componentContext));
    }

    geocodeStop(event: any) {
        const componentContext = <RoutePrintDialogPreset>{
            mapService: this.mapService,
            mapRoutingService: this.routePlanner,
            stopInfo: event.stop,
            routeInfo: event.route
        };
        const dialogRef = this.modal

            .open(RouteExceptgeocodeComponent, overlayConfigFactory(componentContext));
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

                    this.dataService.saveMapPoint(event.route.routeID, result, event.changePoint == "startMapPointID");

                    this.routePlanner.reCalculateRoutes(this.rootData_v.routeInfos);
                }
            }
        }, () => {
            return;
        });

    }

    deleteEvent(event) {
        let stop = event["stop"];
        let route = event["route"];
        this.observableBusService.loading(true);
        let deleteStopStr = stop.id + "^";
        this.deleteAllProducts(deleteStopStr, stop, route);
    }

    private deleteAllProducts(deleteStopStr: string, stop: StopInfo, route: RouteInfo) {
        let self = this;
        this.dataService.deleteStop(deleteStopStr).then(function () {
            _.remove(route.stopInfos, function (s) {
                return s.id == stop.id;
            });

            let oldRoute = self.repositoryService.getRouteByKey(route.id, self.globalSettingService.oldRootJson.routeInfos);
            if (!_.isNull(oldRoute)) {
                _.remove(route.stopInfos, function (s) {
                    return s.id == stop.id;
                });
            }
            self.routePlanner.reCalculateRoutes([route]);
        });
    }


    moveToThisLoadSheet(routeInfo: any) {
        this.observableBusService.loading(true);
        const selectedNodeIDs = this.mapService.getSelectedMarkerNodeIDOnMap();
        let stopInfos = this.repositoryService.findStopInfosBykeys(selectedNodeIDs);
        this.routePlanner.moveStopsToOtherRoute(routeInfo, routeInfo.stopInfos[routeInfo.stopInfos.length - 1], stopInfos, true)
        this.observableBusService.showToLoadSheetRouteName(false);
    }

    changeActivity(evet: StopInfo) {
        const componentContext = <RoutePrintDialogPreset>{
            stopInfo: evet,
            activityList: this.globalSettingService.Activity_Server
        };
        const dialogRef = this.modal

            .open(ChangeActivityDialogComponent, overlayConfigFactory(componentContext));
        dialogRef.result.then((result) => {
            if (result) {
                evet.activity = result;
                this.observableBusService.markForCheckRouteInfoComponent([evet.oldRouteInfoID]);
            }
        });
    }

    changePhase(event: any) {
        let stopInfo = event["stop"];
        let routeInfo = event["route"]
        const componentContext = <RoutePrintDialogPreset>{
            stopInfo: event["stop"],
        };
        const dialogRef = this.modal

            .open(ChangePhaseDialogComponent, overlayConfigFactory(componentContext));
        dialogRef.result.then((result) => {
            if (result) {
                if (stopInfo.phase != result) {
                    this.observableBusService.loading(true);
                    let oldStopPerWeekPerRoute = this.routePlanner.computeStopPerWeekOnSingleRoute(routeInfo, stopInfo);
                    stopInfo.phase = result;
                    let newStopPerWeekPerRoute = this.routePlanner.computeStopPerWeekOnSingleRoute(routeInfo, stopInfo);
                    stopInfo.stopsPerWeek = Number(stopInfo.stopsPerWeek) - oldStopPerWeekPerRoute + newStopPerWeekPerRoute;
                    this.routePlanner.changeSameCustomerStopPerWeek(stopInfo);
                    this.routePlanner.changeSameCustomerNumUnitsList(stopInfo);
                    this.routePlanner.updateDataAfterChangePhase(this.globalSettingService.rootJson.routeInfos, this.globalSettingService.rootJson.currentShowPhase.value);
                    this.observableBusService.markForCheckRouteInfoComponent([stopInfo.oldRouteInfoID]);
                    this.observableBusService.markForCheckRouteTableSummaryComponent();
                }
            }
        });
    }

    changePhaseByPanel(phase: Phase) {
        if (!_.isUndefined(phase) && !_.isNull(phase)) {
            this.globalSettingService.rootJson.currentShowPhase = phase;
        }
        this.routePlanner.updateDataAfterChangePhase(this.globalSettingService.rootJson.routeInfos, phase.value);
    }

    print() {
        const _self = this;
        const componentContext = <RoutePrintDialogPreset>{
            routeJson: _self.rootData_v,
            printService: _self.printService,
            mapService: _self.mapService,
            mapRoutingService: _self.routePlanner,
        };
        const dialogRef = _self.modal

            .open(RoutePrintOptionComponent, overlayConfigFactory(componentContext));
        dialogRef.result.then((result) => {
            if (result) {
                this.observableBusService.loading(true);
                const dialogRefForPlan = this.modal
                    .open(RoutePrintRoutePlanner, overlayConfigFactory(result))
            }
        })

    }

    printSummary() {
        const componentContext = <RoutePrintDialogPreset>{routeJson: this.rootData_v, printService: this.printService};
        const dialogRef = this.modal

            .open(RoutePrintSummaryComponent, overlayConfigFactory(componentContext));
    }

    moveFromRouteInfoCallback(event: any) {
        let dragStopInfo: StopInfo = event.dragStopInfo;
        let fromRouteInfo: RouteInfo = event.fromRouteInfo;
        if (_.isNull(this.dragToIndex)) {
            this.observableBusService.loading(false);
            alert('Move is not allowed between different');
            return;
        }
        const fromIndex = fromRouteInfo.stopInfos.indexOf(dragStopInfo);

        if (fromRouteInfo.id == this.dragDropToRouteInfo.id && this.dragToIndex > fromIndex) {
            this.dragToIndex = this.dragToIndex - 1 < 0 ? 0 : this.dragToIndex - 1;
        }

        if (fromRouteInfo.id == this.dragDropToRouteInfo.id) {
            fromRouteInfo.stopInfos.splice(fromIndex, 1);
            this.dragDropToRouteInfo.stopInfos.splice(this.dragToIndex, 0, dragStopInfo);
        } else {
            let currentStopsPerWeek = dragStopInfo.stopsPerWeek;
            let oldFromStopsPerWeekOnRoute = this.routePlanner.computeStopPerWeekOnSingleRoute(fromRouteInfo, dragStopInfo);
            let oldToStopsPerWeekOnRoute = this.routePlanner.computeStopPerWeekOnSingleRoute(this.dragDropToRouteInfo, dragStopInfo);
            let extraStopsPerWeek = currentStopsPerWeek - (oldFromStopsPerWeekOnRoute + oldToStopsPerWeekOnRoute);

            fromRouteInfo.stopInfos.splice(fromIndex, 1);
            this.dragDropToRouteInfo.stopInfos.splice(this.dragToIndex, 0, dragStopInfo);

            let newFromStopsPerWeekOnRoute = this.routePlanner.computeStopPerWeekOnSingleRoute(fromRouteInfo, dragStopInfo);
            let newToStopsPerWeekOnRoute = this.routePlanner.computeStopPerWeekOnSingleRoute(this.dragDropToRouteInfo, dragStopInfo);

            dragStopInfo.stopsPerWeek = newFromStopsPerWeekOnRoute + newToStopsPerWeekOnRoute + extraStopsPerWeek;
            this.routePlanner.changeSameCustomerStopPerWeek(dragStopInfo);
        }


        //todo MAY BE DELETE
        this.routePlanner.calculateStopSequence(this.dragToIndex, this.dragDropToRouteInfo.stopInfos);
        this.routePlanner.removeDuplicatesSequence(fromRouteInfo);
        this.routePlanner.removeDuplicatesSequence(this.dragDropToRouteInfo);

        const reCalculateRoutesArr = fromRouteInfo.id == this.dragDropToRouteInfo.id ? [this.dragDropToRouteInfo] : [fromRouteInfo, this.dragDropToRouteInfo];
        if(this.isMultiWindow){
            this.saveDataInLocalStorage();
            this.saveIsReDrawRoutesOnMap();
        }else {
            this.routePlanner.reCalculateRoutes(reCalculateRoutesArr);
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
            toIndex = this.routePlanner.getBestFitIndex(dragStopInfo, toRouteInfo);
        }

        this.dragDropToRouteInfo = toRouteInfo;

        if (this.repositoryService.findRouteInfoByStopInfoKey(dragStopInfo.id).routeVersionID != toRouteInfo.routeVersionID) {
            this.dragToIndex = null;
        } else {
            this.dragToIndex = toIndex;
        }
        this.observableBusService.dropEndReplayMarksState();
    }

    reSequenceHandler(event: any) {
        this.reSequenceService.reSequenceRouteInfo(event.routeInfo, this.routePlanner.buildRequestedRouteByRouteInfo(event.routeInfo), event.sequenceType).then((result: any) => {
            if (result.isReSequenceByGoogle) {
                this.routePlanner.reSetStopInfoSequenceByRequestedRoute(result.routeInfo, result.afterReSequenceData);
            } else {
                this.routePlanner.reSetStopInfoSequenceByReSequence(result.routeInfo, result.afterReSequenceData);
            }
            if (this.isMultiWindow) {
                this.saveDataInLocalStorage();
                this.saveIsReDrawRoutesOnMap();
            } else {
                this.routePlanner.reCalculateRoutes([result.routeInfo]);
            }
        }, (reSequenceRejectObj: ReSequenceRejectObj) => {
            if (reSequenceRejectObj.message != "") {
                alert(reSequenceRejectObj.message + "    Memo: " + reSequenceRejectObj.rejectFunctionName);
            }

            this.observableBusService.loading(false);
        });
    }

    changeColumn(routeInfo) {
        this.routePlanner.buildCustomColumnOptionByRouteInfos([routeInfo]);
        this.observableBusService.markForCheckAllOnPushComponent([routeInfo.id]);
    }

    openOptimizeRoute() {
        const componentContext = <RoutePrintDialogPreset>{rootJson: this.globalSettingService.rootJson};
        const dialogRef = this.modal
            .open(OptimizeRouteDialogComponent, overlayConfigFactory(componentContext));
        dialogRef.result.then((userInput) => {
            if (userInput) {
                const fromRouteInfos = userInput["fromRouteInfos"];
                const toRouteInfos = userInput["toRouteInfos"];

                const selectedReSequence = userInput["selectedReSequence"];
                this.routePlanner.optimizeRouteInfo(fromRouteInfos, toRouteInfos, selectedReSequence);
            }
        });
    }

    saveChanges() {
        this.observableBusService.loading(true);
        this.routePlanner.saveChange(this.globalSettingService.rootJson).then((reDrawRouteList: Array<RouteInfo>) => {
            if (reDrawRouteList.length > 0) {
                this.routePlanner.reCalculateRoutes(reDrawRouteList);
            } else {
                this.observableBusService.loading(false);
            }
        }, () => {
            this.observableBusService.loading(false);
        })
    }

    changeRouteInfoStartTime(routeInfo: any) {
        this.dataService.saveRouteInfoStartTime(routeInfo.id, this.utilService.convertValidTimeNumStr(routeInfo.startTime));
        this.routePlanner.computeDriveDurationByRouteInfos([routeInfo]);
        // this.timelineService.drawTimeline();
        this.routePlanner.markForCheckOnPushComponent([routeInfo.id]);
    }

    private checkIsMultiWindow() {

        let nativeStrArr = this.window.getNativeWindow().location.href.split("#");
        if (nativeStrArr.length == 2) {
            this.isMultiWindow = false;
        } else {
            this.isMultiWindow = true;
            // const routeButtons = <HTMLElement>this.window.getNativeWindow().document.querySelector(".routeButtons");
            // const routeTable = <HTMLElement>this.window.getNativeWindow().document.querySelector(".routeTableSummery");
            // routeButtons.style.display = 'none';
            // routeTable.style.display = 'none'
        }
    }

    saveDataInLocalStorage() {
        this.localStorageService.store(this.routeIdStr.routeStr + 'rootData', this.rootData_v);
    }

    saveMapPointJsonData(){
        this.localStorageService.store(this.routeIdStr.routeStr+ 'mapPoint', this.globalSettingService.MapPointJsonData_Server);
    }

    saveColorInLocalStorageByRouteInfo(routeInfo) {
        this.localStorageService.store(this.routeIdStr.routeStr + 'routeColor', routeInfo);
    }

    saveRouteStateInMapInLSByRouteInfo(routeStateInMap) {
        this.localStorageService.store(this.routeIdStr.routeStr + 'routeStateInMap', routeStateInMap);
    }

    saveClickedListItemObj(clickedListItemObj) {
        this.localStorageService.store(this.routeIdStr.routeStr + 'clickStopOnStopList', clickedListItemObj);
    }

    saveAfterSelectData(routeId){
        this.localStorageService.store(this.routeIdStr.routeStr + 'selectRouteOnMap', routeId);
    }

    transformLocalToMemory(data?) {
        this.globalSettingService.rootJson = this.rootData_v = data ? data : this.localStorageService.retrieve(this.routeIdStr.routeStr + 'rootData');
        this.observableBusService.markForCheckAllOnPushComponent(this.routeIds);
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
            _.forEach(markertips, (markertip: HTMLElement) => {
                markertip.style.display = 'none';
            });
            this.saveDataInLocalStorage();
            this.saveMapPointJsonData();
            this.localStorageObserver();
        } else {
            this.PopupWindow.close();
            this.observableBusService.loading(true);
            this.globalSettingService.rootJson = this.rootData_v;
            this.routePlanner.main();
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


    initMapView(): void {
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
            this.localStorageService.clear(this.routeIdStr.routeStr + 'rootData');
            this.localStorageService.clear(this.routeIdStr.routeStr + 'routeColor');
            this.localStorageService.clear(this.routeIdStr.routeStr + 'routeStateInMap');
            this.localStorageService.clear(this.routeIdStr.routeStr + 'mapPoint');
            this.localStorageService.clear(this.routeIdStr.routeStr + 'isReCalculateRoutes');
            this.localStorageService.clear(this.routeIdStr.routeStr + 'clearRouteOnMap');
            this.localStorageService.clear(this.routeIdStr.routeStr + 'selectRouteOnMap');
            this.localStorageService.clear(this.routeIdStr.routeStr + 'clickStopOnStopList');
        }
    }

    ngAfterViewInit(): void {
        const routeInfos = this.window.getNativeWindow().document.getElementsByClassName('routelist-wrapper');
        _.forEach(routeInfos, (routeInfo: HTMLElement) => {
            routeInfo.style.display = 'none';
        })
    }

    beforeunloadHandler(event) {
        this.clearLocal()
    }

    private buildTableData(routeInfos: Array<RouteInfo>) {
        this.routePlannerTableData = _.chain(routeInfos).groupBy('routeNum').toPairs().map(
            function (pair) {
                return _.zipObject(['routeNum', 'routeInfos'], pair);
            }).value();

        _.forEach(this.routePlannerTableData, (routeNums) => {
            let columns = [];
            let stopCount = 0;
            routeNums["isSelectRoutesByNum"] = false;
            routeNums["isShowRoutesOnMap"] = true;
            _.forEach(routeNums.routeInfos, (routeInfo) => {
                stopCount = stopCount + routeInfo.stopInfos.length;
            });
            let stopCountColumn = new CustomColumn("", "", stopCount);
            columns.push(stopCountColumn);
            this.globalSettingService.rootJson.salesColumnGroupName.forEach(s => {
                let salesColumn = new CustomColumn(s, s, this.routePlanner.sumOfNumUnitByRouteInfos(s, routeNums.routeInfos));
                columns.push(salesColumn);
            });
            routeNums['columns'] = columns;
        });
    }

    onActivityChange(routeInfo:RouteInfo) {
       _.forEach(routeInfo.stopInfos,(stopInfo:StopInfo) => {
           stopInfo.activity = routeInfo.activity;
       })  ;
       this.observableBusService.markForCheckAllOnPushComponent();
    }


    changeRouteInfoSelectStatus() {
        const isAllSelected = !_.some(this.rootData_v.routeInfos, r => !r.isSelected);
        this.rootData_v.isSelectAllRouteInfo = isAllSelected;
        this.saveDataInLocalStorage();
    }

    onunloadHandler($event) {
        this.clearLocal();
    }

    private buildDeleteRouteList(observerId: string,reqRouteList: Array<RequestedRoute>) :Array<Object>{
        let newRouteList = [];
        let observerObj = {observerId:observerId};
        newRouteList.push(observerObj);
        _.forEach(reqRouteList,(reqRoute) => {
            let route = {id:reqRoute.id};
            newRouteList.push(route);
        });
        return newRouteList;
    }

    saveIsReDrawRoutesOnMap(){
        this.localStorageService.store(this.routeIdStr.routeStr+"isReDrawRoutesOnMap",Math.random());
    }

    clickCustomerInfo(clickedListItem: any) {
        this.saveClickedListItemObj(clickedListItem);
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
                this.routePlanner.setRouteInfosCustomColumnByFirstRoute();
                this.observableBusService.markForCheckAllOnPushComponent();
            }
        })
    }
}