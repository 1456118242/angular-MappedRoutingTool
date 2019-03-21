/**
 * Created by 123 on 2018/4/24.
 */

import {Component, OnInit, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core'
import {DialogRef} from "ngx-modialog";
import {RoutePrintDialogPreset} from "../../shared/route-common.dialog.component.context";
import * as _ from 'lodash'
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {IMyDateModel, IMyDpOptions} from 'mydatepicker';
import {ObservableBusService} from "../../service/observable-bus.service";

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl:'./route-add-loadsheet.dialog.component.html'
})
export class RouteaAddLoadSheetComponent implements OnInit{
    public dataService;
    public globalSettingService;
    public routeNames;
    public routeName;
    public diliverymans;
    public diliveryman;
    public routeNamesLoading;
    public routeUserLoading;
    public date;
    private modal;
    public isbeforeunloadHandler;
    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'mm/dd/yyyy',
    };
    public model: any = { date: { year: new Date().getFullYear(), month: new Date().getMonth()+1, day: new Date().getDate() } };
    public routeNamesTypeahead = new Subject<string>();
    public routeUserNameTypeahead = new Subject<string>();
    constructor(public dialog:DialogRef<RoutePrintDialogPreset>,private cd: ChangeDetectorRef,private observavle:ObservableBusService){
        this.dialog.context.contentClassName = "vex-content addLoadSheet";
        this.dialog.context.overlayClassName = "vex-overlay";
        document.querySelector('css-dialog-container').className='vex vex-theme-default';
        this.dialog.context.isBlocking = true;
        this.dataService = this.dialog.context.dataService;
        this.modal = this.dialog.context.modal;
        this.globalSettingService = this.dialog.context.globalSettingService;
        this.isbeforeunloadHandler = this.dialog.context.isbeforeunloadHandler;
    }

    onDateChanged(event: IMyDateModel) {
        this.date = event.formatted
    }

    ngOnInit(): void {
        this.dataService.getRoute().then((response) => {
            this.routeNames = response.json().result;
        });
        this.dataService.getUsers().then((response) => {
            this.diliverymans = response.json().result;
        });
        this.routeNameTypeahead();
        this.routeUserTypeahead();
    }
    LoadSheetAdd(){
        let  alertInfo = "The Following Fields are Required\n\n";
        if(!this.routeName){
            alertInfo += "RouteID\n"
        }
        if(!this.diliveryman){
            alertInfo += "Deliveryman\n"
        }
        if(!this.date){
            let datestr ='';
            datestr = new Date().getMonth()+1+'/'+new Date().getDate()+'/'+new Date().getFullYear();
            this.date = datestr;
        }
        if(!this.routeName||!this.diliveryman||!this.date){
            alert(alertInfo);
            return ;
        }
        const addLoadSheetData = {"routeName":this.routeName,"diliveryman":this.diliveryman,"date":this.date};
        this.dialog.close(addLoadSheetData);
    }
    dialogClose(){
        this.dialog.close();
    }
    routeNameTypeahead(){
        this.routeNamesTypeahead.pipe(
            tap(() => this.routeNamesLoading = true),
            distinctUntilChanged(),
            debounceTime(200),
            switchMap(term => this.dataService.loadRoutes(term)),
        ).subscribe((x:any) => {
            this.routeNames = x.json().result;
            this.routeNamesLoading = false;
            this.cd.markForCheck();
        }, () => {
            this.routeNames = [];
        });
    }


    addPlan(result){
        let href = window.location.href;
        this.isbeforeunloadHandler.isbeforeunloadHandler = false;
        let str = href.match(/PlanID_List=(\S*)&/)[1]+result.json()+"|";
        let newhref =href.replace(/PlanID_List=(\S*)&/,"PlanID_List="+str+"&");
        window.location.href = newhref;
        this.observavle.loading(false);
    }

    routeUserTypeahead(){
        this.routeUserNameTypeahead.pipe(
            tap(() => this.routeUserLoading = true),
            distinctUntilChanged(),
            debounceTime(200),
            switchMap(term => this.dataService.loadUsers(term)),
        ).subscribe((x:any) => {
            this.diliverymans = x.json().result;
            this.routeUserLoading = false;
            this.cd.markForCheck();
        }, () => {
            this.diliverymans = [];
        });
    }


}
