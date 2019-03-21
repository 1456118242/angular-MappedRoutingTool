/**
 * Created by 123 on 2018/4/24.
 */

import {Component,OnInit,Output,EventEmitter} from '@angular/core'
import {DialogRef} from "ngx-modialog";
import {RoutePrintDialogPreset} from "../../shared/route-common.dialog.component.context";

@Component({
  templateUrl:'./route-choose-point.dialog.component.html'
})
export class RouteChoosePointComponent{
  public mapPointID;
  public mapPoints;
  constructor(public dialog:DialogRef<RoutePrintDialogPreset>){
    this.dialog.context.contentClassName = "vex-content";
    this.dialog.context.overlayClassName = "vex-overlay";
    document.querySelector('css-dialog-container').className='vex vex-theme-default';
    this.dialog.context.isBlocking = true;
    this.mapPointID = this.dialog.context.mapPointID;
    this.mapPoints = this.dialog.context.mapPoints.MapPointsJson;
  }
  saveMapPointHandler(){
    this.dialog.close(this.mapPointID);
  }

  closeThisDialog(){
    this.dialog.close();
  }

}
