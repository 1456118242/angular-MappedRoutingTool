import {ChangeDetectorRef, Component, Input, OnInit} from "@angular/core";
import {DialogRef} from "ngx-modialog";
import {RoutePrintDialogPreset} from "../../shared/route-common.dialog.component.context";
import * as _ from 'lodash';

@Component({
  templateUrl:'./select-routes.html',
})

export class SelectRoutesComponent implements OnInit{

    public routeVersionObjList;
    public showRouteList;

    constructor(public dialog:DialogRef<RoutePrintDialogPreset>){
        this.dialog.context.contentClassName = "vex-content print-summary";
        this.dialog.context.overlayClassName = "vex-overlay";
        document.querySelector('css-dialog-container').className='vex vex-theme-default';
        this.routeVersionObjList = this.getRouteVersionObjList(this.dialog.context.allRoute,this.dialog.context.routeInfos);
        this.showRouteList = this.routeVersionObjList[0].routeList;
    }

    ngOnInit(): void {
    }

    getRouteVersionObjList(allRouteList,Routes){
        let returnList = [];
        let tmpList = _.cloneDeep(allRouteList );
        let tmpRouteList = [];
        let routeIDList = [];
        _.forEach(Routes,function(r){
            routeIDList.push( r.RouteID);
        });

        _.forEach(tmpList,function(t){
            if(_.indexOf(routeIDList, t.RouteID) === -1 ){
                tmpRouteList.push(t);
            }
        });
        let showRouteVersionObj = _.groupBy(tmpRouteList,function(a){
            a.thisRouteSelected = false;
            return a.RouteVersionDescription;
        });
        _.forIn(showRouteVersionObj,function(v,k){
            let tmpObj = {
                routeVersionDescription: k,
                routeList: v,
                isChecked:false
            };
            returnList.push(tmpObj);
        });

        returnList[0].isChecked = true;
        return returnList;
    }

    closeThisDialog(){
        this.dialog.close();
    }


    changeShowRouteList(routeVersionObj){
        this.showRouteList = routeVersionObj.routeList;
    }

    combineSelectRouteAction () {
        var tmpList = [];
        _.forEach( this.routeVersionObjList, function ( r ) {
            _.forEach( r.routeList, function ( l ) {
                if (l.thisRouteSelected === true) {
                    tmpList.push( l )
                }
            } );
        } );
        let routesIDRouteVersionIDStr = "";
        if(tmpList.length>0){
            _.forEach( tmpList, function ( t, index ) {
                routesIDRouteVersionIDStr += t.RouteID + "|";
            } );
            this.dialog.close(routesIDRouteVersionIDStr);

        }
    };
}