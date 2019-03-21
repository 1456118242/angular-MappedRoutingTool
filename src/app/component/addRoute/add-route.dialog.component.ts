import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {DialogRef} from "ngx-modialog";
import {RoutePrintDialogPreset} from "../../shared/route-common.dialog.component.context";
import {Subject} from "../../../../node_modules/rxjs";
import * as _ from "lodash";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl:'./add-route.dialog.component.html'
})
export class AddRouteDialogComponent implements OnInit{

    public dataService;
    public routeNames;
    public routeNamesLoading = false;
    public routeName;
    public routeNamesTypeahead  = new Subject<string>();
    public customerInfo = {
        isShow: false
    };

    constructor(public dialog:DialogRef<RoutePrintDialogPreset>){
        this.dataService = this.dialog.context.dataService;
        this.dialog.context.contentClassName = "vex-content addLoadSheet";
        this.dialog.context.overlayClassName = "vex-overlay";
        document.querySelector('css-dialog-container').className='vex vex-theme-default';
    }

    ngOnInit(): void {
        this.dataService.getRouteOfSearchStr("").then((response) => {
            this.routeNames = response.json().CustomersJson;
        });
        this.routeNameTypeahead();
    }
    routeNameTypeahead(){
        this.routeNamesTypeahead.pipe(
            tap(() => this.routeNamesLoading = true),
            distinctUntilChanged(),
            debounceTime(200),
            switchMap(term => this.dataService.getRouteOfSearchStr(term)),
        ).subscribe((x:any) => {
            this.routeNames = x.json().CustomersJson;
            this.routeNamesLoading = false;
        }, () => {
            this.routeNames = [];
        });
    }

    searchCustomerInfo() {
        let name = encodeURIComponent(this.routeName);
        const self = this;
        this.dataService.getCustomer(name).then(function(result){
            if(result.statusText == "OK"){
                let resultData = result.json().CustomersJson[0];
                if(!_.isNull(resultData) && !_.isUndefined(resultData)){
                    self.customerInfo = resultData;
                    self.customerInfo.isShow = true;
                }else{
                    self.customerInfo["isNotFound"] = true;
                }

            }
        })
    }

    closeDialog(){
        this.dialog.close();
    }

    addCustomer(customerInfo) {
        this.dialog.close(customerInfo);
    }

    selectedName(event) {
        this.routeName = event.CustomerNumCompany;
    }
}