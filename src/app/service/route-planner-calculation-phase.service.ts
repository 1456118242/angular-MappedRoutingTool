import {Injectable} from '@angular/core'
import * as _ from 'lodash';
import {RouteInfo} from "../shared/route-info.model";
import {PhaseType} from "../shared/constant";
import {RoutingBaseService} from "./routing-base.service";
import {StopInfo} from "../shared/stop-info.model";
import {RootJson} from "../shared/root-json.model";

@Injectable()
export class RoutePlannerCalculationPhaseService extends RoutingBaseService {

    protected currentPhaseType: any = PhaseType.all;

    updateDataAfterChangePhase(routeInfos: RouteInfo[] = this.globalSettingService.rootJson.routeInfos, phase: string, isReCalculateRoutes:boolean = true) {
        this.observableBusService.loading(true);

        phase = phase || this.currentPhaseType.value;

        let needReDrawRouteInfos = [];

        _.forEach(routeInfos, function (routeInfo) {
            let tmpOldHidedStops = _.cloneDeep(routeInfo.hidedStopInfos);

            this.updateStopsAndHideStopsByRouteListByChangePhase(routeInfo, phase);

            let isReDraw = this.isNeedReDrawRouteByChangePhase(tmpOldHidedStops, routeInfo);
            if (isReDraw) {
                needReDrawRouteInfos.push(routeInfo);
            }

        });

        if (needReDrawRouteInfos.length > 0 && isReCalculateRoutes) {
            //TODO: bu zhi dao hai xu yao bu xu yao
            // routeService.sortStopBySeqInRouteList(needReDrawRoutes);
            this.reCalculateRoutes(needReDrawRouteInfos);
        } else {
            this.observableBusService.loading(false);
        }
    }

//     reSeqStopInfos( stopInfos: StopInfo[], index ) {
//     for ( var i = index; i < stops.length; i++ ) {
//         if (i == index) {
//             if (i == 0) {
//                 stops[ i ].Seq = "1";
//                 reSeqProductGroupByPhase( stops[ i ], "1" );
//             } else {
//                 stops[ i ].Seq = (Number( stops[ i - 1 ].Seq ) + 1).toString();
//                 reSeqProductGroupByPhase( stops[ i ], (Number( stops[ i - 1 ].Seq ) + 1).toString() );
//             }
//         } else {
//             if (Number( stops[ i ].Seq ) <= Number( stops[ i - 1 ].Seq )) {
//                 stops[ i ].Seq = (Number( stops[ i - 1 ].Seq ) + 1).toString();
//                 reSeqProductGroupByPhase( stops[ i ], (Number( stops[ i - 1 ].Seq ) + 1).toString() );
//             }
//         }
//     }
// }

    updateStopsAndHideStopsByRouteListByChangePhase(routeInfos: RouteInfo[] = this.globalSettingService.rootJson.routeInfos, phase: string) {
        const self = this;
        _.forEach(routeInfos, function (routeInfo) {
            self.moveHidedStopInfosToStopInfos(routeInfo);
            self.moveStopInfosToHidedStopInfosByPhase(routeInfo, phase);
        });
    }

    checkStopIsMatchPhase(stopInfo: StopInfo, phase: string): boolean {
        let flag = false;

        if (stopInfo.phase == PhaseType.all.value) {
            flag = true;
        } else if (stopInfo.phase.length == 2) {
            if (phase.indexOf(stopInfo.phase[0]) > -1 || phase.indexOf(stopInfo.phase[1]) > -1) {
                flag = true;
            }
        } else if (stopInfo.phase.length == 1) {
            if (phase.indexOf(stopInfo.phase) > -1) {
                flag = true;
            }
        }

        if (flag || phase == PhaseType.all.value) {
            flag = true;
        }

        return flag;
    }

    //===== stop per week =====//

