import {Injectable} from '@angular/core';
import * as _ from 'lodash';

import {GlobalSettingService} from './global-setting.service';
import {MapService} from "./mapService/map.service";
import {ReSequenceType} from '../shared/constant';
import {RequestedRoute} from "./mapService/requested-routes.model";
import {RouteInfo} from "../shared/route-info.model";
import {ObservableBusService} from "./observable-bus.service";
import {DataService} from "./data.service";
import {RepositoryService} from "./repository.service";
import {printComponentView, PromptedMessage} from '../shared/constant'
import  {ReSequenceRejectObj} from '../shared/re-sequence-reject.model'

@Injectable()
export class ReSequenceService {
    constructor(public mapService: MapService,
                public observableBusService: ObservableBusService,
                public dataService: DataService,
                public repositoryService: RepositoryService,
                public globalSettingService: GlobalSettingService) {
    }

    private _requestedRoute: RequestedRoute;
    //promise
    reSequenceRouteInfo(routeInfo: RouteInfo, requestedRoute: RequestedRoute, sequenceType: any, whichModule?: string) {
        const _self = this;
        this._requestedRoute = requestedRoute;
        this.observableBusService.loading(true);

        return new Promise((resolve, reject) => {
            if (sequenceType == ReSequenceType.shortest_distance && routeInfo.stopInfos.length > 1 && routeInfo.stopInfos.length <= 23) {
                this.reSeqByGoogle(routeInfo, requestedRoute).then(result => {
                    resolve(result);
                }, (rejectObj) => {
                    reject(rejectObj);
                });
            } else {
                let sortCustomerIDStr = "";
                let customersIDAndConsumeTime = "";

                let stopInfos = _.filter(routeInfo.stopInfos, function (s) {
                    return !_.isEmpty(s.lat) && !_.isEmpty(s.lng);
                });

                if (sequenceType == ReSequenceType.service_windows) {
                    _.forEach(stopInfos, function (s) {
                        let serviceTimeSec = 0;
                    
                        if (s.customerServiceDuration){
                            serviceTimeSec = s.customerServiceDuration * _self.globalSettingService.HelperPercent;
                        }else{
                            if (Number(s.averageServiceTimeSecond) > 0){
                                serviceTimeSec = Number(s.averageServiceTimeSecond);
                            }else{
                                serviceTimeSec = Number(s.customerFixedServiceTimeSecond) + Number(_self.globalSettingService.HelperPercent) * Number(s.customerDurationSecond);
                            }
                    
                            serviceTimeSec == 0 ? 120 : serviceTimeSec;
                        }
    
                        let tmpStr = s.customerID + "^" + parseInt(serviceTimeSec) + "|";
                        customersIDAndConsumeTime = customersIDAndConsumeTime + tmpStr;
                    });
                } else {
                    _.forEach(stopInfos, function (s) {
                        sortCustomerIDStr = sortCustomerIDStr + s.customerID + "^";
                    });

                    if (!_.isEmpty(sortCustomerIDStr)) {
                        sortCustomerIDStr = sortCustomerIDStr.substring(0, sortCustomerIDStr.length - 1);
                    }
                }

                if (stopInfos.length > 1) {
                    if (whichModule == printComponentView.mappedRoutingForPlan) {
                        let destSequenceID = sequenceType == ReSequenceType.service_windows ? routeInfo.routeID : routeInfo.id;
                        if (destSequenceID == ""){
                            let rejectObj = new ReSequenceRejectObj("Current Plan does not have any Route, can't re-sequence by service window.", "sequenceRouteFromServe", false);
                            reject(rejectObj);
                        }

                        this.dataService.sequenceRouteFromServiceForPlan(sequenceType, sortCustomerIDStr, routeInfo.startMapPointID, destSequenceID, customersIDAndConsumeTime)
                            .then((result) => {
                                this.fromServerSuccessCallback(routeInfo, sequenceType, result).then(r1 => {
                                    resolve(r1);
                                }, (rejectObj: ReSequenceRejectObj) => {
                                    if (rejectObj.isRequestAgain) {
                                        resolve(this.reSequenceRouteInfo(routeInfo, this._requestedRoute, sequenceType))
                                    } else {
                                        reject(rejectObj)
                                    }
                                });
                            }, () => {
                                let rejectObj = new ReSequenceRejectObj(PromptedMessage.sequenceRouteFromServeFailMessage, "sequenceRouteFromServe", false);
                                reject(rejectObj);
                            });
                    } else {
                        this.dataService.sequenceRouteFromService(sequenceType, sortCustomerIDStr, routeInfo.startMapPointID, routeInfo.id, customersIDAndConsumeTime)
                            .then((result) => {
                                this.fromServerSuccessCallback(routeInfo, sequenceType, result).then(r1 => {
                                    resolve(r1);

                                }, (rejectObj: ReSequenceRejectObj) => {
                                    if (rejectObj.isRequestAgain) {
                                        resolve(this.reSequenceRouteInfo(routeInfo, this._requestedRoute, sequenceType))
                                    } else {
                                        reject(rejectObj)
                                    }
                                });
                            }, () => {
                                let rejectObj = new ReSequenceRejectObj(PromptedMessage.sequenceRouteFromServeFailMessage, "sequenceRouteFromServe", false);
                                reject(rejectObj);
                            });
                    }


                }
                else {
                    let rejectObj = new ReSequenceRejectObj("", "", false);
                    reject(rejectObj);
                }
            }
        });
    }

