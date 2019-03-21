/**
 * Created by 123 on 2018/4/24.
 */

import {Component, OnInit, Output, EventEmitter, AfterViewInit} from '@angular/core'
import {DialogRef} from "ngx-modialog";
import {RoutePrintDialogPreset} from "../../shared/route-common.dialog.component.context";
import {ObservableBusService} from "../../service/observable-bus.service";
import * as _ from 'lodash'


@Component({
    templateUrl:'route-exceptgeocode.html'
})
export class RouteExceptgeocodeComponent implements AfterViewInit{

    public inputValue;
    public mapService;
    public stopInfo;
    public routeInfo;
    public mapRoutingService;
    public markerObj;
    constructor(public dialog:DialogRef<RoutePrintDialogPreset> ,public observable:ObservableBusService){
        this.dialog.context.contentClassName = "vex-content";
        this.dialog.context.overlayClassName = "vex-overlay";
        document.querySelector('css-dialog-container').className='vex vex-theme-default ngdialog-theme-exception-geocode';
        this.dialog.context.isBlocking = true;
        this.mapService = this.dialog.context.mapService;
        this.stopInfo = this.dialog.context.stopInfo;
        this.routeInfo = this.dialog.context.routeInfo;
        this.mapRoutingService = this.dialog.context.mapRoutingService;
        this.inputValue= this.stopInfo.address + ", " + this.stopInfo.city + ", " + this.stopInfo.state;
    }

    ngAfterViewInit(): void {
        let latLngObj = undefined;


        if ( !_.isEmpty( this.stopInfo.lat ) && !_.isEmpty( this.stopInfo.lng ) ) {
            latLngObj = {};
            latLngObj['lat'] = Number( this.stopInfo.lat );
            latLngObj['lng'] = Number( this.stopInfo.lng );
        }
        this.mapService.initMap(document.getElementById( "geocede-map" ),{
            center: { lat: 40.1451, lng: -99.6680 },
            zoom: 13,
        });

        this.markerObj =  new google.maps.Marker( {
            position: { lat: 40.1451, lng: -99.6680 },
            map: this.mapService.googleMaps[1],
            draggable: true
        } );
        if ( this.inputValue != '' ){
            this.codeAddress( this.inputValue );
        }else{
            this.markerObj.setPosition( latLngObj );
            this.mapService.googleMaps[1].panTo( latLngObj );
        }

    }

    save( latlng ) {
        this.stopInfo.lat = latlng.lat;
        this.stopInfo.lng = latlng.lng;
        this.observable.loading(true);
        this.mapRoutingService.buildSaveCustomerLocation( [ this.stopInfo ] );
        this.mapRoutingService.reCalculateRoutes( [ this.routeInfo ] );
        this.mapRoutingService.buildCustomColumn([ this.routeInfo ]);
};
    saveMapPointHandler(){

    }

    codeAddress(inputVal){
        let dom :HTMLInputElement = <HTMLInputElement>document.getElementById("pac-input");
        let address = inputVal || dom.value;
        let _self = this;
        this.mapService.codeAddress( address ).then( successCallback, failCallback );
        function successCallback( result ) {
            var markerPosition = { lat: result.latLng.lat, lng: result.latLng.lng };
            _self.markerObj.setPosition( markerPosition );
            _self.mapService.googleMaps[1].panTo( markerPosition );
        }

        function failCallback( result ) {
            alert( result.msg );
        }
    }


    closeThisDialog(){
        this.dialog.close();
        if(this.mapService.googleMaps.length>1){
            this.mapService.googleMaps.pop();
        }
    }

    saveLatLng(){
        const pointLat = this.markerObj.getPosition().lat().toString();
        const pointLng = this.markerObj.getPosition().lng().toString();
        const latlng = {
            lat: pointLat,
            lng: pointLng
        };
        this.save( latlng );
        if(this.mapService.googleMaps.length>1){
            this.mapService.googleMaps.pop();
        }
        this.dialog.close();
    }

}