    computeStopPerWeekOnSingleRoute(routeInfo: RouteInfo, stopInfo: StopInfo) {
        let result = 0;
        let routeFrequency = routeInfo.routeFrequency;
        let allFlag = _.some(routeInfo.stopInfos, function (s: StopInfo) {
            return s.phase == "All" && s.customerID == stopInfo.customerID && routeFrequency == 1;
        });

        if (allFlag) {
            result = 1;
        } else {
            let a = _.some(routeInfo.stopInfos, function (p: StopInfo) {
                return ( p.customerID == stopInfo.customerID) && ( (routeFrequency == 1 && ( p.phase == "1" || p.phase == "13" )) || (routeFrequency == 0.5 && p.phase == "All") );
            });

            let b = _.some(routeInfo.stopInfos, function (p: StopInfo) {
                return ( p.customerID == stopInfo.customerID && routeFrequency == 1 && (p.phase == "2" || p.phase == "24"));
            });

            let c = _.some(routeInfo.stopInfos, function (p: StopInfo) {

                return ( p.customerID == stopInfo.customerID) && ( (routeFrequency == 1 && ( p.phase == "3" || p.phase == "13" )) || (routeFrequency == 0.5 && p.phase == "All") );
            });

            let d = _.some(routeInfo.stopInfos, function (p: StopInfo) {
                return ( p.customerID == stopInfo.customerID && routeFrequency == 1 && (p.phase == "4" || p.phase == "24"));
            });

            result = ((a ? 0.25 : 0) + (b ? 0.25 : 0) + (c ? 0.25 : 0) + (d ? 0.25 : 0));
        }

        return result > 1 ? 1 : result;
    }

    changeSameCustomerStopPerWeek(stopInfo: StopInfo, routeInfos: RouteInfo[] = this.globalSettingService.rootJson.routeInfos) {
        _.forEach(routeInfos, function (r: RouteInfo) {
            _.chain(r.stopInfos)
                .filter(function (s: StopInfo) {
                    return s.customerID == stopInfo.customerID && s != stopInfo;
                })
                .forEach(function (s1: StopInfo) {
                    s1.stopsPerWeek = stopInfo.stopsPerWeek;
                })
                .value();
        });
    }

    changeStopsPerWeek() {
        //Step 1 before remove:
        //Extra stops per week = Stop.StopsPerWeek - (fromRouteInfo.Stop.StopsPerWeek + toRouteInfo.Stop.StopsPerWeek)
        //Step 2 after remove:
        //fromRouteInfo.Stop.StopsPerWeek + toRouteInfo.Stop.StopsPerWeek + Extra stops per week
    }

    //========== private ==========//

    public moveHidedStopInfosToStopInfos(routeInfo: RouteInfo) {
        _.forEach(routeInfo.hidedStopInfos, function (hideStopInfo) {
            routeInfo.stopInfos.splice(hideStopInfo.oldStopInfoIndex, 0, hideStopInfo);
        });
    }

    public moveStopInfosToHidedStopInfosByPhase(routeInfo: RouteInfo, phase: string) {
        routeInfo.hidedStopInfos = [];
        const self = this;
        _.forEach(routeInfo.stopInfos, function (stopInfo) {
            if (!self.checkStopIsMatchPhase(stopInfo, phase)) {

                stopInfo.oldStopInfoIndex = _.findIndex(routeInfo.stopInfos, function (s) {
                    return s.id == stopInfo.id;
                });

                routeInfo.hidedStopInfos.push(stopInfo);
            }
        });

        _.forEach(routeInfo.hidedStopInfos, function (hs) {
            _.remove(routeInfo.stopInfos, function (s) {
                return hs.id == s.id;
            });
        });
    }

    public isNeedReDrawRouteByChangePhase(oldHidedStopInfos: StopInfo[], routeInfo: RouteInfo) {
        let tmpFlag = false;

        if (oldHidedStopInfos.length != routeInfo.hidedStopInfos.length) {
            tmpFlag = true;
        } else {
            if (this.checkHidedStopsDifferent(oldHidedStopInfos, routeInfo.hidedStopInfos)) {
                tmpFlag = true;
            }
        }

        return tmpFlag;
    }

