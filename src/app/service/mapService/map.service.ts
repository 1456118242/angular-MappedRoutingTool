import {Observable} from 'rxjs/Observable';

import {} from "@types/googlemaps"
import * as _ from 'lodash';
import {flatten} from "lodash";
import {} from "../../shared/declarations"

import {RequestedStop} from './requested-stop.model'
import {RequestedRoute} from './requested-routes.model'

import {
    DefaultGoogleMapOption,
    GoogleMaploadWayPointsEveryTime,
    NormalSizeShapeCoords,
    BigSizeShapeCoords
} from '../../shared/constant'

import LatLng = google.maps.LatLng;
import DirectionsRequest = google.maps.DirectionsRequest;
import {MoveStopPanelOnMapService} from "../move-stop-panel-on-map.service";
import {Injectable} from "@angular/core";
import {ObservableBusService} from "../observable-bus.service";
import {GlobalSettingService} from "../global-setting.service";
import {WindowRef} from "../windowRef.service";
import MapsEventListener = google.maps.MapsEventListener;

@Injectable()
export class MapService {

    googleMaps: Array<google.maps.Map>;
    polylines: Array<any>;
    markers: Array<any>;
    drawingManager: google.maps.drawing.DrawingManager;
    isDrawPolygon: boolean;
    selectedStopStrs: Array<string> = [];
    polylineMouseoverListener:Array<MapsEventListener> = [];

    constructor(public moveStopPanelOnMapService: MoveStopPanelOnMapService, public observableBusService: ObservableBusService,public globalSettingService: GlobalSettingService,public window:WindowRef) {
        this.googleMaps = [];
        this.polylines = [];
        this.markers = [];
        this.drawingManager = null;
        this.isDrawPolygon = false;
        this.observableBusService.dropEndReplyMarksStateSource$.subscribe(()=>{
            const selectedMarks = _.filter(this.markers,(marker)=>{
                return marker.isSelectedOnMap;
            });
            _.forEach(selectedMarks,(selectedMark)=>{
                this.setMarkerIcon(selectedMark,"#EAEE4F");
            })
        });
    }

    initMap(mapContainerElement: any, mapOption: any = DefaultGoogleMapOption) {
        this.googleMaps.push(new google.maps.Map(mapContainerElement, mapOption));
    }

    calculateRoutes(requestedRoutes: Array<RequestedRoute>, i: number = 0, mapInstance: google.maps.Map = this.googleMaps[0]) {
        const _self = this;

        return new Promise((resolve, reject) => {
            const requestedRoute = requestedRoutes[i];
            const oneRouteLatLngList = _self.buildLatLngListByRoute(requestedRoute);
            const requests = _self.buildRequestList(oneRouteLatLngList);
            const directionsService = new google.maps.DirectionsService;
            requestedRoute.calculateDirectionsByManual = false;

            if ( requestedRoute.requestStops.length >= 100 || this.globalSettingService.isDrawRoutesByManual) {
                _self.calculateDirectionsByManual(requestedRoute).then(successCallback, failedCallback);
            } else {
                setTimeout(function () {
                    _self.calculateDirections(directionsService, requests).then(successCallback, failedCallback);
                }, i * 10 + 500);
            }


            function successCallback(responseList) {
                _self.setDurationAndDistanceToRequestedRoute(responseList, requestedRoute);
                _self.drawRoute(responseList, requestedRoute, mapInstance);

                ++i;
                if (i < requestedRoutes.length) {
                    resolve(_self.calculateRoutes(requestedRoutes, i, mapInstance));
                } else {
                    resolve();
                }
            }

            function failedCallback(responseList) {
                _self.calculateDirectionsByManual(requestedRoute).then(successCallback);
                // if (responseList.status === "ZERO_RESULTS"){
                //     if ( requestedRoutes[ i ].requestStops.length > 0 ) {
                //         _self.mapExceptionService.addExceptionRoute( requestedRoutes[ i ], oneRouteLatLngList );
                //     }
                //
                //     ++i;
                //     if ( i < requestedRoutes.length ) {
                //         resolve(_self.calculateRoutes( requestedRoutes, i, mapInstance));
                //     } else {
                //         resolve(_self.calculateDirectionsCompleted())
                //
                //     }
                // }else {
                //     alert(requestedRoutes[ i ].id + " " + requestedRoutes[ i ].name +"\n " + 'Directions request failed due to ' + responseList.status);
                // }
            }
        });

    }
    calculateDirectionsCompleted(  ) {
        // return new Promise((resolve, reject)=>{
        //     let exceptionObjList = this.mapExceptionService.getExceptionObjList();
        //     if ( exceptionObjList.length > 0 ) {
        //         this.mapExceptionService.handlerExceptionRoute().then( function ( exceptionRouteAndStopList ) {
        //             show dialog
        //             showSetLocationDialog( exceptionRouteAndStopList ).then( function ( reRouteList ) {
        //                 var customerList = [];
        //                 _.forEach( exceptionRouteAndStopList, function ( exceptionRouteAndStop ) {
        //                     customerList.push( exceptionRouteAndStop.exceptionStop );
        //                 } );
        //                 mappedRoutingService.buildSaveCustomerLocation( customerList );
        //                 mapExceptionService.clearExceptionObjList();
        //
        //                 deferred.resolve( reRouteList );
        //             }, function () {
        //                 // click closed icon
        //                 deferred.resolve();
        //             } );
        //
        //         }, function () {
        //             //can not find exception stop
        //             let tmpRouteList = _.map( exceptionObjList, 'route' );
        //             resolve( tmpRouteList );
        //         } );
        //     } else {
        //         resolve();
        //     }
        // });
    }

