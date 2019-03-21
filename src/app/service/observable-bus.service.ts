import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class ObservableBusService {

    private isShowTimelineAnnouncedSource = new Subject<boolean>();
    isShowTimelineAnnounced$ = this.isShowTimelineAnnouncedSource.asObservable();

    isShowTimelineannounce(isShowTimeline: boolean) {
        this.isShowTimelineAnnouncedSource.next(isShowTimeline);
    }

    private showRouteInfoTitleSource = new Subject<string>();
    public showRouteInfoTitle$ = this.showRouteInfoTitleSource.asObservable();

    showRouteInfoTitle(title: string) {
        this.showRouteInfoTitleSource.next(title)
    }


    private loadingAnnouncedSource = new Subject<any>();
    public loading$ = this.loadingAnnouncedSource.asObservable();

    public loading(isShowLoading: any) {
        this.loadingAnnouncedSource.next(isShowLoading);
    }

    private setMarkerSizeAndZindexAnnouncedSource = new Subject<any>();
    public setMarkerSizeAndZindex$ = this.setMarkerSizeAndZindexAnnouncedSource.asObservable();

    public setMarkerSizeAndZindex(arg) {
        this.setMarkerSizeAndZindexAnnouncedSource.next(arg);
    }

    private markForCheckAllOnPushComponentAnnouncedSource = new Subject<string[]>();
    public markForCheckAllOnPushComponent$ = this.markForCheckAllOnPushComponentAnnouncedSource.asObservable();

    public markForCheckAllOnPushComponent(arg?) {
        this.markForCheckAllOnPushComponentAnnouncedSource.next(arg);
    }

    private markForCheckRouteInfoComponentAnnouncedSource = new Subject<string[]>();
    public markForCheckRouteInfoComponent$ = this.markForCheckRouteInfoComponentAnnouncedSource.asObservable();

    public markForCheckRouteInfoComponent(arg) {
        this.markForCheckRouteInfoComponentAnnouncedSource.next(arg);
    }

    private markForCheckRouteTableSummaryComponentAnnouncedSource = new Subject();
    public markForCheckRouteTableSummaryComponent$ = this.markForCheckRouteTableSummaryComponentAnnouncedSource.asObservable();

    public markForCheckRouteTableSummaryComponent() {
        this.markForCheckRouteTableSummaryComponentAnnouncedSource.next();
    }

    private markerClickedOnMapAnnounceSource = new Subject<any>();
    public markerClickedOnMapAnnounceSource$ = this.markerClickedOnMapAnnounceSource.asObservable();

    public markerClickedOnMap(arg) {
        this.markerClickedOnMapAnnounceSource.next(arg);
    }

    private moveStopPanelClickedOnMapAnnounceSource = new Subject<any>();
    public moveStopPanelClickedOnMapAnnounceSource$ = this.moveStopPanelClickedOnMapAnnounceSource.asObservable();

    public moveStopPanelClickedOnMap(arg) {
        this.moveStopPanelClickedOnMapAnnounceSource.next(arg);
    }

    private markerMouseOverOnMapAnnounceSource = new Subject<any>();
    public markerMouseOverOnMapAnnounceSource$ = this.markerMouseOverOnMapAnnounceSource.asObservable();

    public markerMouseOverOnMap(arg) {
        this.markerMouseOverOnMapAnnounceSource.next(arg);
    }

    private mapClickAnnounceSource = new Subject<any>();
    public mapClickAnnounceSource$ = this.mapClickAnnounceSource.asObservable();

    public mapClick(arg?) {
        this.mapClickAnnounceSource.next(arg);
    }

    private polylineMouseOverOnMapAnnounceSource = new Subject<any>();
    public polylineMouseOverOnMapAnnounceSource$ = this.polylineMouseOverOnMapAnnounceSource.asObservable();

    public polylineMouseOverOnMap(arg) {
        this.polylineMouseOverOnMapAnnounceSource.next(arg);
    }

    private showToLoadSheetRouteNameAnnounceSource = new Subject<any>();
    public showToLoadSheetRouteNameAnnounceSource$ = this.showToLoadSheetRouteNameAnnounceSource.asObservable();

    public showToLoadSheetRouteName(arg) {
        this.showToLoadSheetRouteNameAnnounceSource.next(arg);
    }

    private dropEndReplyMarksStateSource = new Subject();
    public dropEndReplyMarksStateSource$ = this.dropEndReplyMarksStateSource.asObservable();

    public dropEndReplayMarksState() {
        this.dropEndReplyMarksStateSource.next();
    }

    private notifyTableIsMutilSource = new Subject();
    public notifyTableIsMutilSource$ = this.notifyTableIsMutilSource.asObservable();

    public notifyTableIsMutil() {
        this.notifyTableIsMutilSource.next();
    }

    private routeInfosCompeletedSource = new Subject();
    public routeInfosCompeletedSource$ = this.routeInfosCompeletedSource.asObservable();

    public routeInfosCompeleted() {
        this.routeInfosCompeletedSource.next()
    }

    private refreshComponentToViewSource = new Subject();
    public refreshComponentToViewSource$ = this.refreshComponentToViewSource.asObservable();

    public refreshComponentToView() {
        this.refreshComponentToViewSource.next();
    }
}
