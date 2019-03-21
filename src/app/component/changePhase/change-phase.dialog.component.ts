import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import { PhaseType } from "../../shared/constant"
import {RoutePrintDialogPreset} from "../../shared/route-common.dialog.component.context";
import {DialogRef} from "ngx-modialog";

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl:'./change-phase.dialog.component.html'
})
export class ChangePhaseDialogComponent implements OnInit{

    public  stopInfo;
    public  phaseList = PhaseType ;
    public  phase;
    public  routePlanner;

    constructor(public dialog:DialogRef<RoutePrintDialogPreset>){
        this.stopInfo = this.dialog.context.stopInfo;
        this.dialog.context.contentClassName = "vex-content addLoadSheet";
        this.dialog.context.overlayClassName = "vex-overlay";
        this.phase = this.dialog.context.stopInfo.phase;
        document.querySelector('css-dialog-container').className='vex vex-theme-default';
    }

    ngOnInit(): void {
    }

    closeDialog(){
        this.dialog.close()
    }

    changePhase(){
        this.dialog.close(this.phase);
    }

}