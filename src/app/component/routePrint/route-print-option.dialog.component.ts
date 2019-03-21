/**
 * Created by 123 on 2018/4/25.
 */
import {
  Component, OnInit, ViewEncapsulation, Output, EventEmitter, OnChanges, OnDestroy,
  AfterViewInit
} from '@angular/core'
import {DialogRef, ModalComponent} from 'ngx-modialog';
import {
  Modal,
} from 'ngx-modialog/plugins/vex';
import  {RoutePrintDialogPreset} from '../../shared/route-common.dialog.component.context'
import {RouteInfo} from '../../shared/route-info.model'
import * as _ from 'lodash';
import {ObservableBusService} from "../../service/observable-bus.service";


@Component({
  encapsulation: ViewEncapsulation.None,
  templateUrl: './route-print-option.dialog.component.html'
})

export class RoutePrintOptionComponent implements OnInit,OnDestroy{



  public message: string;
  public selectAll:boolean ;
  public salesColumnGroupName;
  public routeJson;
  public printService;
  public mapService;
  public mapRoutingService;
  public printOptionList = [{
    isSelected: true,
    selectName: "Customer List"
  }, {
    isSelected: false,
    selectName: "Driving Directions"
  }, {
    isSelected: false,
    selectName: "Map"
  }];

  public listelements;
  public routeInfos: Array<RouteInfo>;

  constructor(public dialog: DialogRef<RoutePrintDialogPreset>,public modal:Modal,public observable:ObservableBusService) {
    this.dialog.context.contentClassName = "vex-content";
    this.dialog.context.overlayClassName = "vex-overlay";
    this.dialog.context.isBlocking = true;
    document.querySelector('css-dialog-container').className='vex vex-theme-default';
    this.message = this.dialog.context.message;
    this.routeInfos = this.dialog.context.routeJson.routeInfos;
    this.listelements = new Array<Object>();
    this.salesColumnGroupName = this.dialog.context.routeJson.salesColumnGroupName;
    this.routeJson = this.dialog.context.routeJson;
    this.printService = this.dialog.context.printService;
    this.mapRoutingService = this.dialog.context.mapRoutingService;
    this.mapService = this.dialog.context.mapService;
    _.forEach( this.routeInfos,  ( route ) => {
      var tmpObj = {
        isSelected: false,
        selectName: route.routeName,
        route: route
      };
      this.listelements.push( tmpObj );
    } );
  }


  ngOnInit() {

  }

  onClose() {
    this.dialog.close();
  }

  onOk(): void {

    if(_.find(this.listelements,(element)=>{return element.isSelected == true})){
        const componentContext = <RoutePrintDialogPreset>{routeJson:this.routeJson, salesColumnGroupName:this.routeJson.salesColumnGroupName,printOptionList:this.printOptionList,
            listelements:this.listelements,printService:this.printService,mapService:this.mapService,mapRoutingService:this.mapRoutingService};
      this.dialog.close(componentContext);
    }else {
      alert("Please select a Route to print");
    }


  }
  ngOnDestroy(): void {
  }
  masterChange(){
    _.forEach(this.listelements,(element)=>{
      element.isSelected = this.selectAll;
    })
  }
  cbChange(){
    var cbFalseSelect = _.find( this.listelements, function ( cb ) {
      return cb.isSelected === false;
    } );

    if ( !_.isUndefined( cbFalseSelect ) ) {
      this.selectAll = false;
    } else {
      this.selectAll = true;
    }
  }
}
