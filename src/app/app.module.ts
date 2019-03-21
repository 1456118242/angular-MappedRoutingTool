import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Router} from '@angular/router'
import {LocationStrategy, HashLocationStrategy, DecimalPipe, CommonModule} from '@angular/common';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ReSequenceService} from "./service/re-sequence.service";
import {ObservableBusService} from "./service/observable-bus.service";
import {MappedRoutingForPlanService} from "./mappedRoutingForPlan/mapped-routing-for-plan.service";
import {RepositoryService} from "./service/repository.service";
import {RoutePlannerService} from "./routePlanner/route-planner.service";
import {PrintService} from "./service/print.service";
import {UtilService} from "./service/util.service";
import {MappedRoutingService} from "./mappedRouting/mapped-routing.service";
import {GlobalSettingService} from "./service/global-setting.service";
import {mapExceptionService} from "./service/mapException.service";
import {MapService} from "./service/mapService/map.service";
import {MoveStopPanelOnMapService} from "./service/move-stop-panel-on-map.service";
import {DataService} from "./service/data.service";
import {TimeLineService} from "./service/timeline-service";
import {RouteSendMessageComponent} from "./component/routeSendMessage/route-send-message.dialog.component";
import {RoutePrintRoutePlanner} from "./component/routePrint/route-print-route-planner";
import {RouteChoosePointComponent} from "./component/routeChoosePiont/route-choose-point.dialog.component";
import {RoutePrintComponent} from "./component/routePrint/route-print.dialog.component";
import {OptimizeRouteDialogComponent} from "./component/optimizeRoute/optimize-route.dialog.component";
import {RouteaAddLoadSheetComponent} from "./component/addLoadSheet/route-add-loadsheet.dialog.component";
import {RouteMoveInvoiceComponent} from "./component/routeMoveInvoice/route-move-invoice.dialog.component";
import {MoveStopToOtherRouteDialogComponent} from "./component/moveStopToOtherRoute/move-stop-to-other-route.dialog.component";
import {ErrorDialogComponent} from "./component/errorDialog/error-dialog";
import {RoutePrintSummaryComponent} from "./component/routePrint";
import {RouteExceptgeocodeComponent} from "./component/routeExceptgeocode/route-exceptgeocode";
import {RoutePrintForPlanComponent} from "./component/routePrint/route-print-for-plan.dialog.component";
import {SelectRoutesComponent} from "./component/selectRoutes/select-routes.component";
import {ChangeActivityDialogComponent} from "./component/changeActivity/change-activity.dialog.component";
import {ChangePhaseDialogComponent} from "./component/changePhase/change-phase.dialog.component";
import {RoutePrintOptionComponent} from "./component/routePrint/route-print-option.dialog.component";
import {MappedRoutingComponent} from "./mappedRouting/mapped-routing.component";
import {StopSummaryPanelOnMap} from "./component/stopSummaryPanelOnMap/stop-summary-panel-on-map.component";
import {MappedRoutingForPlanComponent} from "./mappedRoutingForPlan/mapped-routing-for-plan.component";
import {ToolsBarComponent} from "./component/toolsbar";
import {RouteTableSummeryRoutePlannerComponent} from "./component/routeTableSummeryRoutePlanner/route-table-summery-route-planner.component";
import {RouteTableSummeryForPlanComponent} from "./component/routeTableSummeryForPlan/route-table-summery-for-plan.component";
import {stopsPerWeekFormatPipe} from "./customPipes/stopsPerWeekFormat.pipe";
import {RouteSummaryPanelOnMap} from "./component/routeSummaryPanelOnMap/route-summary-panel-on-map.component";
import {RoutePlannerComponent} from "./routePlanner/route-planner.component";
import {calculateSumOfStopsPerWeekPipe} from "./customPipes/calculateSumOfStopsPerWeek.pipe";
import {RouteButtonsbar} from "./component/routeButtonsBar";
import {CustomerInfoComponent} from "./component/customerInfo";
import {LoadingComponent} from "./component/loading";
import {phaseFormatPipe} from "./customPipes/phaseFormat.pipe";
import {PhaseSelectPanelComponent} from "./component/phaseSelectPanel/phase-select-panel.component";
import {RouteInfoComponent} from "./component/routeInfo";
import {RouteTableSummeryComponent} from "./component/routeTableSummery";
import {DropDownMenuComponent} from "./component/dropDownMenu";
import {calculateSumOfCasePipe} from "./customPipes/calculateSumOfCase.pipe";
import {NgSelectModule} from "@ng-select/ng-select";
import {VexModalModule} from "ngx-modialog/plugins/vex";
import {DndModule} from "ngx-drag-drop";
import {FormsModule} from "@angular/forms";
import {MyDatePickerModule} from "mydatepicker";
import {ModalModule} from "ngx-modialog";
import {HttpModule} from "@angular/http";
import {HttpInterceptorModule} from "ng-http-interceptor";
import {WindowRef} from "./service/windowRef.service";
import {DataForPlanService} from "./service/data-for-plan.service";
import {DataRoutePlannerService} from "./service/data-route-planner.service";
import {Ng2Webstorage} from '@rars/ngx-webstorage';
import {SelectRoutesInMappedRoutingComponent} from "./component/selelctRoutesInMappedRouting/select-routes-in-mapped-routing.component";
import {JwPaginationComponent} from "jw-angular-pagination";
import {AddPlanInForPlanDialog} from "./component/addPlanInForPlan/add-plan-in-for-plan.dialog";
import {AddRouteDialogComponent} from "./component/addRoute/add-route.dialog.component";
import {RouteButtonsBarForPlanComponent} from "./component/routeButtonsBarForPlan/route-buttons-bar-for-plan.component";
import {RouteButtonsBarRoutePlannerComponent} from "./component/routeButtonsBarRoutePlanner/route-buttons-bar-route-planner.component";
import {RouteChangesComponent} from "./component/routeChanges/route-changes.component";
import { UserTableColumnDiolgComponent } from './component/userTableColumnDiolg/user-table-column-diolg.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpModule,
        HttpInterceptorModule,
        NgSelectModule,
        ModalModule.forRoot(),
        VexModalModule,
        MyDatePickerModule,
        Ng2Webstorage,
        DndModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        RoutePlannerComponent,
        RouteButtonsBarForPlanComponent,
        RouteButtonsBarRoutePlannerComponent,
        RouteTableSummeryRoutePlannerComponent,
        AddPlanInForPlanDialog,
        SelectRoutesInMappedRoutingComponent,
        ChangePhaseDialogComponent,
        ChangeActivityDialogComponent,
        MoveStopToOtherRouteDialogComponent,
        SelectRoutesComponent,
        RoutePrintRoutePlanner,
        MappedRoutingForPlanComponent,
        RoutePrintForPlanComponent,
        RouteTableSummeryForPlanComponent,
        MappedRoutingComponent,
        RouteSendMessageComponent,
        RouteTableSummeryComponent,
        RouteMoveInvoiceComponent,
        DropDownMenuComponent,
        CustomerInfoComponent,
        RouteButtonsbar,
        LoadingComponent,
        RouteInfoComponent,
        ToolsBarComponent,
        StopSummaryPanelOnMap,
        ErrorDialogComponent,
        RoutePrintSummaryComponent,
        RoutePrintComponent,
        AddRouteDialogComponent,
        RouteExceptgeocodeComponent,
        RoutePrintOptionComponent,
        RouteaAddLoadSheetComponent,
        RouteChoosePointComponent,
        PhaseSelectPanelComponent,
        OptimizeRouteDialogComponent,
        RouteChangesComponent,
        JwPaginationComponent,
        RouteSummaryPanelOnMap,
        phaseFormatPipe,
        calculateSumOfStopsPerWeekPipe,
        stopsPerWeekFormatPipe,
        calculateSumOfCasePipe,
        UserTableColumnDiolgComponent,
    ],
    bootstrap: [AppComponent],
    providers: [
        MapService,
        RoutePlannerService,
        MappedRoutingService,
        MappedRoutingForPlanService,
        MoveStopPanelOnMapService,
        ObservableBusService,
        UtilService,
        GlobalSettingService,
        RepositoryService,
        ReSequenceService,
        DataService,
        DataForPlanService,
        DataRoutePlannerService,
        PrintService,
        mapExceptionService,
        DecimalPipe,
        WindowRef,
        TimeLineService,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ],
    entryComponents: [
        ErrorDialogComponent,
        UserTableColumnDiolgComponent,
        RoutePrintSummaryComponent,
        RoutePrintComponent,
        AddPlanInForPlanDialog,
        SelectRoutesInMappedRoutingComponent,
        RoutePrintOptionComponent,
        RouteaAddLoadSheetComponent,
        RouteChangesComponent,
        RouteChoosePointComponent,
        OptimizeRouteDialogComponent,
        RouteSendMessageComponent,
        RouteMoveInvoiceComponent,
        RoutePrintForPlanComponent,
        RoutePrintRoutePlanner,
        SelectRoutesComponent,
        ChangePhaseDialogComponent,
        ChangeActivityDialogComponent,
        AddRouteDialogComponent,
        MoveStopToOtherRouteDialogComponent,
        RouteExceptgeocodeComponent
    ]
})
export class AppModule {
    constructor(router: Router) {
    }
}
