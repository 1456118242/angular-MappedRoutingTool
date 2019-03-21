import {Component,OnInit,ViewEncapsulation,Output,EventEmitter} from '@angular/core'
import { DialogRef,ModalComponent } from 'ngx-modialog';
// import { DialogPreset } from 'ngx-modialog/plugins/vex';
import  {
  RoutePrintDialogPreset,
} from '../../shared/route-common.dialog.component.context'
import { RouteInfo } from '../../shared/route-info.model'
import {RootJson} from "../../shared/root-json.model";
import * as _ from 'lodash';

@Component({
  encapsulation: ViewEncapsulation.None,
  templateUrl:'./route-print-summary.dialog.component.html'
})

export class RoutePrintSummaryComponent implements OnInit ,ModalComponent<RoutePrintDialogPreset>{
  public message: string;
  public routeInfos :Array<RouteInfo>;
  public rootData:RootJson;
  public printService;
    public notShowFields:string;
  constructor(public dialog:DialogRef<RoutePrintDialogPreset>){
    this.dialog.context.contentClassName = "vex-content print-summary print-summary-dialog";
    this.dialog.context.overlayClassName = "vex-overlay";
    document.querySelector('css-dialog-container').className='vex vex-theme-default';
    this.dialog.context.isBlocking = true;
    this.routeInfos = this.dialog.context.routeJson.routeInfos;
    this.printService = this.dialog.context.printService;
    this.rootData = this.dialog.context.routeJson;
      this.notShowFields = 'Color,Vehicle,Helper,SendMessage';
  }

  ngOnInit(){

  }
  onClose(){
      this.dialog.close();
  }
  onOk(): void {
    this.printService.printSummery("printSummary");
  }
  sumOfStopCount(){
    return _.sumBy(this.rootData.routeInfos, (r) => { return r.stopInfos.length})
  }
}

