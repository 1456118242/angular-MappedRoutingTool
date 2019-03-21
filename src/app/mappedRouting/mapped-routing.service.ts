import {HostListener, Injectable} from '@angular/core';

import * as _ from 'lodash';

import {StopInfo} from '../shared/stop-info.model';
import {RouteInfo} from '../shared/route-info.model';
import {RootJson} from '../shared/root-json.model';
import {TimeFieldObject} from '../shared/time-field-object.model';

import {RoutingBaseService} from '../service/routing-base.service'
import {FieldValueObject} from "../shared/field-value-object.model";
import {ColumnOptionDropDownMenuTemplate, LSStatus} from "../shared/constant";
import {StopSummaryOnMap} from "../component/stopSummaryPanelOnMap/shared/stop-summary-panel-on-map.model";
import {CustomColumn} from "../shared/custom-column.model";
import {RouteSummaryOnMap} from "../component/routeSummaryPanelOnMap/shared/route-summary-on-map.model";

@Injectable()
export class MappedRoutingService extends RoutingBaseService {

    initMapRelated() {
        this.mapService.initMap(document.getElementById('google-map'));
        this.mapService.initBindingMapEvents();
        this.mapService.initDrawingManagerOnMap();
        this.mapService.initBindingDrawingManagerEvent();
    }