    public checkHidedStopsDifferent(oldHidedStopInfos: StopInfo[], newHidedStopInfos: StopInfo[]) {
        oldHidedStopInfos = _.sortBy(oldHidedStopInfos, function (s) {
            return Number(s.id);
        });

        newHidedStopInfos = _.sortBy(newHidedStopInfos, function (s) {
            return Number(s.id);
        });

        let result = false;
        for (let i = 0; i < oldHidedStopInfos.length; i++) {
            if (oldHidedStopInfos[i].id != newHidedStopInfos[i].id) {
                result = true;
                break;
            }
        }

        return result;
    }

    saveChange(rootJson: RootJson) {
        return new Promise((resolve,reject)=>{
            let saveObj = this.bulidSaveDataStr(rootJson);
            if(saveObj.isChanged){
                this.dataService.saveDataRoutePlanner(saveObj.postData).then(()=>{
                    this.changeJsonAfterSuccessSave( rootJson );
                    resolve(saveObj.reDrawRouteList)
                },()=>{
                    reject()
                });
            }else {
                reject();
            }
        })
    }

    bulidSaveDataStr( rootJson :RootJson) {

        if (!_.isNull(rootJson.routeEditPermission) && !_.isUndefined(rootJson.routeEditPermission) && rootJson.routeEditPermission.toLowerCase() == "false"){
            alert("Permission to save was denied. RouteEdit Permission required.")
        }

        let
            isChanged = false,
            routeChangedStr = "",
            phaseStr = "",
            seqStr = "",
            colorStr = "",
            routeDistancesStr = "",
            routeEndTimeStr = "",
            routeIdStr = "",
            deliverymanStr = "",
            activityStr = "",
            stopActivityStr = "",
            colorChangeList = [],
            deliverymanList = [],
            activityList = [],
            reDrawRouteList = [],
            isStopChangedFlag = false,
            productPickTypesetting = "";

        // //save product pick type
        try{
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
        }catch(e){
            productPickTypesetting = "Total;";
        }
        let tmpStr;
        for ( let i = 0; i < rootJson.routeInfos.length; i++ ) {
            let route = rootJson.routeInfos[ i ];
            let oldRoute = this.globalSettingService.oldRootJson.routeInfos[i];

            if ( route.color != oldRoute.color ) {
                tmpStr = route.id + "^" + route.color + "|";
                if ( colorChangeList.indexOf( tmpStr ) == -1 ) {
                    colorChangeList.push( tmpStr );
                }
            }

            if ( route.deliveryman != oldRoute.deliveryman ) {
                tmpStr = route.id + "^" + route.deliveryman + "|";
                if ( deliverymanList.indexOf( tmpStr ) == -1 ) {
                    deliverymanList.push( tmpStr );
                }
            }

            if (route.activity != oldRoute.activity) {
                tmpStr = route.id + "^" + route.activity + "|";
                if (activityList.indexOf(tmpStr) == -1) {
                    activityList.push(tmpStr);
                }
            }


            // var endTimeNumStr = this.utilService.convertValidTimeNumStr( route.endTime );
            // if ( route.endTime !="" && endTimeNumStr != "0.00" && endTimeNumStr != "" && endTimeNumStr != "0" && (route.endTime != oldRoute.endTime) ) {
            //     routeEndTimeStr += route.id + "^" + endTimeNumStr + "|";
            // }
            let sumOfDistance = _.find(route.customColumns,(customColumn)=>{
                return customColumn.field == "totalDistance"
            });
            if ( route.plannedDistance != Number(sumOfDistance.value) ) {
                routeIdStr += route.id + "^";
                routeDistancesStr +=  sumOfDistance.value + "^"; // (Math.Abs(routes[i].TotalDistance - 0) < double.Epsilon ? "0" : (routes[i].TotalDistance * 0.6214).ToString("f2")) + "^";
            }


            _.forEach( route.stopInfos, function( stop ) {
                if(stop.oldSequence != stop.sequence || stop.seq != stop.sequence){
                    seqStr += stop.id + "^" + stop.sequence + "|";
                    stop.seq = stop.sequence;
                    isStopChangedFlag = true;
                }
                if(stop.origActivity != stop.activity){
                    stopActivityStr += stop.id + "^" + stop.activity + "|";
                    isStopChangedFlag = true;
                }
                if(stop.oldPhase != stop.phase){
                    phaseStr += stop.id + "^" + stop.phase + "|";
                    isStopChangedFlag = true;
                }
                if(stop.oldRouteInfoID != route.id){
                    routeChangedStr += stop.id + "^" + route.id + "|";
                    isStopChangedFlag = true;
                }
                if ( isStopChangedFlag && reDrawRouteList.indexOf( route ) == -1 )
                {
                    reDrawRouteList.push(route);
                }
            });

            if (isStopChangedFlag && !_.includes( reDrawRouteList, route ) )
            {
                reDrawRouteList.push(route);
            }
        }

        _.forEach( colorChangeList, function ( c ) {
            colorStr += c;
        } );

        _.forEach( deliverymanList, function ( e ) {
            deliverymanStr += e;
        });

        _.forEach(activityList, function (e) {
            activityStr += e;
        });

        var postData = {
            Action: "10",
            seqChanges:seqStr,
            phaseChanges:phaseStr,
            routeChanges:routeChangedStr,
            colorStr:colorStr,
            deliverymanStr: deliverymanStr,
            activityStr: activityStr,
            stopActivityStr: stopActivityStr,
            routeDistancesStr:routeDistancesStr,
            routeIDStr:routeIdStr,
            routeEndTimeStr:routeEndTimeStr,
            ProductPickTypesetting: productPickTypesetting
        };

        isChanged = seqStr != "" ||
            phaseStr != "" ||
            routeChangedStr != "" ||
            colorStr != "" ||
            deliverymanStr != "" ||
            routeDistancesStr != "" ||
            activityStr != "" ||
            stopActivityStr != "" ||
            routeIdStr != "" ||
            routeEndTimeStr != "" ||
            productPickTypesetting != "";

        return {
            isChanged: isChanged,
            postData: postData,
            reDrawRouteList: reDrawRouteList
        };
    }


