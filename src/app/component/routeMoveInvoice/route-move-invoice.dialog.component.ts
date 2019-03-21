/**
 * Created by 123 on 2018/4/24.
 */

import {Component, OnInit, Output, EventEmitter, AfterViewInit, ChangeDetectionStrategy} from '@angular/core'
import {DialogRef} from "ngx-modialog";
import {RoutePrintDialogPreset} from "../../shared/route-common.dialog.component.context";
import {ObservableBusService} from "../../service/observable-bus.service";
import * as _ from 'lodash'

@Component({
    templateUrl:'./route-move-invoice.dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteMoveInvoiceComponent {

    public selectedOption;
    public dataService;
    public stop;
    public selectedObj;
    public loadSheetList;
    constructor(public dialog:DialogRef<RoutePrintDialogPreset>,public oberverble:ObservableBusService){
        this.dialog.context.contentClassName = "vex-content";
        this.dialog.context.overlayClassName = "vex-overlay";
        document.querySelector('css-dialog-container').className='vex vex-theme-default';
        this.dialog.context.isBlocking = true;
        this.dataService = this.dialog.context.dataService;
        this.selectedOption = this.dialog.context.loadSheetFilted;
        this.loadSheetList = this.dialog.context.result.json().LoadSheetJson;
        this.stop = this.dialog.context.stopInfo;
        this.selectedObj = this.dialog.context.loadSheetFilted;
    }
    saveMapPointHandler(){

    }

    ngAfterViewInit(){

    }

    closeThisDialog(){
        this.dialog.close();
    }

    updateWorkout(event){
        this.selectedObj = _.find(this.loadSheetList,(loadSheet)=>{
            return loadSheet.LoadSheetID == event
        });

    }

    moveInvoiceSave(loadSheetID){
        this.oberverble.loading(true);
        let LoadSheetIDInvoiceIDObjList = [];
        let tmpLoadSheetIDInvoiceIDObj = {
            DestLoadSheetID: loadSheetID,
            InvoiceIDArr: []
        };
        _.forEach( this.stop.invoices, function ( invoice ) {
            tmpLoadSheetIDInvoiceIDObj.InvoiceIDArr.push(invoice);
        } );
        LoadSheetIDInvoiceIDObjList.push(tmpLoadSheetIDInvoiceIDObj);

        this.dataService.moveInvoiceAndSave( JSON.stringify(LoadSheetIDInvoiceIDObjList) ).then((r)=>{
            this.dialog.close(r);
        })
    }

}