    fromServerSuccessCallback(routeInfo, type, result) {
        let data = result.text();
        const self = this;

        return new Promise((resolve, reject) => {
            switch (type) {
                case ReSequenceType.service_windows:
                    self.serviceWindowSequence(data, routeInfo, type).then((result) => {
                        resolve(result);
                    }, (rejectObj) => {
                        reject(rejectObj)
                    });
                    break;
                case ReSequenceType.shortest_distance:
                    self.shortestDistanceSequence(data, routeInfo, type).then((result) => {
                        resolve(result);
                    }, (rejectObj) => {
                        reject(rejectObj)
                    });
                    break;
                default:
                    self.closestOrFarthestSequence(data, routeInfo, type).then((result) => {
                        resolve(result);
                    }, (rejectObj) => {
                        reject(rejectObj)
                    });
                    break;
            }
        })

    }

    private fromServerFailCallback() {

    }

    private serviceWindowSequence(data: any, routeInfo: RouteInfo, type: any) {
        let customerIDStrArr = data.split('|');
        const self = this;

        return new Promise((resolve, reject) => {
            if (customerIDStrArr.length > 1) {
                if (data.indexOf("^") > -1) {
                    let tmpCustomerIDStr = customerIDStrArr[1].substring(0, customerIDStrArr[1].length - 1);
                    let tmpArr = tmpCustomerIDStr.split("~");
                    let customerIDList = self.reBuildCustomerIDList(tmpArr);
                    self.requestLatLngFromGoogle(customerIDList, routeInfo, type).then(() => {}, (rejectObj) => {reject(rejectObj)});
                }
                else {
                    let tmpStartMapPointID = "L" + routeInfo.startMapPointID;
                    if (routeInfo.startMapPointID == "-1") {
                        tmpStartMapPointID = routeInfo.stopInfos[0].customerID;
                    }

                    self.requestLatLngFromGoogle([tmpStartMapPointID, customerIDStrArr[0]], routeInfo, type).then(() => {}, (rejectObj) => {reject(rejectObj)});
                }
            }
            else {
                //TODO delete
                //self.routingBaseService.reSetStopInfoSequenceByReSequence(routeInfo, data);

                let result = {
                    routeInfo: routeInfo,
                    afterReSequenceData: data,
                    isReSequenceByGoogle: false
                };

                resolve(result);
            }
        })

    }

    private shortestDistanceSequence(data: any, routeInfo: RouteInfo, type: any) {
        let customerIDStrArr = data.split('|');
        const self = this;

        return new Promise((resolve, reject) => {
            if (customerIDStrArr.length > 1) {
                customerIDStrArr.splice(customerIDStrArr.length - 1, 1);

                let customerIDList = self.reBuildCustomerIDList(customerIDStrArr);
                self.requestLatLngFromGoogle(customerIDList, routeInfo, type).then(() => {
                }, (rejectObj) => {
                    reject(rejectObj)
                });
            }
            else {

                //TODO delete
                //self.routingBaseService.reSetStopInfoSequenceByReSequence(routeInfo, data);

                let result = {
                    routeInfo: routeInfo,
                    afterReSequenceData: data,
                    isReSequenceByGoogle: false
                };

                resolve(result);
            }
        })

    }

    private closestOrFarthestSequence(data: any, routeInfo: RouteInfo, type: any) {
        let customerIDStrArr = data.split("|");
        const self = this;

        return new Promise((resolve, reject) => {
            if (customerIDStrArr.length > 1) {
                let customerIDList = [];
                let tmpIDArr = customerIDStrArr[0].split("^");

                _.forEach(tmpIDArr, function (value) {
                    customerIDList.push(customerIDStrArr[1]);
                    customerIDList.push(value);
                });

                self.requestLatLngFromGoogle(customerIDList, routeInfo, type).then(() => {
                }, (rejectObj) => {
                    reject(rejectObj)
                });
            }
            else {
                //TODO delete
                //this.routingBaseService.reSetStopInfoSequenceByReSequence(routeInfo, data);


                let result = {
                    routeInfo: routeInfo,
                    afterReSequenceData: data,
                    isReSequenceByGoogle: false
                };

                resolve(result);
            }
        })
    }

