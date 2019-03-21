import {Injectable} from '@angular/core';

import * as _ from 'lodash';

// import {} from "../shared/declarations";

import {FieldValueObject} from "../shared/field-value-object.model";
import {RouteInfo} from "../shared/route-info.model";
import {StopInfo} from '../shared/stop-info.model';
import {GlobalSettingService} from "./global-setting.service";
import {RequestedRoute} from "./mapService/requested-routes.model";
import {RequestedStop} from "./mapService/requested-stop.model";
import {TimeFieldObject} from "../shared/time-field-object.model";
import {ColumnOptionDropDownMenuTemplate} from "../shared/constant";

@Injectable()
export class UtilService {
  constructor(public globalSettingService: GlobalSettingService){

  }

  sumOfValueByRouteInfo(routeInfo: RouteInfo): any {
    let result = [];
    _.forEach(routeInfo.fieldValueObjects, (fieldValueObj) => {
      result.push(this.sumOfValueByStopInfos(routeInfo.stopInfos, fieldValueObj.field));
    });

    return result;
  };

  sumOfValueByStopInfos(stopInfos: Array<StopInfo>, field: string) {
    let result = 0;
    _.forEach(stopInfos, function (stopInfo) {
      // const unmUnitObj = _.find( stopInfo.fieldValueObjects, function ( fieldValueObj ) {
      //   return fieldValueObj.field == field;
      // } );

      result = result + Number(stopInfo[field]);
    });

    return result;
  }

  getRequestObj(location: any): any {
    const url: string = location.search;
    if (url.indexOf("?") != -1) {
      let search = url.substr(1);
      let requestStrArr = search.split("&");
      let requestObj = {};
      for (let i = 0; i < requestStrArr.length; i++) {
        let requestArr = requestStrArr[i].split("=");
        requestObj[requestArr[0]] = unescape(requestArr[1]);
      }
      return requestObj;
    }

    return null;
  }

  convertTimeNumberToAMPMStr(timeNum: any): string {
    let timeStr = "";
    if (timeNum != 0) {
      let hour: any = Math.abs(parseInt(timeNum / 3600));
      let minutes: any  = Math.abs(Math.round((timeNum - hour * 3600) / 60));
      //Task 419533 Issue with the Start and end time on the event not matching the Start and end time on the plan
     //let seconds = parseInt( (timeNum - hour * 3600 - minutes * 60) );

      // if ( seconds > 30 ) {
      //   minutes++;
      // }

      if ( minutes == 60 ) {
        hour++;
        minutes = 0;
      }

      hour = hour % 24;

      if (hour > 12) {
        timeStr = (hour - 12) + ":" + (minutes >= 10 ? minutes.toString() : "0" + minutes) + " PM";
      } else if (hour == 12) {
        timeStr = "12:" + (minutes >= 10 ? minutes.toString() : "0" + minutes) + " PM";
      } else {
        timeStr = hour + ":" + (minutes >= 10 ? minutes.toString() : "0" + minutes) + " AM";
      }
    }
    return this.timeFormat(timeStr);
  }

  convertTimeStrToNumber(timeStr: string): number {
    let resultTime = 0;

    if (timeStr != "" && !_.isUndefined(timeStr) && !_.isNull(timeStr)) {
      let timeArr = timeStr.split(" ");
      let hour = parseInt(timeArr[0].split(":")[0]);
      let minutes = parseInt(timeArr[0].split(":")[1]);
      if (timeArr.length > 1) {
        let myAMPM = timeArr[1];
        if (myAMPM == "PM" && hour != 12) {
          hour = 12 + hour;
        }
      }

      resultTime = hour * 3600 + minutes * 60;
    }

    return resultTime;
  }

  convertTimeStrToNumberByDateTime(timeStr: string): number {
    //2016/11/16 15:30:00
    //2016/11/16 3:30:00 PM
    let resultTime = 0;

    if (timeStr != "" && !_.isUndefined(timeStr) && !_.isNull(timeStr)) {
      let timeArr = timeStr.split(" ");
      let tmpArg = timeArr[1];

      if (!_.isNull(timeArr[2]) && !_.isUndefined(timeArr[2]) && timeArr[2].toUpperCase() == "PM") {
        tmpArg = tmpArg + " " + timeArr[2];
      }

      resultTime = this.convertTimeStrToNumber(tmpArg);
    }

    return resultTime;
  }