    main(isSetMapCenter: boolean = true) {
        return new Promise((resolve, reject)=>{
            this.beforeCalculateRoutes(this.globalSettingService.rootJson).then(() => {
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
                    this.timelineService.drawTimeline();
                    this.markForCheckOnPushComponent();
                    this.observableBusService.loading(false);
                    resolve();
                });
            });
        });

    }



    buildRootJson(serverJson: any): RootJson {
        const rootJson = new RootJson();
        rootJson.routeInfos = [];
        let pickUnitNameList = serverJson.Routes[0].PickUnits.split("^");

        this.globalSettingService.HelperPercent = serverJson.HelperPercent;

        rootJson.salesColumnGroupName = pickUnitNameList;
        rootJson.isSelectAllRouteInfo = false;
        rootJson.isDrawRouteline = serverJson.DrawDirection == "1";
        rootJson.isAutoRoute = false;
        rootJson.isSaveLoadSheetAndRoute = false;
        rootJson.isShowMoveToThisLoadSheet = false;
        rootJson.dateFormat = serverJson.DateFormat;
        rootJson.timeFormat = serverJson.TimeFormat;


        this.globalSettingService.OldShowProductPickTypesetting = serverJson.ShowProductPickTypesetting;
        let currentShowSalesColumnGroupNameArray = [];
        try {
            currentShowSalesColumnGroupNameArray = _.trimEnd(serverJson.ShowProductPickTypesetting, ";").split(";");
        } catch (err) {
            currentShowSalesColumnGroupNameArray = ["Total;"];
        }
        rootJson.showCustomColumnssetting = serverJson.ShowCustomColumnssetting;

        rootJson.salesColumnGroupNameFieldValueObjectArray = [];
        rootJson.salesColumnGroupName.forEach(c => {
            let columnNameFieldValueObj = new FieldValueObject();
            columnNameFieldValueObj.field = c;
            columnNameFieldValueObj.value = currentShowSalesColumnGroupNameArray.indexOf(c) > -1 || c.toLocaleLowerCase() == 'total';
            columnNameFieldValueObj.isShow = c.toLocaleLowerCase() != 'total';

            rootJson.salesColumnGroupNameFieldValueObjectArray.push(columnNameFieldValueObj);
        });

        rootJson.salesColumnGroupNameFieldValueObjectArray.push({
            field: 'weight',
            value: true,
            isShow: false
        });

        rootJson.currentShowStopSummaryOnMapObj = new StopSummaryOnMap();
        rootJson.isShowStopSummaryOnMap = false;
        rootJson.currentShowRouteSummaryOnMapObj = new RouteSummaryOnMap();
        rootJson.isShowRouteSummaryOnMap = false;

        rootJson.showColumn = serverJson.ShowColumn;
        rootJson.reSeqSetting = serverJson.ReSeqSetting;

        for (let route of serverJson.Routes) {
            const routeInfo = new RouteInfo();
            routeInfo.id = route.LoadSheetID;
            routeInfo.userName = route.UserName;
            routeInfo.routeID = route.RouteID;
            routeInfo.planID = route.PlanID;
            routeInfo.routeName = route.Route;
            routeInfo.startTime = route.StartTime;
            routeInfo.deliveryman = route.Employee;
            routeInfo.endTime = '';
            routeInfo.endPlanTime = route.EndTime;
            routeInfo.color = route.Color;
            routeInfo.distance = 0;
            routeInfo.duration = 0;
            routeInfo.displayColumnOption = null;
            routeInfo.startMapPointID = route.StartMapPointID;
            routeInfo.endMapPointID = route.EndMapPointID;
            routeInfo.fieldValueObjects = null;
            routeInfo.stopInfos = [];
            routeInfo.palletCount = route.PalletCount;
            routeInfo.helper = (route.Helper == "True" || route.Helper === true);
            routeInfo.helperPercent = serverJson.HelperPercent;
            routeInfo.costPerMile = route.CostPerMile;
            routeInfo.isSelected = false;
            routeInfo.isShowOnMap = true;
            routeInfo.status = route.Status;
            routeInfo.vehicle = route.Vehicle;
            routeInfo.lSDate = route.LSDate;
            routeInfo.vehicleID = route.VehicleID;
            routeInfo.maxCases = "";
            routeInfo.maxCargoWeight = route.MaxCargoWeight;
            routeInfo.isEditVehicle = (route.IsEditVehicle.toLowerCase() == "true") && (route.Status < LSStatus.loaded);
            // routeInfo.isEditVehicle = false;
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
                stopInfo.oldRouteInfoID = route.LoadSheetID;
                stopInfo.eventID = stop.EventID;
                stopInfo.drivingTime = timeObj;
                stopInfo.imageIndex = stop.Sequence;
                stopInfo.userName = stop.UserName;
                stopInfo.customerID = stop.CustomerID;
                stopInfo.company = stop.Company;
                stopInfo.routeName = routeInfo.routeName;
                stopInfo.address = stop.Address;
                stopInfo.address2 = stop.Address2;
                stopInfo.city = stop.City;
                stopInfo.lat = stop.Latitude;
                stopInfo.lng = stop.Longitude;
                stopInfo.state = stop.State;
                stopInfo.postalCode = stop.PostalCode;
                // stopInfo.customerServiceDuration = stop.CustomerDuration;

                stopInfo.averageServiceTimeSecond = Number(stop.AverageServiceTimeSecond);
                stopInfo.customerFixedServiceTimeSecond = Number(stop.CustomerFixedServiceTimeSecond);
                stopInfo.customerDurationSecond = Number(stop.CustomerDurationSecond);

                stopInfo.color = route.Color;
                stopInfo.weight = stop.Weight;
                stopInfo.isGrayColor = stop.CanMove == "0";
                stopInfo.invoices = stop.Invoices;
                stopInfo.serviceWindows = [];
                stopInfo.allInvoices = stop.AllInvoices;
                stopInfo.helper = (stop.Helper == "True" || stop.Helper === true || stop.Helper == "1");
                stopInfo.savedRealLoadSheetID = stop.EventLoadSheetID;

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
                stopInfo.assignments = null;
                stopInfo.locked = stop.InvoiceLocked == "1";
                stopInfo.customerDuration = stop.CustomerDuration;
                stopInfo.fsm = stop.Fsm;
                stopInfo.customColumnFieldValueObj = new FieldValueObject();
                stopInfo.customColumnFieldValueObj.field = ColumnOptionDropDownMenuTemplate.keyValues[0].field;
                // stopInfo.customColumnFieldValueObj.value = stopInfo[ColumnOptionDropDownMenuTemplate.keyValues[0].value];

                this.buildNumUnitFieldListByStop(stop, pickUnitNameList, stopInfo);

                routeInfo.stopInfos.push(stopInfo);

            }

            rootJson.routeInfos.push(routeInfo);

        }

        return rootJson;
    }

    buildDeliveryman(serverJson): Array<any> {
        const arrayDeliveryman = Array<any>();
        for (let user of serverJson.DeliveryManJson) {
            let deliveryman: any = {};
            deliveryman.deliveryManName = user.UserName;
            arrayDeliveryman.push(deliveryman);
        }
        return arrayDeliveryman;
    }

    saveChanges(rootData) {
        const _self = this;
        return new Promise((resolve, reject) => {
            let saveObj = _self.buildSaveDataStr(rootData);
            if (saveObj.isChanged) {
                this.dataService.saveData(saveObj.postData).then(function (result) {
                    resolve(result.text());
                }, function () {
                    reject();
                });
            } else {
                reject();
            }
        });
    }

    buildSaveDataStr(rootData) {
        let rootJson = rootData;
        let oldRootJson = this.globalSettingService.oldRootJson;

        let isChanged = false,
            SequenceLoadSheetIDStr = "",
            EventIDSequenceStr = "",
            productPickTypesetting = "",
            InvoiceIDSequenceStr = "",
            CreatePlanEventLoadSheetIDList = [],
            EventIDPlanIDStr = "";

        let colorList = [];
        let employeeList = [];
        let vehicleIDList = [];
        let endTimeList = [];

        let LoadSheetIDInvoiceIDObjList = [];

        //save product pick type
        try {
            let newProductPickTypesettingStr = "";

            _.forEach(rootJson.salesColumnGroupName, c => {
                let isSelect = _.some(rootJson.salesColumnGroupNameFieldValueObjectArray, (s: any) => {
                    return s.field == c && s.value == true;
                });

                if (isSelect) {
                    newProductPickTypesettingStr += c + ";"
                }
            });

            if (newProductPickTypesettingStr != this.globalSettingService.OldShowProductPickTypesetting) {
                productPickTypesetting = newProductPickTypesettingStr;
            }
        } catch (e) {
            productPickTypesetting = "Total;";
        }


        for (let i = 0; i < rootJson.routeInfos.length; i++) {
            let isLoadsheetChange = false;
            let needReSeqPlan = true;

            let routeInfo = rootJson.routeInfos[i];
            let oldRouteInfo = oldRootJson.routeInfos[i];

            if (oldRouteInfo.stopInfos && routeInfo.stopInfos && oldRouteInfo.stopInfos.length !== routeInfo.stopInfos.length) {
                isLoadsheetChange = true;
            }
            if (routeInfo.vehicleID && routeInfo.vehicleID != oldRouteInfo.vehicleID) {
                let tmpLoadSheetId = routeInfo.id;
                tmpLoadSheetId = tmpLoadSheetId + "^" + parseInt(routeInfo.vehicleID) + "|";

                if (vehicleIDList.indexOf(tmpLoadSheetId) == -1) {
                    vehicleIDList.push(tmpLoadSheetId);
                }
            }
            if (routeInfo.color && routeInfo.color != oldRouteInfo.color) {
                let tmpRouteID = routeInfo.routeID;
                tmpRouteID += "^" + routeInfo.color + "|";

                if (colorList.indexOf(tmpRouteID) == -1) {
                    colorList.push(tmpRouteID);
                }
            }

            if (routeInfo.stopInfos && routeInfo.endPlanTime != routeInfo.stopInfos[routeInfo.stopInfos.length-1].drivingTime.endTime && this.globalSettingService.isSaveDataAction) {
                let tmpRouteID = routeInfo.planID;
                const  planTime = this.utilService.convertValidTimeNumStr(routeInfo.stopInfos[routeInfo.stopInfos.length-1].drivingTime.endTime);
                tmpRouteID += "^" + planTime + "|";
                if (endTimeList.indexOf(tmpRouteID) == -1) {
                    endTimeList.push(tmpRouteID);
                }
                routeInfo.endPlanTime = routeInfo.stopInfos[routeInfo.stopInfos.length-1].drivingTime.endTime;
            }

            if (routeInfo.deliveryman && routeInfo.deliveryman != oldRouteInfo.deliveryman) {
                let tmpLoadSheetId = routeInfo.id;
                tmpLoadSheetId = tmpLoadSheetId + "^" + routeInfo.deliveryman + "|";

                if (employeeList.indexOf(tmpLoadSheetId) == -1) {
                    employeeList.push(tmpLoadSheetId);
                }
            }

            for (let j = 0; j < routeInfo.stopInfos.length; j++) {
                let stopInfo = routeInfo.stopInfos[j];

                let l;
                if (stopInfo.oldRouteInfoID != routeInfo.id) {

                    for (l = 0; l < stopInfo.invoices.length; l++) {
                        let tmpInvoiceID = stopInfo.invoices[l];
                        if (tmpInvoiceID != "") {
                            needReSeqPlan = false;
                            let findTmpObj = null;
                            _.forEach(LoadSheetIDInvoiceIDObjList, function (LoadSheetIDInvoiceIDObj) {
                                if (LoadSheetIDInvoiceIDObj.DestLoadSheetID == routeInfo.id) {
                                    findTmpObj = LoadSheetIDInvoiceIDObj;
                                }
                            });
                            if (this.utilService.isUndefinedOrNull(findTmpObj)) {
                                let tmpLoadSheetIDInvoiceIDObj = {
                                    DestLoadSheetID: routeInfo.id,
                                    InvoiceIDArr: [tmpInvoiceID]
                                };
                                LoadSheetIDInvoiceIDObjList.push(tmpLoadSheetIDInvoiceIDObj);
                            } else {
                                findTmpObj.InvoiceIDArr.push(tmpInvoiceID);
                            }
                        } else {
                            EventIDPlanIDStr += stopInfo.eventID + "^" + routeInfo.planID + "|";
                        }
                    }
                }

                if (stopInfo.sequence != stopInfo.oldSequence && (this.utilService.isUndefinedOrNull(routeInfo.lastChange) || routeInfo.lastChange === true)) {
                    isLoadsheetChange = true;
                    if (stopInfo.oldRouteInfoID != routeInfo.id && !this.utilService.isUndefinedOrNull(stopInfo.allInvoices) && stopInfo.invoices.length != stopInfo.allInvoices.length) {
                        for (var k = 0; k < stopInfo.invoices.length; k++) {
                            var tmpInvoiceID = stopInfo.invoices[k];
                            if (tmpInvoiceID != "") {
                                InvoiceIDSequenceStr += tmpInvoiceID + "^" + stopInfo.sequence + "|";

                                if (CreatePlanEventLoadSheetIDList.indexOf(routeInfo.id) == -1) {
                                    CreatePlanEventLoadSheetIDList.push(routeInfo.id);
                                }
                            }

                        }
                    } else {
                        EventIDSequenceStr += stopInfo.id + "^" + stopInfo.sequence + "^" + routeInfo.status + "|";
                    }
                }
            }

            if (isLoadsheetChange) {
                SequenceLoadSheetIDStr += routeInfo.id + "|";
            }
        }

        let colorStr = "";

        _.forEach(colorList, function (c) {
            colorStr += c;
        });

        let endTimeStr = "";
        _.forEach(endTimeList, function (c) {
            endTimeStr += c;
        });

        let DeliverymanStr = "";
        _.forEach(employeeList, function (e) {
            DeliverymanStr += e;
        });

        let vehicleIDStr = "";
        _.forEach(vehicleIDList, function (e) {
            vehicleIDStr += e;
        });

        let request = this.dataService.requestObj();

        let postData: any = {
            Action: "0",
            LoadSheetIDInvoiceIDObjList: JSON.stringify(LoadSheetIDInvoiceIDObjList),
            EventIDPlanIDStr: EventIDPlanIDStr,
            SequenceLoadSheetIDStr: SequenceLoadSheetIDStr,
            ColorStr: colorStr,
            DeliverymanStr: DeliverymanStr,
            EventIDSequenceStr: EventIDSequenceStr,
            ProductPickTypesetting: productPickTypesetting,
            EndTimeStr: endTimeStr,
            IsAutoRoute: rootJson.isAutoRoute,
            LoadSheetList: request.LoadSheetID_List,
            InvoiceIDSequenceStr: InvoiceIDSequenceStr,
            CreatePlanEventLoadSheetIDList: JSON.stringify(CreatePlanEventLoadSheetIDList),
            LoadSheetIDVehicleIDStr: vehicleIDStr
        };

        if (rootJson.isSaveLoadSheetAndRoute) {
            postData.isLoadSheetOnly = "false";
        }

        isChanged = LoadSheetIDInvoiceIDObjList.length != 0 ||
            EventIDPlanIDStr != "" ||
            SequenceLoadSheetIDStr != "" ||
            colorStr != "" ||
            endTimeStr != "" ||
            DeliverymanStr != "" ||
            EventIDSequenceStr != "" ||
            productPickTypesetting != "" ||
            vehicleIDStr != "" ||
            InvoiceIDSequenceStr != "" ||
            rootJson.isAutoRoute;

        return {
            isChanged: isChanged,
            postData: postData
        };
    }

    private buildNumUnitFieldListByStop(stop: any, pickUnitNames: Array<any>, stopInfo: StopInfo): void {
        // const fieldObjs = [];
        // const numUnitsStr = stop.NumUnitsStr.trimRight("^").split("^");
        // numUnitsStr.forEach((n, index) => {
        //   const fieldObj = new FieldValueObject();
        //   fieldObj.isShow = true;
        //   fieldObj.field = pickUnitNames[index];
        //   fieldObj.value = n;
        //
        //   fieldObjs.push(fieldObj);
        // });
        //
        // return fieldObjs;

        const numUnitsStr = stop.NumUnitsStr.trimRight("^").split("^");
        numUnitsStr.forEach((n, index) => {
            if (n != "") {
                stopInfo[pickUnitNames[index]] = n;
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

    checkDataChanged(rootData) {
        var saveObj = this.buildSaveDataStr(rootData);
        return saveObj.isChanged;
    }

    //+++++++++++++++++++++++++++++ overwrite +++++++++++++++++//

    buildCustomColumn(routeInfos: RouteInfo[]) {
        this.buildCustomColumnByEachRouteInfo(routeInfos);
        this.buildSumOfCustomColumn();
    }

    buildSumOfCustomColumn() {
        let columns = [];
        let stopsColumn = new CustomColumn("Stops", "Stops", _.sumBy(this.globalSettingService.rootJson.routeInfos,(routInfo)=>{
            return routInfo.stopInfos.length;
        }));
        columns.push(stopsColumn);
        this.globalSettingService.rootJson.salesColumnGroupName.forEach(s => {
            let salesColumn = new CustomColumn(s, s, this.sumOfNumUnitByRouteInfos(s));
            columns.push(salesColumn);
        });

        let palletsColumn = new CustomColumn("Pallets", "palletCount", _.sumBy(this.globalSettingService.rootJson.routeInfos, function (s1) {
            return Number(s1.palletCount)
        }));
        let weightColumn = new CustomColumn("Weight", "weight", this.sumOfNumUnitByRouteInfos("weight"));

        let travelTimeColumn = new CustomColumn("Travel Time", "travelTime", this.sumOfTimeByRouteInfos('Travel Time'));
        let serviceTimeColumn = new CustomColumn("Service Time", "serviceTime", this.sumOfTimeByRouteInfos('Service Time'));
        let totalTimeColumn = new CustomColumn("Total Time", "totalTime", this.sumOfTimeByRouteInfos('Total Time'));
        let routeCostColumn = new CustomColumn("Route Cost", "routeCost", this.sumOfRouteCostByRouteInfos());
        let distanceColumn = new CustomColumn("Total Distance", "totalDistance", this.sumOfDistanceByRouteInfos(),"text", false);

        columns.push(palletsColumn, weightColumn, travelTimeColumn, serviceTimeColumn, totalTimeColumn, routeCostColumn, distanceColumn);

        this.globalSettingService.rootJson.sumOfCustomColumns = columns;

    }

    buildCustomColumnByEachRouteInfo(routeInfos: RouteInfo[]) {
        _.forEach(routeInfos, routeInfo => {
            this.buildCustomColumnByRouteInfo(routeInfo);
        });
    }

    buildCustomColumnByRouteInfo(routeInfo: RouteInfo) {
        let columns = [];
        let routeColumn = new CustomColumn("Route","Route",routeInfo.routeName,"mustText");
        let routeColor = new CustomColumn("Color","Color",routeInfo.color,"select");
        let routeDeliveryman = new CustomColumn("Deliveryman","Deliveryman",routeInfo.deliveryman,"select");
        let routeVehicle = new CustomColumn("Vehicle","Vehicle",routeInfo.vehicle,"select");
        let routeStops = new CustomColumn("Stops","Stops",routeInfo.stopInfos.length,"text");
        columns.push(routeColumn,routeColor,routeDeliveryman,routeVehicle,routeStops);
        this.globalSettingService.rootJson.salesColumnGroupName.forEach(s => {
            let salesColumn = new CustomColumn(s, s, this.sumOfNumUnitByRouteInfo(routeInfo, s));
            columns.push(salesColumn);
        });
        let palletsColumn = new CustomColumn("Pallets", "palletCount", routeInfo.palletCount);
        let weightColumn = new CustomColumn("Weight", "weight", this.sumOfNumUnitByRouteInfo(routeInfo, "weight"));
        let travelTimeColumn = new CustomColumn("Travel Time", "travelTime", this.calculateTotalTimeByStops(routeInfo, 'Travel Time'));
        let serviceTimeColumn = new CustomColumn("Service Time", "serviceTime", this.calculateTotalTimeByStops(routeInfo, 'Service Time'));
        let totalTimeColumn = new CustomColumn("Total Time", "totalTime", this.calculateTotalTimeByStops(routeInfo, 'Total Time'));
        let routeCostColumn = new CustomColumn("Route Cost", "routeCost", this.calculateRouteCost(routeInfo));
        let distanceColumn = new CustomColumn("Total Distance", "totalDistance",this.calculateTotalDistanceByRouteInfo(routeInfo), "text", false);
        let helper = new CustomColumn("Helper","Helper","helper","checkbox");
        let sendMessage = new CustomColumn("Send Message","SendMessage","sendMessage",'link');
        columns.push(palletsColumn, weightColumn, travelTimeColumn, serviceTimeColumn,
            totalTimeColumn, routeCostColumn, distanceColumn,helper,sendMessage);

        routeInfo.customColumns = columns;
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


    calculateServiceTime(stopInfo: StopInfo, hpercent: number): number{
        let serviceTime: number = 0;
        if (Number(stopInfo.averageServiceTimeSecond) > 0){
            serviceTime = Number(stopInfo.averageServiceTimeSecond);
        }else{
            serviceTime = Number(stopInfo.customerFixedServiceTimeSecond) + Number(hpercent) * Number(stopInfo.customerDurationSecond);
        }

        return serviceTime == 0 ? 120 : serviceTime;
    }




}
