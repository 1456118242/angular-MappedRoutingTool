import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {DialogRef} from "ngx-modialog";
import {RoutePrintDialogPreset} from "../../shared/route-common.dialog.component.context";
import * as _ from "lodash";

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl:'move-stop-to-other-route.dialog.component.html'
})
export class MoveStopToOtherRouteDialogComponent implements OnInit{
    public stopInfo;
    public routeInfo;
    public tmpRouteList;
    private allRouteList;
    constructor(public dialog:DialogRef<RoutePrintDialogPreset>){
        this.stopInfo = this.dialog.context.stopInfo;
        this.routeInfo = this.dialog.context.routeInfo;
        this.allRouteList = this.dialog.context.allRoute;
        this.dialog.context.contentClassName = "vex-content addLoadSheet";
        this.dialog.context.overlayClassName = "vex-overlay";
        document.querySelector('css-dialog-container').className='vex vex-theme-default';
    }


    ngOnInit(): void {
         this.tmpRouteList = this.getAllRouteListByRouteVersionID( this.routeInfo.routeVersionID, this.allRouteList );
    }

    combineStopAction() {
        let event = {};
        event["tmpRouteList"] = this.tmpRouteList;
        event["routeInfo"] = this.routeInfo;
        this.dialog.close(event)
    }

    getAllRouteListByRouteVersionID( routeVersionID, allRouteList ) {
        let  tmpRouteList = _.filter( allRouteList, function ( route ) {
            return route.RouteVersionID == routeVersionID;
        } );
        return tmpRouteList;
    }

    closeDialog(){
        this.dialog.close();
    }

    phaseFormat(flag) {
        var tmpValue;
        switch (flag) {
            case "All":
                tmpValue = "All";
                break;
            case "13":
                tmpValue = "1 & 3";
                break;
            case "24":
                tmpValue = "2 & 4";
                break;
            case "1":
                tmpValue = "1 only";
                break;
            case "2":
                tmpValue = "2 only";
                break;
            case "3":
                tmpValue = "3 only";
                break;
            case "4":
                tmpValue = "4 only";
                break;
        }
        return tmpValue;
    }
}