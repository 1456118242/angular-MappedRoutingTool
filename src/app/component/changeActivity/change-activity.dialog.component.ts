import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {RoutePrintDialogPreset} from "../../shared/route-common.dialog.component.context";
import {DialogRef} from "ngx-modialog";

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl:'./change-activity.dialog.component.html'
})
export class ChangeActivityDialogComponent implements OnInit{
    public stopInfo;
    public activityList;
    public activity;

    constructor(public dialog:DialogRef<RoutePrintDialogPreset>){
        this.stopInfo = this.dialog.context.stopInfo;
        this.activityList = this.dialog.context.activityList
        this.dialog.context.contentClassName = "vex-content addLoadSheet";
        this.dialog.context.overlayClassName = "vex-overlay";
        this.activity = this.dialog.context.stopInfo.activity;
        document.querySelector('css-dialog-container').className='vex vex-theme-default';
    }
    ngOnInit(): void {

    }

    closeDialog() {
        this.dialog.close();
    }

    changeActivity(){
        this.dialog.close(this.activity);
    }
}