  convertTimeNumberToStr(timeNum: number): string {
    let hour: number = parseInt(timeNum / 3600);
    let minutes: number = parseInt((timeNum - hour * 3600) / 60);
    //Task 419533 Issue with the Start and end time on the event not matching the Start and end time on the plan
    //let seconds: number = parseInt(timeNum - hour * 3600 - minutes * 60);

    // if (seconds > 30) {
    //   minutes++;
    // }
    if (minutes == 60) {
      hour++;
      minutes = 0;
    }
    return hour + ":" + (minutes < 10 ? "0" + minutes.toString() : minutes.toString());
  }

  // convertMeterToMiles(value: any, milesConversionConstant: number):number {
  //   let result = Number(value);
  //
  //   try {
  //     result = Number((value / milesConversionConstant).toFixed(2));
  //   } catch (err) {
  //
  //   }
  //
  //   return result;
  // }

  convertTimeStrToServerFormateNumber(timeStr: string): string {
    let resultTime = this.convertTimeStrToNumber(timeStr);
    let formatResult = "";
    if (resultTime != 0) {
      let tmpMinutesNum = (resultTime % 3600) / 60;
      formatResult = Math.floor((resultTime / 3600)) + "" + (tmpMinutesNum >= 10 ? tmpMinutesNum : "0" + tmpMinutesNum);
    }

    return formatResult;
  }

  convertValidTimeNumStr(timeValue: string): string {
    let result: string = "0";
    try {
      let tmpArr = timeValue.split(" ");
      let myAMPM = "";

      if (tmpArr.length > 1) {
        myAMPM = tmpArr[1].toUpperCase();
      }

      tmpArr = tmpArr[0].split(":");

      let hour = parseFloat(tmpArr[0]);
      if (myAMPM == "PM" && hour < 12) {
        hour = 12 + hour;
      }

      let minute = tmpArr[1] || "";
      result = hour + "" + minute;
    } catch (ex) {
      console.log(ex);
    }

    return isNaN(result) ? "0" : result;
  }

  toAbsURL(url){
  let a = document.createElement('a');
  a.href = url;
  return a.href;
}

  formatNumber(originalValue: any): any {
    let value = originalValue.toString();
    let value1, value2;

    if (!_.isUndefined(value) && value.indexOf(".") > 0) {
      let tmpValue = value.split(".");
      value1 = tmpValue[0];
      value2 = tmpValue[1];
    } else {
      value1 = value.toString();
      value2 = "";
    }

    if (value1.length <= 3) {
      return value1 + (value2 == "" ? "" : "." + value2);
    } else {
      return this.formatNumber(value1.substr(0, value1.length - 3)) + ',' + value1.substr(value1.length - 3) + (value2 == "" ? "" : "." + value2);
    }
  }

