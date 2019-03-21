import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {DialogRef, ModalComponent} from "ngx-modialog";
import {RoutePrintDialogPreset} from "../../shared/route-common.dialog.component.context";
import {RouteInfo} from "../../shared/route-info.model";
/**
 * Created by 123 on 2018/5/2.
 */
@Component({
    encapsulation: ViewEncapsulation.None,
    templateUrl:'./route-send-message.dialog.component.html'
})
export class RouteSendMessageComponent implements OnInit,ModalComponent<RoutePrintDialogPreset>{

    public routeInfo:RouteInfo;
    public dataService;
    constructor(public dialog:DialogRef<RoutePrintDialogPreset>){
        this.dialog.context.contentClassName = "vex-content";
        this.dialog.context.overlayClassName = "vex-overlay";
        document.querySelector('css-dialog-container').className='vex vex-theme-default';
        this.dialog.context.isBlocking = true;
        this.routeInfo = this.dialog.context.routeInfo;
        this.dataService = this.dialog.context.dataService;
    }

    ngOnInit(): void {

    }
    sendMessage():void{
        this.dialog.close();
        this.dataService.sendMessage(this.routeInfo.deliveryman,this.routeInfo.routeName,this.routeInfo.startTime);
    }
    closeThisDialog():void{
        this.dialog.close();
    }

}