    calculateRoutesByPrint(requestedRoutes: Array<RequestedRoute>, i: number = 0, mapInstance: google.maps.Map = this.googleMaps[0], instructionObjList: any = []) {
        const _self = this;

        return new Promise((resolve, reject) => {
            const requestedRoute = requestedRoutes[i];
            const oneRouteLatLngList = _self.buildLatLngListByRoute(requestedRoute);
            const requests = _self.buildRequestList(oneRouteLatLngList);
            const directionsService = new google.maps.DirectionsService;

            requestedRoute.calculateDirectionsByManual = false;

            if (requestedRoute.requestStops.length >= 100) {
                _self.calculateDirectionsByManual(requestedRoute).then(successCallback, failedCallback);
            } else {
                setTimeout(function () {
                    _self.calculateDirections(directionsService, requests).then(successCallback, failedCallback);
                }, i * 10 + 500);
            }


            function successCallback(responseList) {
                _self.drawRoute(responseList, requestedRoute, mapInstance);

                let tmpObj: any = {
                    title: requestedRoute.name,
                    instructionsStr: ""
                };

                instructionObjList.push(tmpObj);
                _.forEach(responseList, function (r) {
                    _.forEach(r.routes[0].legs, function (l) {
                        _.forEach(l.steps, function (s) {
                            tmpObj.instructionsStr += s.instructions + "</br>";
                        });
                    });
                });

                ++i;
                if (i < requestedRoutes.length) {
                    resolve(_self.calculateRoutesByPrint(requestedRoutes, i, mapInstance, instructionObjList));
                } else {
                    resolve(instructionObjList);
                }
            }

            function failedCallback() {

                _self.calculateDirectionsByManual(requestedRoute).then(successCallback);
                
            }
        });

    }

