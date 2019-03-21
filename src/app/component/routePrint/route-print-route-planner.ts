/**
 * Created by 123 on 2018/4/25.
 */
import {
    Component, OnInit, ViewEncapsulation, AfterViewInit, ChangeDetectionStrategy
} from '@angular/core'
import {DialogRef, ModalComponent} from 'ngx-modialog';
// import { DialogPreset } from 'ngx-modialog/plugins/vex';
import  {RoutePrintDialogPreset} from '../../shared/route-common.dialog.component.context'
import {RouteInfo} from '../../shared/route-info.model'
import { Modal } from 'ngx-modialog/plugins/vex';
import { } from './route-print.dialog.component'
import * as _ from 'lodash'
import {ObservableBusService} from "../../service/observable-bus.service";
import {ShowColumnOption} from "../../shared/constant"

@Component({
    templateUrl: './route-print-route-planner.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class RoutePrintRoutePlanner  {

    public salesColumnGroupName;
    public printOptionList;
    public  nowTime;
    public listelements;
    objectKeys = Object.keys;
    public routeInfos: Array<RouteInfo>;
    public fieldLength:number = 4;
    public printService;
    public printSumCustomColumn;
    public rootData;
    public mapService;
    public mapRoutingService;
    public showColumnOption;
    public sumOfCase;
    public requestRouteArray = [];
    public googleMapOption ={
        center: { lat: 40.1451, lng: -99.6680 },
        zoom: 13,
    };
    public instructionObjList = [];
    private googleMap;
    private tempList = [];

    constructor(public dialog: DialogRef<RoutePrintDialogPreset>,public modal:Modal,public observable:ObservableBusService) {
        this.dialog.context.contentClassName = "vex-content print-summary";
        this.dialog.context.overlayClassName = "vex-overlay";
        document.getElementsByTagName('css-dialog-container')[1].className='vex vex-theme-default';
        this.dialog.context.isBlocking = true;
        this.printOptionList = this.dialog.context.printOptionList;
        this.salesColumnGroupName = this.dialog.context.salesColumnGroupName;
        this.routeInfos = this.dialog.context.routeJson.routeInfos;
        this.rootData = this.dialog.context.routeJson;
        this.listelements = this.dialog.context.listelements;
        this.fieldLength = this.dialog.context.routeJson.salesColumnGroupName.length+3;
        this.printService = this.dialog.context.printService;
        this.mapService = this.dialog.context.mapService;
        this.mapRoutingService = this.dialog.context.mapRoutingService;
        this.printService.lSdataFormat(this.routeInfos);
        this.nowTime = this.printService.dateAndTimeFormat();
        this.printService.addCustomerReceiptToStop(this.listelements);
        this.printService.addTotalCustomerReceiptToRoute(this.listelements);
        this.showColumnOption = ShowColumnOption;
        _.forEach(this.salesColumnGroupName,(groupName)=>{
            this.showColumnOption[groupName] = {
                columnName: groupName,
                isShow: false
            }
        });

        // this.printSumCustomColumn = this.filterFromCustomColumn();
    }
    ngAfterViewInit(): void {
        if(this.printOptionList[2].isSelected||this.printOptionList[1].isSelected){
            this.mapService.initMap(document.getElementById( "print-map" ),this.googleMapOption);
            this.listelements.forEach((element)=>{
                if(element.isSelected){
                    this.requestRouteArray.push(this.mapRoutingService.buildRequestedRouteByRouteInfo(element.route));
                }
            });
            this.mapService.calculateRoutesByPrint(this.requestRouteArray,0,this.mapService.googleMaps[1]).then(
                (instructionObjList)=>{
                    this.mapService.setMapCenter(this.requestRouteArray,this.mapService.googleMaps[1]);
                    this.observable.loading(false);
                    this.instructionObjList = instructionObjList;
                }
            );
        }else {
            this.observable.loading(false);
        }
    }

    printHandler(){
        const _self = this;
        if ( this.printOptionList[ 2 ].isSelected ) {
            // this.observable.loading(true);
            _self.observable.loading(true);
            html2canvas( document.getElementById( "print-map" ), {
                useCORS: true,
                onrendered: function ( canvas ) {
                    var tmpPng = canvas.toDataURL( "image/png" );
                    var imageElment = <HTMLImageElement>document.getElementById( "google-map-image" );
                    document.getElementById("column-option" ).style.display = "none";
                    document.getElementById( "print-map" ).style.display = "none";
                    imageElment.style.display = "inline";
                    imageElment.src = tmpPng;
                    imageElment.onload = function () {
                        _self.observable.loading(false);
                        _self.printService.printSummery( "printDiv" );
                    };
                    if(_self.mapService.googleMaps.length>1){
                        _self.mapService.googleMaps.pop();
                    }
                    _self.dialog.close();

                }
            } );
        }else {
            document.getElementById("column-option" ).style.display = "none";
            document.getElementById( "print-map" ).style.display = "none";
            this.printService.printSummery('printDiv');
            if(_self.mapService.googleMaps.length>1){
                _self.mapService.googleMaps.pop();
            }
        }
    }
    closeThisDialog(){
        this.dialog.close();
        if(this.mapService.googleMaps.length>1){
            this.mapService.googleMaps.pop();
        }
    }

    onOk(): void {

    }

}