    private changeJsonAfterSuccessSave(rootJson: RootJson) {
        // try{
        //     rootJson.ShowProductPickTypesetting = rootJson.showProductPickTypeSettingList.toString().replace(/,/g,";")+";";
        // }catch(e) {
        //     rootJson.ShowProductPickTypesetting = "Total;";
        // }
        // console.log(rootJson.ShowProductPickTypesetting);
        let i = 0;
        _.forEach(rootJson.routeInfos,(route)=>{
            let  oldRoute = this.globalSettingService.oldRootJson.routeInfos[i];
            i++;

            if (oldRoute.activity != route.activity) {
                oldRoute.activity = route.activity;
            }

            if (oldRoute.deliveryman != route.deliveryman) {
                oldRoute.deliveryman = route.deliveryman;
            }

            if (oldRoute.color != route.color) {
                oldRoute.color = route.color;
            }

            //route.deletedStops = [];
            let sumOfDistance = _.find(route.customColumns,(customColumn)=>{
                return customColumn.field == "totalDistance"
            });

            if (route.plannedDistance != Number(sumOfDistance.value)) {
                route.plannedDistance != Number(sumOfDistance.value);
            }

            _.forEach( route.stopInfos, (stopInfo)=>{
                if(stopInfo.oldPhase != stopInfo.phase ){
                    stopInfo.oldPhase = stopInfo.phase;
                }
                if (stopInfo.oldSequence != stopInfo.sequence){
                    stopInfo.oldSequence = stopInfo.sequence
                }
                if(stopInfo.origActivity != stopInfo.activity){
                    stopInfo.origActivity = stopInfo.activity
                }
                if(stopInfo.oldRouteInfoID != route.id){
                    stopInfo.oldRouteInfoID = route.id
                }
            } )

        })
    }
    checkDataChanged(){
        const saveObj = this.bulidSaveDataStr(this.globalSettingService.rootJson);
        return saveObj.isChanged;
    }

    buildCustomColumn(routeInfos: RouteInfo[]): void {

    }

    isNeedSaveReDrawInMap(): boolean {
        return this.globalSettingService.isMultiWindow;
    }

}
