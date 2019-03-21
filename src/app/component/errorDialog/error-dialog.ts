/**
 * Created by 123 on 2018/4/24.
 */

import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit} from '@angular/core'
import {DialogRef} from "ngx-modialog";
import {RoutePrintDialogPreset} from "../../shared/route-common.dialog.component.context";

@Component({
    templateUrl:"./error-dialog.html"
})
export class ErrorDialogComponent implements AfterViewInit {
   public errorInfo;
   public actionInfo;
   public count = 0;
    constructor(public dialog:DialogRef<RoutePrintDialogPreset>){
        this.dialog.context.contentClassName = "vex-content print-summary print-summary-dialog";
        this.dialog.context.overlayClassName = "vex-overlay";
        this.count = this.dialog.context.count;
        document.getElementsByTagName('css-dialog-container')[this.count].className='vex vex-theme-default';
        this.dialog.context.isBlocking = true;
        this.actionInfo = this.dialog.context.action;
        this.errorInfo = this.escapeHtmlstr(this.dialog.context.errorInfo);

    }
    saveMapPointHandler(){

    }

    ngAfterViewInit(){
        document.querySelectorAll('#errorInfo')[this.count].innerHTML = this.errorInfo;
    }

    closeThisDialog(){
        this.dialog.close();
    }
    escapeHtmlstr(olddata) {
        var htmlArr = olddata.replace(/\\/g, "\\\\").replace(/\\/g, "\\/").replace(/\'/g, "\\\'").split('\n');
        var len = htmlArr.length;
        var outArr = [];
        for (var i = 0; i < htmlArr.length; i++) {
            if (htmlArr[i] !== '') {
                if (i === len - 1) {
                    outArr.push("\'" + htmlArr[i] + "\'");
                } else {
                    outArr.push("\'" + htmlArr[i] + "\',\n");
                }
            }
        }
        return outArr.join("");
    };

}
