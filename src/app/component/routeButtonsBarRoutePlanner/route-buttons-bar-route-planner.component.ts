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
    selector: 'route-buttons-bar-route-planner',
    templateUrl: './route-buttons-bar-route-planner.component.html',
    providers: []
})

export class RouteButtonsBarRoutePlannerComponent {


    @Input() currentPhase:string;

    @Output() onSaveChanges = new EventEmitter();
    @Output() onPrintSummary = new EventEmitter();
    @Output() onPrint = new EventEmitter();
    @Output() onOpenOptimizeRoute = new EventEmitter<any>();
    @Output() onSelectRoutes = new EventEmitter();
    @Output() onDeselectRoute = new EventEmitter();
    @Output() onAddRoute = new EventEmitter();
    @Output() onChangePhase = new EventEmitter<any>();
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

    public printHandler() {
        this.onPrint.emit();
    };

    changePhase(event) {
        this.onChangePhase.emit(event);
    }

    public saveChangesHandler() {
        this.onSaveChanges.emit();
    };

    openOptimizeRoute() {
        this.onOpenOptimizeRoute.emit();
    }

    selectRoutesHander() {
        this.onSelectRoutes.emit();
    }

    deselectRouteHandler() {
        this.onDeselectRoute.emit();
    }

    addRouteHandler() {
        this.onAddRoute.emit();
    }

    openMapView() {
        this.IsMultiWidow = !this.IsMultiWidow;
        this.onOpenMapView.emit(this.IsMultiWidow);
    }

    selectColumns() {
        this.onSelectColumns.emit()
    }
}
