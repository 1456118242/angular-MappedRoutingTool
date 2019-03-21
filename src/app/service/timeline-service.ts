import {Injectable} from "@angular/core";
import {UtilService} from "./util.service";
import {GlobalSettingService} from "./global-setting.service";
import * as _ from 'lodash';

@Injectable()
export class TimeLineService {
    constructor(public utilService: UtilService, public globalSettingService: GlobalSettingService) {

    }

    drawTimeline() {
        if (this.globalSettingService.rootJson.isShowTimeline) {
            this.drawTimelineHeader();
            this.drawTimelineContent();
        }
    }

    private drawTimelineHeader() {
        let minStartTime = this.utilService.getStartTimeMin();
        let maxEndTime = this.utilService.getEndTimeMax();

        let count = maxEndTime - minStartTime + 1;
        let timelinePercent = this.getPercentByMinServiceTime();

        this.globalSettingService.rootJson.timelineHeaderObjList = [];
        let timeText = minStartTime;
        for (let i = 0; i < count; i++) {//
            let tmpText = (timeText > 12 ? (timeText - 12) + " PM" : timeText == 12 ? timeText + " PM" : timeText + " AM");

            let tmpObj = {
                hourText: this.utilService.timeFormat(tmpText),
                width: 3600 / timelinePercent
            };

            this.globalSettingService.rootJson.timelineHeaderObjList.push(tmpObj);

            timeText = timeText + 1;
        }

    }

    private drawTimelineContent() {
        const _self = this;
        let routes = this.globalSettingService.rootJson.routeInfos;

        let timelinePercent = this.getPercentByMinServiceTime();
        let minStartTime = this.utilService.getStartTimeMin();
        let maxEndTime = this.utilService.getEndTimeMax();

        _.forEach(routes, function (route) {
            if (route.stopInfos.length > 0) {
                route.timelineObj = {};
                let hpercent = route.helper ? Number(route.helperPercent) : 1;

                let minStartTimeSec = _self.utilService.convertTimeStrToNumber((minStartTime > 12 ? (minStartTime - 12) + ":00 PM" : minStartTime + ":00 AM"));
                let loadSheetStartSec = _self.utilService.convertTimeStrToNumber(route.startTime);
                let marginLeft = (loadSheetStartSec - minStartTimeSec) / timelinePercent;

                route.timelineObj.isShow = true;
                route.timelineObj.startPointOffsetLeft = marginLeft;
                route.timelineObj.startTimeRailWayWidth = route.stopInfos[0].duration / timelinePercent; // - start point width 20
                route.timelineObj.endTimeRailWayWidth = route.duration / timelinePercent;
                route.timelineObj.timelineList = [];

                for (let i = 0; i < route.stopInfos.length; i++) {
                    let tmpStop = route.stopInfos[i];
                    let serviceTimeSec = 0;
                    
                    if (tmpStop.customerServiceDuration){
                        serviceTimeSec = tmpStop.customerServiceDuration * hpercent;
                    }else{
                        if (Number(tmpStop.averageServiceTimeSecond) > 0){
                            serviceTimeSec = Number(tmpStop.averageServiceTimeSecond);
                        }else{
                            serviceTimeSec = Number(tmpStop.customerFixedServiceTimeSecond) + Number(hpercent) * Number(tmpStop.customerDurationSecond);
                        }
                
                        serviceTimeSec == 0 ? 120 : serviceTimeSec;
                    }

                    let nextStop = null;
                    if (i + 1 < route.stopInfos.length) {
                        nextStop = route.stopInfos[i + 1];
                    }

                    let tmpServiceTimeWidth = serviceTimeSec / timelinePercent;

                    let tmpObj = {
                        RailWayWidth: nextStop ? nextStop.duration / timelinePercent : 0,
                        RectWidth: tmpServiceTimeWidth,
                        RectText: i + 1,
                        RectBorderColor: "#" + route.color, //rgb(34, 139, 34);
                        RectFillColor: (!_.isUndefined(tmpStop.closestMatchingServiceWindow) && tmpStop.closestMatchingServiceWindow.startTimeColor == "red") ? "#FF6446" : "white"
                    };

                    route.timelineObj.timelineList.push(tmpObj);
                }

            } else {
                route.timelineObj = {};
            }
        });
    }

    private getPercentByMinServiceTime() {
        let tmpArr = [];
        for (let j = 0; j < this.globalSettingService.rootJson.routeInfos.length; j++) {
            let route = this.globalSettingService.rootJson.routeInfos[j];
            let hpercent = route.helper ? Number(this.globalSettingService.HelperPercent) : 1;

            for (let i = 0; i < route.stopInfos.length; i++) {
                let tmpStop = route.stopInfos[i];

                let serviceTimeSec = 0;
                if (tmpStop.customerServiceDuration){
                    serviceTimeSec = tmpStop.customerServiceDuration * hpercent;
                }else{
                    if (Number(tmpStop.averageServiceTimeSecond) > 0){
                        serviceTimeSec = Number(tmpStop.averageServiceTimeSecond);
                    }else{
                        serviceTimeSec = Number(tmpStop.customerFixedServiceTimeSecond) + Number(hpercent) * Number(tmpStop.customerDurationSecond);
                    }
            
                    serviceTimeSec == 0 ? 120 : serviceTimeSec;
                }
                
                if (serviceTimeSec > 0) {
                    tmpArr.push(serviceTimeSec);
                }
            }
        }

        let peri = Math.min.apply(null, tmpArr);
        let result = peri / 35;

        return result;
    }
}