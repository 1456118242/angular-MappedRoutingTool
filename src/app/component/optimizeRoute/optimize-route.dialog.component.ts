/**
 * Created by 123 on 2018/4/24.
 */

import {Component, OnInit, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, Input} from '@angular/core'
import {DialogRef} from "ngx-modialog";
import {RoutePrintDialogPreset} from "../../shared/route-common.dialog.component.context";
import * as _ from 'lodash'
import {IMyDateModel, IMyDpOptions} from 'mydatepicker';
import {PromptedMessage} from '../../shared/constant'
import {ObservableBusService} from "../../service/observable-bus.service";
import { ReSequenceDropDownMenuTemplate } from '../../shared/constant';
import {RouteInfo} from "../../shared/route-info.model";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl:'./optimize-route.dialog.component.html'
})
export class OptimizeRouteDialogComponent implements OnInit{
    public routeInfos;
    public maxStopCount;
    public maxCase;
    public reSequenceDropDownMenuTemplate;
    public selectedReSequence;
    public isAllFrom: boolean =false;
    public isAllTo: any = false;
    public TotalStops=0;
    public TotalMaxStopNum=0;
    public TotalCases;
    public TotalMaxCases=0;
    public TotalMaxWeight ="";
    constructor(public dialog:DialogRef<RoutePrintDialogPreset>,private cd: ChangeDetectorRef,private observavle:ObservableBusService){
        this.dialog.context.contentClassName = "vex-content print-summary print-summary-dialog";
        this.dialog.context.overlayClassName = "vex-overlay";
        document.querySelector('css-dialog-container').className='vex vex-theme-default';
        this.dialog.context.isBlocking = true;
        this.reSequenceDropDownMenuTemplate = ReSequenceDropDownMenuTemplate;
        this.selectedReSequence = this.reSequenceDropDownMenuTemplate.keyValues[0].value;
        this.routeInfos = this.dialog.context.rootJson.routeInfos;
        _.forEach(this.routeInfos,(routeInfo:RouteInfo)=>{
            routeInfo.isFormState = false;
            routeInfo.isToState = false;
            this.TotalStops = this.TotalStops+routeInfo.stopInfos.length;
            this.TotalMaxStopNum = this.TotalMaxStopNum+Number(routeInfo.maxStopCount);
            _.forEach(this.dialog.context.rootJson.sumOfCustomColumns,(sumOfCustomColumn)=>{
                if(sumOfCustomColumn.displayText == "Total"){
                    this.TotalCases = sumOfCustomColumn.getValue("Total");
                }
            });
            this.TotalMaxCases = this.TotalMaxCases+Number(routeInfo.maxCases);
            if(routeInfo.maxCargoWeight){
                this.TotalMaxWeight = String(Number(this.TotalMaxWeight)+Number(routeInfo.maxCargoWeight));
            }
        });
        if(this.TotalMaxWeight == "0" || _.isNaN(this.TotalMaxWeight)){
            this.TotalMaxWeight = ""
        }
    }


    saveMapPointHandler(){
    }

    onDateChanged(event: IMyDateModel) {
    }

    ngOnInit(): void {

    }

    Optimize(){

        const fromRouteInfos = _.filter(this.routeInfos,(routeInfo)=>{
            return routeInfo.isFormState;
        });
        const toRouteInfos = _.filter(this.routeInfos,(routeInfo)=>{
            return routeInfo.isToState;
        });
        const  userInput = {};
        userInput["fromRouteInfos"] = [];
        userInput["toRouteInfos"] = [];
        userInput["fromRouteInfos"] = fromRouteInfos;
        userInput["toRouteInfos"] = toRouteInfos;
        userInput["selectedReSequence"] = Number(this.selectedReSequence);
        if(fromRouteInfos.length == 0 && toRouteInfos.length == 0 ){
            // userInput["fromRouteInfos"] = this.routeInfos;
            // userInput["toRouteInfos"] = []
            alert(PromptedMessage.optimizeRouteInfoNoSelectedFromRouteAndToRoute)
            return;
        }
        if(fromRouteInfos.length == 0){
            alert(PromptedMessage.optimizeRouteInfoNoSelectedFromRoute);
            return;
        }
        if(toRouteInfos.length == 0 ){
            alert(PromptedMessage.optimizeRouteInfoNoSelectedToRoute);
            return;
        }
        this.dialog.close(userInput);
    }

    dialogClose(){
        this.dialog.close();
    }

    onSelectReSequence(){

    }

    onIsAllFrom() {
        _.forEach(this.routeInfos,(routeinfo)=>{
         routeinfo.isFormState = this.isAllFrom;
        })
    }

    onIsAllTo() {
        _.forEach(this.routeInfos,(routeinfo)=>{
            routeinfo.isToState = this.isAllTo;
        })
    }

    getTotal(routeInfo) {
        let total = "";
         _.forEach(routeInfo.customColumns,(customcolum)=>{
            if(customcolum.field ==  'Total'){
                 total = customcolum.value;
            }
        });
        return total;
    }

    changeStopCount(){
        this.TotalMaxStopNum =0;
        _.forEach(this.routeInfos,(routeInfo)=>{
            this.TotalMaxStopNum = this.TotalMaxStopNum+routeInfo.maxStopCount;
        })
    }

    changeMaxCases() {
        this.TotalMaxCases =0;
        _.forEach(this.routeInfos,(routeInfo)=>{
            this.TotalMaxCases = this.TotalMaxCases+Number(routeInfo.maxCases);
        })
    }
}