    private reSeqByGoogle(routeInfo: RouteInfo, requestedRoute: RequestedRoute) {
        const self = this;

        return new Promise((resolve, reject) => {
            self.mapService.optimizeByGoogle(requestedRoute).then((sortedStops: any) => {
                const tempStops = [];
                for (let i = 0; i < sortedStops.length; i++) {
                    let stopIndex = sortedStops[i];
                    let tempStop = requestedRoute.requestStops[stopIndex];
                    tempStops.push(tempStop);
                }

                requestedRoute.requestStops = tempStops;

                let result = {
                    routeInfo: routeInfo,
                    afterReSequenceData: requestedRoute,
                    isReSequenceByGoogle: true
                };

                resolve(result);
                //TODO delete
                // this.routingBaseService.reSetStopInfoSequenceByRequestedRoute(routeInfo, requestedRoute);

            }, (msg) => {
                // alert(msg);
                let rejectObj = new ReSequenceRejectObj(msg, "reSeqByGoogle", false);
                reject(rejectObj);
            });
        })
    }

    private requestLatLngFromGoogle(customerIDList: string[], routeInfo: RouteInfo, type: any) {
        let oneCustomerLatLngList: any = this.buildLatLngListByCustomerIDList(customerIDList, routeInfo);
        const _self = this;

        return new Promise((resolve, reject) => {
            this.mapService.calculateRoutesByReSequence(oneCustomerLatLngList).then(function (responseList) {
                _self.fromGoogleSuccessCallback(responseList, customerIDList, routeInfo, type).then(() => {}, (rejectObj) => {reject(rejectObj);});
            }, function (result) {
                // alert('Directions request failed due to ' + result.status + ', Please try again.');
                let rejectObj = new ReSequenceRejectObj(PromptedMessage.requestGoogleDirectionFailMessage + result.status, 'requestLatLngFromGoogle', false);
                reject(rejectObj);
            });
        })
    }

    private fromGoogleSuccessCallback(responseList: any, customerIDList: string[], routeInfo: RouteInfo, type: any) {
        let allLegs = [];
        _.forEach(responseList, function (responseRoute) {
            _.forEach(responseRoute.routes[0].legs, function (leg) {
                allLegs.push(leg);
            });

        });

        var saveDistanceParam = "";
        for (var i = 0; i < customerIDList.length - 1; i++) {
            saveDistanceParam += customerIDList[i] + "^" + customerIDList[i + 1]
                + "^" + allLegs[i].distance.value + "^" + allLegs[i].duration.value + "|";

        }

        const self = this;
        return new Promise((resolve, reject) => {
            self.dataService.saveCustomerDistancesAndDuration(saveDistanceParam).then(function (r) {
                reject(new ReSequenceRejectObj("", "", true));
            }, function () {
                let rejectObj: ReSequenceRejectObj = new ReSequenceRejectObj(PromptedMessage.saveCustomerDistancesAndDurationFailMessage, "saveCustomerDistancesAndDuration", false);
                reject(rejectObj);
            });
        })

    }

    private buildLatLngListByCustomerIDList(customerList: string[], routeInfo: RouteInfo) {
        const latLngList = [];
        const _self = this;

        customerList.forEach((c) => {
            if (c.indexOf("L") > -1) {
                let mapPointID = c.substring(1, c.length);

                let mapPointLatLng = _self.repositoryService.getLatLngByMapPointID(mapPointID);
                latLngList.push([mapPointLatLng.lat, mapPointLatLng.lng]);

            } else {
                let stopInfo = _self.repositoryService.getStopInfoByCustomerID(c, routeInfo);
                latLngList.push([stopInfo.lat, stopInfo.lng]);
            }
        });

        return latLngList;
    }

    private reBuildCustomerIDList(customerIDList: string[]) {
        let customerList = [];
        let removeIndex = 0;

        for (let i = 0; i < customerIDList.length; i++) {
            let tmpArr = customerIDList[i].split("^");
            customerList.push(tmpArr[0]);
            customerList.push(tmpArr[1]);

            removeIndex += 2;

            //Remove duplicate elements
            if (i + 1 < customerIDList.length) {
                var nextTmpArr = customerIDList[i + 1].split("^");
                if (tmpArr[1] == nextTmpArr[0]) {
                    customerList.splice(removeIndex - 1, 1);
                    removeIndex--;
                }
            }
        }

        return customerList;
    }

}