  formatTime(value): string {
    let IsPM = value.toUpperCase().indexOf("PM") > 0;
    let Hour, Minute;
    value = value.match(/[0-9:]/ig);
    if (value === null || value === "") {
      return "";
    } else if (value.length > 0) {
      value = value.join("");
    }

    if (value.indexOf(":") < 0) {
      var len = value.length;
      if (len < 3) {
        Hour = value;
        Minute = "00";
      } else if (len == 3) {
        Hour = value.substr(0, 1);
        Minute = value.substr(1, 3);
      } else {
        Hour = value.substr(0, 2);
        Minute = value.substr(2, 2);
      }
    } else {
      let TimeComponents = [];
      TimeComponents = value.split(" ");
      let Time = value;
      let HoursMinutes = [];
      HoursMinutes = Time.split(":");
      Hour = HoursMinutes[0];
      Minute = HoursMinutes[1];
    }

    if (IsPM) {
      if (Hour > 12 && Hour < 24) {
        Hour -= 12;
      } else if (Hour == 24 && UserTimeFormat != 2) {
        Hour = 12;
        IsPM = false;
      } else if (Hour == 24 && UserTimeFormat == 2) {
        Hour = 0;
        IsPM = false;
      }
    } else {
      if (Hour > 12 && Hour < 24) {
        Hour -= 12;
        IsPM = true;
      } else if (Hour == 12 && UserTimeFormat != 2) {
        Hour = 12;
        IsPM = true;
      } else if ((Hour == 0 || Hour == 24) && UserTimeFormat != 2) {
        Hour = 12;
      } else if (Hour == 24 && UserTimeFormat == 2) {
        Hour = 0;
      }
    }

    if (Hour > 24) {
      return "";
    } else {
      Hour = parseInt(Hour);
    }

    if (Minute == "" || Minute == undefined) {
      Minute = "00";
    } else if (Minute > 59) {
      return "";
    }

    if (Minute.length < 2) {
      Minute = "0" + Minute;
    }
    //
    //switch (UserTimeFormat) {
    //    case 2:
    //        if (IsPM) {
    //            value = (Hour + 12) + ":" + Minute;
    //        } else {
    //            value = Hour + ":" + Minute;
    //        }
    //        break;
    //    default:
    if (IsPM) {
      value = Hour + ":" + Minute + " PM";
    } else {
      value = Hour + ":" + Minute + " AM";
    }
    //break;
    //}

    return value;
  }

  getRedOrBlackColorByServiceWindow(flag): string {
    return flag ? "black" : "red";
  }

  isUndefinedOrNull(value): boolean {
    return _.isUndefined(value) || _.isNull(value);
  }

  convertMeterToMiles(value: any) {
    let result = Number(value);

    try {
      result = Number((value / this.globalSettingService.MilesConversionConstant).toFixed(1));
    } catch (err) {

    }

    return result;
  }

  timeFormat( timeString ) {
  let timeFormatedString = "";
  if (this.globalSettingService.rootJson.timeFormat.toString() == "2" ) {//24hour
    if ( timeString.indexOf( ":" ) > -1 ) { //4:30 PM
      let hourNum = Number( timeString.split( ":" )[ 0 ] );
      let tmpStr = timeString.split( ":" )[ 1 ];
      let minuteNum = tmpStr.split( " " )[ 0 ];
      let amPmStr = tmpStr.split( " " )[ 1 ];
      if ( !_.isUndefined( amPmStr ) && amPmStr.toUpperCase() == "PM" && hourNum != 12 ) {
        hourNum += 12;
      }
      timeFormatedString = hourNum + ":" + minuteNum;
    } else {//4 PM
      let tmpStr = timeString.split( " " );
      let amPmStr = tmpStr[ 1 ];
      let hourNum = Number( tmpStr[ 0 ] );
      if ( !_.isUndefined( amPmStr ) && amPmStr.toUpperCase() == "PM" && hourNum != 12 ) {
        hourNum += 12;
      }

      timeFormatedString = hourNum.toString();
    }

    return timeFormatedString;
  } else {
    return timeString;
  }

};

  getStraightLineDistance(lat1: any, lng1: any, lat2: any, lng2: any) {

    if (_.isEmpty(lat1) || _.isEmpty(lng1) || _.isEmpty(lat2) || _.isEmpty(lng2)) {
      return 0;
    }

    let radLat1 = lat1 * Math.PI / 180.0;
    let radLat2 = lat2 * Math.PI / 180.0;
    let a = radLat1 - radLat2;
    let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s
  }

  getStartTimeMin() {
  let hourArr = [];
  const _self = this;

  _.forEach( this.globalSettingService.rootJson.routeInfos, function ( routeInfo ) {
    hourArr.push( _self.getTimeObj( routeInfo.startTime ).hour );
  } );

  return Math.min.apply( null, hourArr );
}

  getEndTimeMax() {
  let hourArr = [];
  const _self = this;

  _.forEach( this.globalSettingService.rootJson.routeInfos, function ( routeInfo ) {
    if ( routeInfo.stopInfos.length > 0 && routeInfo.endTime != "" ) {
      hourArr.push( _self.getTimeObj( routeInfo.endTime ).hour );
    }
  } );

  return Math.max.apply( null, hourArr );
}

