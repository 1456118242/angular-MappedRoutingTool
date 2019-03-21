/**
 * Created by 123 on 2018/3/27.
 */
import {
    Component,
    EventEmitter,
    Output,
    Input,
    OnInit,
    AfterViewInit,
    ElementRef,
    ViewChildren, ViewChild
} from '@angular/core';
import {QueryList} from "@angular/core";
import {E} from "@angular/core/src/render3";
import {ObservableBusService} from "../../service/observable-bus.service";


@Component({
    selector: 'route-buttons-bar',
    templateUrl: './route-buttons-bar.component.html',
    providers: []
})

export class RouteButtonsbar implements OnInit {


    @Input() isAutoRoute: boolean;
    @Input() isSaveLoadSheetAndRoute: boolean;

    @Output() onSaveChanges = new EventEmitter();
    @Output() onChangeSaveOption = new EventEmitter<boolean>();
    @Output() onChangeAutoRouteOption = new EventEmitter<boolean>();
    @Output() onCreateZeroInvoiceEvents = new EventEmitter();
    @Output() onPrintSummary = new EventEmitter();
    @Output() onPrint = new EventEmitter();
    @Output() onChangeTimelineStatus = new EventEmitter<boolean>();
    @Output() onAddLoadSheet = new EventEmitter();
    @Output() onBackOptimizerHandler = new EventEmitter<any>();
    @Output() onOpenOptimizeRoute = new EventEmitter<any>();
    @Output() onSelectRoutes = new EventEmitter();
    @Output() onOpenMapView = new EventEmitter<any>();
    @Output() onSelectColumns = new EventEmitter<any>();

    public IsMultiWidow = false;
    public isShowTimeline: boolean = false;

    constructor(public observableBusService: ObservableBusService) {
        this.observableBusService.notifyTableIsMutilSource$.subscribe(() => {
            this.IsMultiWidow = true;
        });
    }

    public printSummaryHandler() {
        this.onPrintSummary.emit();
    };

    public backOptimizerHandler() {
        this.onBackOptimizerHandler.emit();
    };

    public printHandler() {
        this.onPrint.emit();
    };

    public showTimelineHandler() {
        this.isShowTimeline = !this.isShowTimeline;
        this.onChangeTimelineStatus.emit(this.isShowTimeline);
    };

    public saveOptionHandler(val) {
        this.onChangeSaveOption.emit(val);
    }

    public selectAutoRouteHandler(event) {
        this.onChangeAutoRouteOption.emit(event.target.checked);
    }

    public saveChangesHandler() {
        this.onSaveChanges.emit();
    };

    public createZeroInvoiceEventsHandler() {
        this.onCreateZeroInvoiceEvents.emit();
    }

    public showLoadSheetAdd() {
        this.onAddLoadSheet.emit();
    };

    ngOnInit(): void {

        this.isAutoRoute = false
    }

    openOptimizeRoute() {
        this.onOpenOptimizeRoute.emit();
    }

    openMapView() {
        this.IsMultiWidow = !this.IsMultiWidow;
        this.onOpenMapView.emit(this.IsMultiWidow);
    }

    selectRoutes() {
        this.onSelectRoutes.emit();
    }

    clickaotoRoute() {
        this.isAutoRoute = !this.isAutoRoute;
    }

    selectColumns() {
        this.onSelectColumns.emit()
    }
}
