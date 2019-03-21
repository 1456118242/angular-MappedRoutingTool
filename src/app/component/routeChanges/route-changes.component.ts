import {DialogRef} from "ngx-modialog";
import {RoutePrintDialogPreset} from "../../shared/route-common.dialog.component.context";
import {Component} from "@angular/core";
import {ChangedShopInfo} from '../../shared/interface'


@Component({
    selector: 'route-changes',
    templateUrl: './route-changes.component.html'
})

export class RouteChangesComponent {
    public changeInfos:Array<ChangedShopInfo>;
    constructor(public dialog:DialogRef<RoutePrintDialogPreset>){
        this.dialog.context.contentClassName = "vex-content";
        this.dialog.context.overlayClassName = "vex-overlay";
        document.querySelector('css-dialog-container').className='vex vex-theme-default';
        this.changeInfos = dialog.context.changeInfos;
    }

    onClose() {
        this.dialog.close();
    }
}