    calculateDirections(directionsService: google.maps.DirectionsService,
                        requests: Array<DirectionsRequest>,
                        responseList: Array<google.maps.DirectionsResult> = [],
                        recursiveCount: number = 0,
                        isOptimizeWaypoints: boolean = false) {

        const _self = this;
        return new Promise((resolve, reject) => {
            let directionRequest: DirectionsRequest = {
                origin: requests[0].origin,
                destination: requests[0].destination,
                waypoints: requests[0].waypoints,
                optimizeWaypoints: isOptimizeWaypoints,
                travelMode: google.maps.TravelMode.DRIVING
            };

            directionsService.route(directionRequest, function (response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    requests.splice(0, 1);
                    responseList.push(response);

                    if (requests.length > 0) {
                        setTimeout(function () {
                            recursiveCount++;
                            resolve(_self.calculateDirections(directionsService, requests, responseList, recursiveCount, isOptimizeWaypoints));

                        }, recursiveCount * 10 + 500);
                    } else {
                        resolve(responseList);
                    }

                } else {
                    const result = {
                        status: status
                    };

                    reject(result);
                }
            });
        });

    }

    calculateRoutesByReSequence(oneCustomerLatLngList: any) {
        const _self = this;
        return new Promise((resolve, reject) => {
            let requests = _self.buildRequestList(oneCustomerLatLngList);
            let directionsService = new google.maps.DirectionsService;

            _self.calculateDirections(directionsService, requests).then(successCallback, failedCallback);

            function successCallback(responseList) {
                resolve(responseList);
            }

            function failedCallback(result) {
                reject(result);
            }
        });
    }

    setMapCenter(requestedRoutes: Array<RequestedRoute>, mapInstance: google.maps.Map = this.googleMaps[0]) {

        const allLatLngs = [];
        requestedRoutes.filter(requestedRoute => {
            return requestedRoute.requestStops.length > 0
        }).forEach(requestedRoute => {
            allLatLngs.push(this.buildLatLngListByRoute(requestedRoute));
        });
        this.setCenterByLatLngBounds(flatten(allLatLngs), mapInstance);

    }

    clearRoutesOnMap(requestedRoutes: Array<RequestedRoute>) {
        const _self = this;
        _self.selectedStopStrs = [];
        requestedRoutes.forEach(function (r) {
            _.chain(_self.polylines)
                .filter(function (p) {
                    return p.nodeID == r.id;
                })
                .forEach(function (p) {
                    _self.removePolyline(p);
                })
                .value();

            _.chain(_self.markers)
                .filter(function (m) {
                    return m.parentID == r.id;
                })
                .forEach(function (m) {
                    _self.removeMarker(m);
                })
                .value();

            _.remove(_self.polylines, function (p: any) {
                return p.nodeID == r.id;
            });

            _.remove(_self.markers, (m: any) => {

                if(m.isSelectedOnMap){
                    _self.selectedStopStrs.push(m.id);
                }
                return m.parentID == r.id;
            });
        });
    }

    setRouteColor(requestedRoute: RequestedRoute) {
        const _self = this;

        _.chain(this.polylines)
            .filter(function (p) {
                return p.nodeID == requestedRoute.id;
            })
            .forEach(function (p) {
                _self.setPolylineColor(p, "#" + requestedRoute.color);
            })
            .value();

        _.chain(this.markers)
            .filter(function (m) {
                return m.parentID == requestedRoute.id;
            })
            .forEach(function (m) {
                const color = '#' + requestedRoute.color;
                _self.setMarkerIcon(m, color, m.labelID);
            })
            .value();
    }

    showOrHideAllPolyline(isShow: boolean) {
        _.forEach(this.polylines, p => {
            this.showOrHidePolyline(p, isShow);
        });
    }

    showOrHideRoute(id: string, isShow: boolean) {
        this.showOrHidePolylineByRequestedRouteID(id, isShow);
        const _self = this;
        _.chain(this.markers)
            .filter(function (m) {
                return m.parentID == id;
            })
            .forEach(function (m) {
                _self.showOrHideMarker(m, isShow);
            })
            .value();
    }

    showOrHidePolylineByRequestedRouteID(id: string, isShow: boolean) {
        const _self = this;

        _.chain(this.polylines)
            .filter(function (p) {
                return p.nodeID == id;
            })
            .forEach(function (p) {
                _self.showOrHidePolyline(p, isShow);
            })
            .value();
    }

    setCenterByLatLng(lat: any, lng: any, mapInstance: google.maps.Map = this.googleMaps[0]) {
        mapInstance.panTo(this.convertToLatLng(lat, lng));
    }

    setMarkerSizeAndZindexByNodeID(nodeID: string, isNormal: boolean) {
        const marker: any = this.findMarkerByNodeID(nodeID);
        this.setMarkerSizeAndZindex(marker, isNormal);
    }

    setMarkerSizeAndZindex(marker: google.maps.Marker, isNormal: boolean) {
        let shapeObj: any = {
            type: 'poly'
        };
        shapeObj.coords = isNormal ? NormalSizeShapeCoords : BigSizeShapeCoords;

        const tmpObj: any = marker.getIcon();
        tmpObj.scaledSize = isNormal ? new google.maps.Size(32, 43) : new google.maps.Size(48, 64.5);
        tmpObj.size = isNormal ? new google.maps.Size(32, 43) : new google.maps.Size(48, 64.5);
        shapeObj.coords = isNormal ? NormalSizeShapeCoords : BigSizeShapeCoords;

        const markerIndex = isNormal ? 10 : 99;

        const option: any = {
            icon: tmpObj,
            shape: shapeObj,
            zIndex: markerIndex
        };

        marker.setOptions(option);
    }

    findMarkerByNodeID(nodeID): any {
        return _.find(this.markers, m => {
            return m.nodeID == nodeID;
        })
    }

    findMarkersByParentID() {

    }

    bindingMarkerAndPolylineEvents(requestedRoutes: RequestedRoute[]) {
        const _self = this;
        _.forEach(requestedRoutes, function (r) {
            _.chain(_self.polylines)
                .filter(function (p) {
                    return p.nodeID == r.id;
                })
                .forEach(function (p) {
                    _self.bindingPolylineEvents(p);
                })
                .value();

            _.chain(_self.markers)
                .filter(function (m) {
                    return m.parentID == r.id;
                })
                .forEach(function (m) {
                    _self.bindingMarkerEvents(m);
                })
                .value();
        });
    }

    optimizeByGoogle(requestedRoute: RequestedRoute) {
        const _self = this;
        return new Promise((resolve, reject) => {
            const oneRouteLatLngList = _self.buildLatLngListByRoute(requestedRoute);
            const requests = _self.buildRequestList(oneRouteLatLngList);

            const directionsService = new google.maps.DirectionsService;
            _self.calculateDirections(directionsService, requests, [], 0, true).then(successCallback, failedCallback);


            function successCallback(responseList) {
                const response = responseList[0];
                resolve(response.routes[0].waypoint_order);
            }

            function failedCallback(result) {
                reject('Directions request failed due to ' + result.status + ', Please try again.');
            }
        });
    }

    initBindingMapEvents(mapInstance: google.maps.Map = this.googleMaps[0]) {
        const _self = this;
        mapInstance.addListener("click", function () {
            _self.removeMoveStopDialog();
            _self.observableBusService.mapClick();
        });

        mapInstance.addListener("zoom_changed", function () {
            _self.removeMoveStopDialog();
        });

        mapInstance.addListener("drag", function () {
            _self.removeMoveStopDialog();
        });
    }

    setMarkerIconByNodeID(nodeID: string, color: string, text: any) {
        const marker: any = this.findMarkerByNodeID(nodeID);
        this.setMarkerIcon(marker, color, text);
    }

    clearSelectedMarkersOnMap(isResetMarkerIcon: boolean, colorFunCallback: any, parentID: string = "") {
        const _self = this;
        _.forEach(this.markers, function (marker) {
            if ((marker.isSelectedOnMap === true
                && parentID != ""
                && !_.isUndefined(marker.parentID)
                && marker.parentID == parentID) || (marker.isSelectedOnMap === true && parentID == "" )) {

                marker.isSelectedOnMap = false;
                if (isResetMarkerIcon === true) {

                    let color = colorFunCallback(marker.parentID);
                    _self.setMarkerIcon(marker, color, marker.labelID);
                }
            }

        });
        // let selectedStops = repositoryService.getStopsByIsSelectedOnMap( googleMapObj.markerList );
        // if ( selectedStops.length > 0 ) {
        //   globalSetting.rootJson.isShowMoveToThisLoadSheet = true;
        // } else {
        //   globalSetting.rootJson.isShowMoveToThisLoadSheet = false;
        // }
    }

    removeMoveStopDialog() {
        this.moveStopPanelOnMapService.remove();
    }

    initDrawingManagerOnMap(mapInstance: google.maps.Map = this.googleMaps[0]) {
        this.drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: null,
            drawingControl: false
        });

        this.drawingManager.setMap(mapInstance);
    }

    initBindingDrawingManagerEvent(drawingManager: any = this.drawingManager, mapInstance: google.maps.Map = this.googleMaps[0]) {
        const _self = this;
        google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
            let hasMarkerChangeToSelect = false;
            if (_self.isDrawPolygon) {
                _.forEach(_self.markers, (marker: any) => {
                    if (marker.getVisible() === true && google.maps.geometry.poly.containsLocation(marker.getPosition(), polygon)) {
                        let nodeID = marker.nodeID;
                        let parentID = marker.parentID;
                        if (!_.isUndefined(parentID) && !_.isNull(parentID) && !_.isUndefined(nodeID) && !_.isNull(nodeID)) {
                            marker.isSelectedOnMap = true;
                            hasMarkerChangeToSelect = true;
                            if (marker.isSelectedOnMap) {
                                _self.removeMoveStopDialog();
                            }
                            _self.setMarkerIcon(marker, "#EAEE4F", "");
                            _self.observableBusService.showToLoadSheetRouteName(true);
                            _self.observableBusService.markForCheckRouteTableSummaryComponent();
                        }
                    }
                });
            }

            if (hasMarkerChangeToSelect) {
                //todo
                // globalSetting.rootJson.isShowMoveToThisLoadSheet = true;
                // $rootScope.$digest();
            }

            _self.isDrawPolygon = true;
            polygon.setMap(null);
        });

        google.maps.event.addListener(drawingManager, 'rectanglecomplete', function (rectangle) {
            let hasMarkerChangeToSelect = false;
            _.forEach(_self.markers, (marker) => {
                if (marker.getVisible() === true && rectangle.getBounds().contains(marker.getPosition())) {
                    let nodeID = marker.nodeID;
                    let parentID = marker.parentID;
                    if (!_.isUndefined(parentID) && !_.isNull(parentID) && !_.isUndefined(nodeID) && !_.isNull(nodeID)) {

                        marker.isSelectedOnMap = true;
                        hasMarkerChangeToSelect = true;
                        if (marker.isSelectedOnMap) {
                            _self.removeMoveStopDialog();
                        }
                        _self.setMarkerIcon(marker, "#EAEE4F", "");
                        _self.observableBusService.showToLoadSheetRouteName(true);
                        _self.observableBusService.markForCheckRouteTableSummaryComponent();
                    }
                }
            });
            if (hasMarkerChangeToSelect) {
                //todo
                // globalSetting.rootJson.isShowMoveToThisLoadSheet = true;
                // $rootScope.$digest();
            }
            rectangle.setMap(null);
        });

        google.maps.event.addListener(mapInstance, 'rightclick', function () {
            if (drawingManager.getDrawingMode() && drawingManager.getDrawingMode().toString().toLowerCase() == "polygon") {
                _self.isDrawPolygon = false;
                drawingManager.setDrawingMode(null);
                drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
            }
        });

        this.bindControlToWindowScroll();

    }

    bindControlToWindowScroll(){
        const scroll$  = Observable.fromEvent(window,'scroll');
        scroll$.debounceTime(200).subscribe(()=>{
            const controlButtons:HTMLElement = window.document.querySelector('.gm-bundled-control-on-bottom');
            if(controlButtons){
                controlButtons.style.top = 250 + document.documentElement.scrollTop +'px'
            }
        });
    }

    codeAddress(address: any) {
        return new Promise((resolve, reject) => {
            let result: any = {};
            let geocoder = new google.maps.Geocoder();

            geocoder.geocode({'address': address}, (results, status) => {
                if (status == google.maps.GeocoderStatus.OK) {
                    result.latLng = {
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    };

                    resolve(result);
                } else {
                    result.msg = 'Geocode was not successful for the following reason: ' + status;

                    reject(result);
                }
            });
        });
    }

    private bindingPolylineEvents(polyline: any) {
        const _self = this;
        polyline.addListener('click', function () {
            let nodeID = polyline.nodeID;

            const selectedNodeIDs = _self.getSelectedMarkerNodeIDOnMap();
            if (selectedNodeIDs.length > 0) {
                const event: any = {
                    nodeID: null,
                    parentID: nodeID,
                    selectedNodeIDs,
                    needFilter: true
                };

                _self.observableBusService.moveStopPanelClickedOnMap(event);
            }
        });

        const polylineMouseoverListener = this.addPolylineListener(polyline);
        this.polylineMouseoverListener.push(polylineMouseoverListener);
        polyline.addListener('mouseout', function () {
            polyline.setOptions({strokeWeight: 6});
        });
    }

    private bindingMarkerEvents(marker: any) {
        const _self = this;
        let isShowToLoadSheetRouteName = false;
        marker.addListener('click', function () {
            isShowToLoadSheetRouteName = true;
            let nodeID = marker.nodeID;
            let parentID = marker.parentID;
            if (!_.isUndefined(parentID) && !_.isNull(parentID) && !_.isUndefined(nodeID) && !_.isNull(nodeID)) {

                marker.isSelectedOnMap = !marker.isSelectedOnMap;
                if (marker.isSelectedOnMap) {
                    _self.removeMoveStopDialog();
                }

                const selectedNodeIDs = _self.getSelectedMarkerNodeIDOnMap();
                if (_self.getSelectedMarkerNodeIDOnMap().length == 0) {
                    isShowToLoadSheetRouteName = false;
                }
                const event: any = {
                    nodeID,
                    parentID,
                    selectedNodeIDs,
                    isSelected: marker.isSelectedOnMap
                };

                _self.observableBusService.markerClickedOnMap(event)
                _self.observableBusService.showToLoadSheetRouteName(isShowToLoadSheetRouteName);
                _self.observableBusService.markForCheckRouteTableSummaryComponent();
            }
        });

        marker.addListener('mouseover', function () {
            _.forEach(_self.polylines,(polyline,index)=>{
                google.maps.event.removeListener(_self.polylineMouseoverListener[index]);
            });
            _self.polylineMouseoverListener = [];
            let nodeID = marker.nodeID;
            let parentID = marker.parentID;
            //todo show stopinfo panel on map

            if (!_.isUndefined(parentID) && !_.isNull(parentID) && !_.isUndefined(nodeID) && !_.isNull(nodeID)) {
                marker.setOptions({
                    zIndex: 99
                });

                _self.observableBusService.markerMouseOverOnMap({
                    nodeID,
                    parentID
                });

                const selectedNodeIDs = _self.getSelectedMarkerNodeIDOnMap();
                if (selectedNodeIDs.length > 0 && !marker.isSelectedOnMap) {
                    const pixelPositon = _self.fromLatLngToPoint(marker.getPosition());
                    _self.moveStopPanelOnMapService.setPosition(pixelPositon);
                    _self.moveStopPanelOnMapService.clickHandler = () => {
                        const event: any = {
                            nodeID,
                            parentID,
                            selectedNodeIDs,
                            needFilter: false
                        };

                        _self.observableBusService.moveStopPanelClickedOnMap(event);
                    };
                }
            }
        });

        marker.addListener('mouseout', function () {
            _.forEach(_self.polylines,(polyline)=>{
                const polylineListener =  _self.addPolylineListener(polyline);
                _self.polylineMouseoverListener.push(polylineListener);
            });
            let nodeID = marker.nodeID;
            var parentID = marker.parentID;
            if (!_.isUndefined(parentID) && !_.isNull(parentID) && !_.isUndefined(nodeID) && !_.isNull(nodeID)) {
                if (marker.getShape().coords == NormalSizeShapeCoords) {
                    marker.setOptions({
                        zIndex: 10
                    });
                }
            }
        });
    }

    private addPolylineListener(polyline){
        const polylineListener = polyline.addListener('mouseover', ()=>{
            polyline.setOptions({strokeWeight: 10});

            let nodeID = polyline.nodeID;
            if (!_.isUndefined(nodeID) && !_.isNull(nodeID)) {
                this.observableBusService.polylineMouseOverOnMap({
                    nodeID
                });
            }

        });
        return polylineListener;
    }

    private fromLatLngToPoint(latLng: any, mapInstance: google.maps.Map = this.googleMaps[0]) {
        let scale = Math.pow(2, mapInstance.getZoom());
        let topRight = mapInstance.getProjection().fromLatLngToPoint(mapInstance.getBounds().getNorthEast());
        let bottomLeft = mapInstance.getProjection().fromLatLngToPoint(mapInstance.getBounds().getSouthWest());

        let worldPoint = mapInstance.getProjection().fromLatLngToPoint(latLng);
        return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
    }

    public getSelectedMarkerNodeIDOnMap() {
        return _.chain(this.markers)
            .filter(function (m: any) {
                return m.isSelectedOnMap;
            })
            .map(function (m: any) {
                return m.nodeID;
            })
            .value();
    }

    private setMarkerIcon(marker: any, color: string, text?: string) {
        if(marker.getIcon()){
            let iconTmpObj = this.createSvgIcon(color, text);
            let sizeTmpObj = marker.getIcon().size;
            iconTmpObj.scaledSize = sizeTmpObj;
            iconTmpObj.size = sizeTmpObj;
            marker.setOptions({
                icon: iconTmpObj
            });
        }else {
            let iconTmpObj = this.createSvgIcon(color, text);
        }

    }

    private showOrHideMarker(marker: google.maps.Polyline, isShow: boolean) {
        marker.setVisible(isShow);
    }

    private showOrHidePolyline(polyline: google.maps.Polyline, isShow: boolean) {
        polyline.setVisible(isShow);
    }

    private setPolylineColor(polyline: google.maps.Polyline, color: string) {
        polyline.setOptions({strokeColor: color});
    }

    private removePolyline(polyline: google.maps.Polyline) {
        polyline.setMap(null);
    }

    private removeMarker(marker: google.maps.Marker) {
        marker.setMap(null);
    }

    private calculateDirectionsByManual(requestedRoute: RequestedRoute) {

        return new Promise((resolve, reject) => {
            requestedRoute.calculateDirectionsByManual = true;

            const responseRoute = {
                routes: [{
                    legs: []
                }]
            };

            const responseList = [];
            responseList.push(responseRoute);


            for (let i = -1; i < requestedRoute.requestStops.length; i++) {
                const tmpLeg = {
                    duration: {value: 120},
                    distance: {value: 2000}
                };

                responseRoute.routes[0].legs.push(tmpLeg)
            }

            resolve(responseList);

        });

    }

    private setDurationAndDistanceToRequestedRoute(response: any, requestedRoute: RequestedRoute) {
        const allLegs: Array<google.maps.DirectionsLeg> = [];

        response.forEach(responseRoute => {
            responseRoute.routes[0].legs.forEach(leg => {
                allLegs.push(leg);
            })
        });

        requestedRoute.requestStops.forEach((requestedStop, index) => {
            requestedStop.duration = allLegs[index].duration.value;
            requestedStop.distance = allLegs[index].distance.value;
            requestedStop.distanceBetween = requestedStop.distance;

            let tmpDistance = 0;
            for (let i = index; i >= 0; i--) {
                tmpDistance += requestedRoute.requestStops[i].distance;
            }

            requestedStop.distanceWarehouse = tmpDistance;

        });

        const legLength = allLegs.length;
        requestedRoute.duration = allLegs[legLength - 1].duration.value;
        requestedRoute.distance = allLegs[legLength - 1].distance.value;

    }

    private drawRoute(responseList: any, requestedRoute: RequestedRoute, mapInstance: google.maps.Map = this.googleMaps[0]) {
        const polylineOption: any = {
            id: "polyline" + requestedRoute.id,
            color: "#" + requestedRoute.color,
            path: [],
            nodeID: requestedRoute.id
        };

        if (requestedRoute.calculateDirectionsByManual == false) {
            const tmpPath = [];
            responseList.forEach(response => {
                tmpPath.push(this.getPolylinePath(response.routes[0].legs));
            });

            polylineOption.path = flatten(tmpPath);

            let polyline: google.maps.Polyline = this.createPolyline(polylineOption);
            polyline.setMap(mapInstance);
            this.polylines.push(polyline);
        }
        let startPointMarker = this.createMapPointMarker(requestedRoute.startLat, requestedRoute.startLng, requestedRoute.color, requestedRoute.id, true);
        startPointMarker.setMap(mapInstance);
        this.markers.push(startPointMarker);

        let endPointMarker = this.createMapPointMarker(requestedRoute.endLat, requestedRoute.endLng, requestedRoute.color, requestedRoute.id, false);
        endPointMarker.setMap(mapInstance);
        this.markers.push(endPointMarker);

        requestedRoute.requestStops.forEach(requestedStop => {
            let markerOption = {
                id: "marker" + requestedStop.id,
                latitude: requestedStop.lat,
                longitude: requestedStop.lng,
                color: "#" + requestedRoute.color,// "#" + ( stop.CanMove == "1" ? route.Color : 'ccc'),
                text: requestedStop.label,
                parentID: requestedRoute.id,
                nodeID: requestedStop.id,
                labelID: requestedStop.label
            };

            var marker = this.createMarker(markerOption);
            marker.setMap(mapInstance);

            this.markers.push(marker);
        });

        let mcOptions = {
            gridSize: 50,
            maxZoom: 15
        };
        // this.mc = new MarkerClusterer(this.googleMaps[0],[],mcOptions);
        // this.mc.addMarkers(this.markers , true);
        this.replyMarksStates(this.selectedStopStrs);
    }

    private buildRequestList(latLngArr: Array<Array<number>>): Array<DirectionsRequest> {
        const currentRouteLoadTime = this.computeLoadTimes(latLngArr.length);
        const result: Array<DirectionsRequest> = [];

        for (let i = 0; i < currentRouteLoadTime; i++) {
            let fromIndex = i * ( GoogleMaploadWayPointsEveryTime - 1 );
            let toIndex = (GoogleMaploadWayPointsEveryTime - 1 ) * ( i + 1 ) >= latLngArr.length ?
                latLngArr.length - 1 : ( GoogleMaploadWayPointsEveryTime - 1 ) * ( i + 1 );

            let tmpRequest: DirectionsRequest = {};
            tmpRequest.origin = new LatLng(latLngArr[fromIndex][0], latLngArr[fromIndex][1]);
            tmpRequest.destination = new LatLng(latLngArr[toIndex][0], latLngArr[toIndex][1]);
            tmpRequest.waypoints = [];

            let tmpWaypoints = latLngArr.slice(fromIndex + 1, toIndex);

            tmpWaypoints.forEach(tmpWaypoint => {
                let tmpObj: google.maps.DirectionsWaypoint = {
                    location: new google.maps.LatLng(tmpWaypoint[0], tmpWaypoint[1]),
                    stopover: true
                };

                tmpRequest.waypoints.push(tmpObj);
            });

            result.push(tmpRequest);
        }

        return result;

    }

    private computeLoadTimes(count: number): number {

        const flag: number = ( (count - 1) % ( GoogleMaploadWayPointsEveryTime - 1 ) == 0 ) ? 0 : 1;
        return Math.floor((count - 1) / ( GoogleMaploadWayPointsEveryTime - 1 )) + flag;
    }

    private buildLatLngListByRoute(requestedRoute: RequestedRoute): Array<Array<number>> {
        const result = this.buildLatLngListByStops(requestedRoute.requestStops);

        result.splice(0, 0, [requestedRoute.startLat, requestedRoute.startLng]);
        result.push([requestedRoute.endLat, requestedRoute.endLng]);

        return result;
    }

    private buildLatLngListByStops(requestedStops: Array<RequestedStop>): Array<Array<number>> {
        const result = [];
        requestedStops.forEach(s => {
            result.push([s.lat, s.lng]);
        });

        return result;
    }

    private setCenterByLatLngBounds(latLngArr: Array<Array<number>>, mapInstance: google.maps.Map = this.googleMaps[0]) {

        const latLngBounds = this.setLatLngBounds(latLngArr);
        if (latLngBounds) {
            mapInstance.fitBounds(latLngBounds);
            mapInstance.panTo(latLngBounds.getCenter());
        }
    }

    private setLatLngBounds(latLngArr: Array<Array<number>>) {
        let latLngBounds = new google.maps.LatLngBounds();

        let tmpLatLngArr = this.convertToLatLngArr(latLngArr);

        tmpLatLngArr.forEach(value => {
            latLngBounds.extend(value);
        });

        return latLngBounds;
    }

    private convertToLatLngArr(latLngArr) {
        let tmpArr = [];
        for (let i = 0, latLng;
             ( latLng = latLngArr[i] ) != null; i++) {
            let lat = latLng[0];
            let lng = latLng[1];
            let LatLng = this.convertToLatLng(lat, lng);
            tmpArr.push(LatLng);
        }
        return tmpArr;
    }

    private convertToLatLng(lat, lng) {
        return new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
    }

    private createPolyline(options: any): google.maps.Polyline {
        let polylineObj = {
            id: options.id,
            path: options.path,
            strokeColor: options.color,
            strokeWeight: 6,
            editable: false,
            draggable: false,
            geodesic: false,
            visible: true,
            strokeOpacity: 0.8,
            nodeID: options.nodeID
        };

        return new google.maps.Polyline(polylineObj);
    }

    private createMapPointMarker(lat: number, lng: number, color: string, id: string, isStartPoint: boolean) {
        var markerOption = {
            id: "loadSheet" + (isStartPoint ? "s" + id : "e" + id ),
            latitude: lat,
            longitude: lng,
            color: "#" + color,
            text: (isStartPoint ? "S" : "E"),
            parentID: id,
            labelID: (isStartPoint ? "S" : "E")
        };

        return this.createMarker(markerOption);
    }

    private createMarker(options: any) {

        //IE MarkerShape has problem
        let markerOption = {
            id: options.id,
            icon: this.createSvgIcon(options.color, options.text),
            position: {
                lat: parseFloat(options.latitude),
                lng: parseFloat(options.longitude)
            },
            draggable: false,
            visible: true,
            loadSheetID: options.loadSheetID,
            nodeID: options.nodeID,
            parentID: options.parentID,
            isSelectedOnMap: false,
            zIndex: 10,
            shape: {
                coords: NormalSizeShapeCoords,
                type: 'poly'
            },
            labelID: options.labelID
        };

        return new google.maps.Marker(markerOption);
    }

    private createSvgIcon(color: string, text: string) {
        var div = document.createElement('div');

        div.innerHTML = '<svg width="32px" height="43px"  viewBox="0 0 32 43" xmlns="http://www.w3.org/2000/svg"> <path style="fill:#FFFFFF;stroke:#020202;stroke-width:1;stroke-miterlimit:10;" d="M30.6,15.737c0-8.075-6.55-14.6-14.6-14.6c-8.075,0-14.601,6.55-14.601,14.6c0,4.149,1.726,7.875,4.5,10.524c1.8,1.801,4.175,4.301,5.025,5.625c1.75,2.726,5,11.976,5,11.976s3.325-9.25,5.1-11.976c0.825-1.274,3.05-3.6,4.825-5.399C28.774,23.813,30.6,20.012,30.6,15.737z"/>'
            + '<circle style="fill:' + color + ';" cx="16" cy="16" r="11"/>'
            + '<text x="16" y="20" text-anchor="middle" style="font-size:10px;fill:#FFFFFF;">' + text + '</text> </svg>';

        // div.appendChild( svg );

        var canvas = document.createElement('canvas');
        canvas.setAttribute('height', '50px');
        canvas.setAttribute('width', '50px');
        var svgHtml = div.innerHTML;

        canvg(canvas, svgHtml);

        var imgSrc = canvas.toDataURL("image/png");

        var iconObj = {
            size: new google.maps.Size(32, 43),
            url: imgSrc,
            scaledSize: new google.maps.Size(32, 43)
        };

        return iconObj;
    }

    private getPolylinePath(legs) {
        const result = [];
        for (let i = 0; i < legs.length; i++) {
            let steps = legs[i].steps;
            for (let j = 0; j < steps.length; j++) {
                let nextSegment = steps[j].path;
                for (let k = 0; k < nextSegment.length; k++) {
                    result.push(nextSegment[k]);
                }
            }
        }
        return result;
    }

    replyMarksStates(markerIds:Array<string>){
        _.forEach(markerIds,(markerId)=>{
            _.forEach(this.markers,(marker)=>{
                if(markerId == marker.id){
                    marker.isSelectedOnMap = true;
                    this.setMarkerIcon(marker,"#EAEE4F",'')
                }
            })
        })
    }

}
