import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    QueryList,
    ViewChildren
} from "@angular/core";
import {DialogRef} from "ngx-modialog";
import {RoutePrintDialogPreset} from "../../shared/route-common.dialog.component.context";
import * as _ from 'lodash';

@Component(
    {
        changeDetection: ChangeDetectionStrategy.OnPush,
        selector:'select-routes-in-mapped-routing',
        templateUrl:'select-routes-in-mapped-routing.component.html'
    }
)

export class SelectRoutesInMappedRoutingComponent  implements OnInit{


    public LoadSheets;
    public pageOfLoadSheet:Array<any>;
    public loadSheetIds = new Map<string,boolean>();
    public isChanged;
    public locationIDstr;
    public lSDatestr;
    public loadSheetIDstr;
    public isAll;
    public routeInfos;


    private data;
    @ViewChildren('Id',{read:ElementRef})Ids:QueryList<ElementRef> ;
    private dataService;

    constructor(public dialog:DialogRef<RoutePrintDialogPreset>,public cd:ChangeDetectorRef){
        this.dialog.context.contentClassName = "vex-content";
        this.dialog.context.overlayClassName = "vex-overlay";
        document.querySelector('css-dialog-container').className='vex vex-theme-default';
        this.dialog.context.isBlocking = true;
        this.dataService = this.dialog.context.dataService;
        this.isChanged = this.dialog.context.isSaveChange;
        this.lSDatestr = this.dialog.context.lSDatestr;
        this.loadSheetIDstr = this.dialog.context.loadSheetIDstr;
        this.routeInfos = this.dialog.context.routeInfos;
        this.loadSheetIDstr.split('|').forEach((loadSheetID)=>{
            this.loadSheetIds.set(loadSheetID,true);
        });
        this.locationIDstr = this.dialog.context.locationIDstr;
        this.dataService.selectLocationAndData().then(
            (data)=>{
                this.data = data.text();
                window.document.getElementById('date').innerHTML = this.data;
                this.setSelected(window.document.getElementById('LSDate'),this.lSDatestr.split(','));
                this.setSelected(window.document.getElementById('LocationID'),this.locationIDstr.split(','));
            })
    }

    searchRoute(){
        let date = this.getSelectValues(window.document.getElementById('LSDate'));
        let location = this.getSelectValues(window.document.getElementById('LocationID'));
        console.log(date.join(','));
        console.log(location.join(','));
        this.dataService.searchLoadSheetByLocationAndDate(location.join(','),date.join(',')).then((result)=>{
            this.LoadSheets = result.json().LoadSheets;
            this.buildRouteNum(this.LoadSheets);
            this.LoadSheets = this.sortByRouteNum(this.LoadSheets,'RouteNum');
            this.cd.markForCheck();
        });

    }

    dialogClose(){
        this.dialog.close();

    }

    ngOnInit(): void {
        this.dataService.searchLoadSheetByLocationAndDate(this.locationIDstr.split(','),this.lSDatestr.split(',')).then((result)=>{
            this.LoadSheets = result.json().LoadSheets;
            this.buildRouteNum(this.LoadSheets);
            this.LoadSheets = this.sortByRouteNum(this.LoadSheets,'RouteNum');
            this.cd.markForCheck();
        });

    }

    getSelectValues(select) {
        let result = [];
        let options = select && select.options;
        let opt;

        for (let  i=0, iLen=options.length; i<iLen; i++) {
            opt = options[i];

            if (opt.selected) {
                result.push(opt.value || opt.text);
            }
        }
        return result;
    }

    setSelected(select,values){
        let options = select && select.options;
        let opt;
        for (let  i=0, iLen=options.length; i<iLen; i++) {
            opt = options[i];
            for(let j=0;j<values.length;j++){
                if(opt.value == values[j]){
                    opt.selected=true;
                }
            }
        }
    }

    onChangePage(pageOfItems: Array<any>){
        this.pageOfLoadSheet = pageOfItems;
        this.isAllChecked();
    }

    SelectRoute(){
        let loadSheetStr="|";
        this.LoadSheets.forEach((route)=>{
            if(route['isChecked']){
                loadSheetStr=loadSheetStr+route.LoadSheetID+'|';
            }
        });
        this.dialog.close(loadSheetStr);
    }

    isChecked(loadId){
        const Idindex = this.loadSheetIDstr.indexOf(loadId);
        if(Idindex == -1){
            return false;
        }else {
            return true;
        }
    }

    private buildRouteNum(LoadSheets: any) {
        _.forEach(LoadSheets,(loadSheet)=>{
            if(this.loadSheetIDstr.indexOf(loadSheet.LoadSheetID) != -1){
                loadSheet['isChecked'] = true;
            }else {
                loadSheet['isChecked'] = false;
            }
            const route = _.find(this.routeInfos,(routeInfo)=>{
               return loadSheet.LoadSheetID == routeInfo.id;
            });
            if(route){
                loadSheet.TotalCases = _.find(route.customColumns,(custom)=>{
                    return custom.displayText == 'Total'
                }).value;
                loadSheet.stopCount = route.stopInfos.length;
            }
            if(loadSheet.TotalCases == ''){
                loadSheet.TotalCases = 0;
            }


        })
    }

    selectAllRoute(event) {
        this.Ids.forEach((element)=>{
           this.setPageAllSelected(element.nativeElement.value,event.target.checked);
        });

    }

    private sortByRouteNum(array: any, field: string) {
        array.sort((a: any, b: any) => {
            if (a[field] < b[field]) {
                return -1;
            } else if (a[field] > b[field]) {
                return 1;
            } else {
                return 0;
            }
        }
        );
        _.filter(array,(route)=>{
            if(this.loadSheetIDstr.indexOf(route.LoadSheetID) != -1){
                _.remove(array,(loadSheet)=>{
                    return loadSheet['LoadSheetID'] == route.LoadSheetID
                });
                array.unshift(route);
                return true;
            }else {
                return false;
            }
        });

        return array;
    }

    isAllChecked() {
        const isAllTrue = _.findIndex(this.pageOfLoadSheet,(route)=>{
            return route['isChecked'] == true
        });
        const isAllFalse = _.findIndex(this.pageOfLoadSheet,(route)=>{
            return route['isChecked'] == false
        });
        if(isAllTrue!=-1 && isAllFalse==-1){
            this.isAll = true;
        }
        if(isAllTrue==-1 && isAllFalse!=-1){
            this.isAll = false;
        }
        if (isAllFalse !=-1 && isAllTrue !=-1){
            this.isAll =false;
        }
    }

    private setPageAllSelected(value: any, checked: any) {
        let route = _.find(this.LoadSheets,(route)=>{
            return route.LoadSheetID == value;
        });
        route.isChecked = checked;
    }

}