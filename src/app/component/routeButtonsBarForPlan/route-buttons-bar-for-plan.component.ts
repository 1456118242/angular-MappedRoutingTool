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
    selector: 'route-buttons-bar-for-plan',
    templateUrl: './route-buttons-bar-for-plan.component.html',
    providers: []
})

export class RouteButtonsBarForPlanComponent {

    @Input() isAutoRoute: boolean;
    @Input() isSaveLoadSheetAndRoute: boolean;
    @Input() currentPhase:string;

    @Output() onSaveChanges = new EventEmitter();
    @Output() onPrintSummary = new EventEmitter();
    @Output() onPrint = new EventEmitter();
    @Output() onAddPlan = new EventEmitter<any>();
    @Output() onReCalculate = new EventEmitter<any>();
    @Output() onBackOptimizerHandler = new EventEmitter<any>();
    @Output() onOpenMapView = new EventEmitter<any>();
    @Output() onSelectColumns = new EventEmitter<any>();

    public IsMultiWidow = false;

    constructor(public observableBusService: ObservableBusService) {
        this.observableBusService.notifyTableIsMutilSource$.subscribe(() => {
            this.IsMultiWidow = true;
        });
        this.isAutoRoute = false
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

    public saveChangesHandler() {
        this.onSaveChanges.emit();
    };

    addPlanHandler() {
        this.onAddPlan.emit();
    }

    reCalculateHandler() {
        this.onReCalculate.emit()
    }

    openMapView() {
        this.IsMultiWidow = !this.IsMultiWidow;
        this.onOpenMapView.emit(this.IsMultiWidow);
    }

    selectColumns() {
        this.onSelectColumns.emit()
    }
}