  getTimeObj( timeStr:any ) {
  let timeArr = timeStr.split( " " );
  let hour = parseInt( timeArr[ 0 ].split( ":" )[ 0 ] );
  let minutes = parseInt( timeArr[ 0 ].split( ":" )[ 1 ] );
  if ( timeArr.length > 1 ) {
    let myAMPM = timeArr[ 1 ];
    if ( myAMPM == "PM" && hour != 12 ) {
      hour = 12 + hour;
    }
  }

  return {
    hour: hour,
    minutes: minutes
  };
}

  print( id ) {
    let tmpNode:any =  document.getElementById(id).cloneNode( true );
  let  printContents =tmpNode.innerHTML;
  //var printContents = document.getElementById( id ).innerHTML;
  let  popupWin = window.open( '', '_blank', 'width=' + window.screen.availWidth + ',height=' + window.screen.availHeight );
  //popupWin.document.open();
  //popupWin.className = "print-summary-dialog";
  popupWin.document.write( '<html><head></head><body onload="window.print()" >' + printContents + '</html>' );
  popupWin.document.close();
  }

  dateFormat( dateString ,dataForma:number=this.globalSettingService.rootJson.dateFormat) {

      let dateFormatedString = "";
    try {
      let dateStringSplitList = dateString.split( "/" );
      let yearString = dateStringSplitList[ 0 ];
      if ( yearString.length == 4 ) {
        let monthString = dateStringSplitList[ 1 ];
        let dayString = dateStringSplitList[ 2 ];
        switch ( dataForma.toString() ) {
          case "1":
            dateFormatedString = monthString + "/" + dayString + "/" + yearString;
            break;
          case "2":
            dateFormatedString = yearString + "-" + monthString + "-" + dayString;
            break;
          case "3":
            dateFormatedString = dayString + "." + monthString + "." + yearString;
            break;
          default :
            dateFormatedString = monthString + "/" + dayString + "/" + yearString;
        }
        return dateFormatedString;
      } else {
        return dateString;
      }
    } catch ( e ) {
      return dateString;
    }

    }

  dateAndTimeFormat() {
    let date = new Date();
    let yearString = date.getFullYear();
    let monthString = Number(date.getMonth()) + 1;
    let dayString = date.getDate();
    let hourString = date.getHours();
    let minuteString = date.getMinutes();
    let dateFormatedString = "";
    let amPmString = "";
    switch (this.globalSettingService.rootJson.dateFormat.toString()) {
      case "1":
        dateFormatedString = monthString + "/" + dayString + "/" + yearString;
        break;
      case "2":
        dateFormatedString = yearString + "-" + monthString + "-" + dayString;
        break;
      case "3":
        dateFormatedString = dayString + "." + monthString + "." + yearString;
        break;
      default:
        dateFormatedString = monthString + "/" + dayString + "/" + yearString;
    }
    switch (this.globalSettingService.rootJson.timeFormat.toString()) {
      case "1":
        if (Number(hourString) >= 12) {
          amPmString = "PM";
          if (Number(hourString) > 12) {
            hourString = Number(hourString) - 12;
          }
        } else {
          amPmString = "AM";
        }
        dateFormatedString += " " + hourString + ":" + minuteString + amPmString;
        break;
      case "2":
        dateFormatedString += " " + hourString + ":" + minuteString;
        break;
    }
    return dateFormatedString;

}

    changeCustomerDuration(CustomerDuration: any, StopsperWeek: any) {
        let stopsPerWeek = Number(StopsperWeek);
        let tmpCustomerDuration = stopsPerWeek == 0 ? 0 : CustomerDuration / stopsPerWeek;
        return tmpCustomerDuration;
    }

    round(number: number) {
            var result;
            var numberStr = number.toString().split( "." );

            if (numberStr.length > 1) {
                if (_.startsWith( numberStr[ 1 ], "5" )) {
                    result = parseInt( _.round( number + 0.1, 0 ) );
                } else if (numberStr[ 0 ] == "0") {
                    result = 1;
                } else {
                    result = parseInt( _.round( number, 0 ) );
                }
            } else {
                result = parseInt( number );
            }
            return result;
    }
}
