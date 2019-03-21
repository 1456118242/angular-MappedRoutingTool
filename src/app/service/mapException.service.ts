import {Injectable} from '@angular/core'
import {MapService} from "./mapService/map.service";

@Injectable()
export class mapExceptionService {
    private needHandlerRouteObj = [];
    private exceptionRouteAndStopList = [];

    constructor(public mapService : MapService){

    }

    clearExceptionObjList() {
        this.exceptionRouteAndStopList.length = 0;
        this.needHandlerRouteObj.length = 0;
    }

    getExceptionObjList() {
        return this.needHandlerRouteObj;
    }

    handlerExceptionRoute() {
        return new Promise((resolve, reject) => {
            this.addExceptionStop().then( successCallBack, failCallBack );

            function successCallBack() {
                resolve( this.exceptionRouteAndStopList );
            }

            function failCallBack() {
                reject();
            }
        });
    }

    addExceptionRoute( route, oneRouteLatLngList ) {
        this.needHandlerRouteObj.push( {
            route: route,
            oneRouteLatLngList: oneRouteLatLngList
        } )
    }

    addExceptionStop(i?:0){
        return new Promise(((resolve,reject)=> {
            let route = this.needHandlerRouteObj[ i ].route;
            let oneRouteLatLngList = this.needHandlerRouteObj[ i ].oneRouteLatLngList;
            let requestList = this.bulidExceptionRequest( oneRouteLatLngList );
            let directionsService = new this.mapService.googleMaps[0]["DirectionsService"];
            // add time out
            setTimeout( function () {
                this.calculateExceptionDirections( directionsService, requestList ).then( successCallback, failCallback );
            }, i * 10 + 700 );
            function failCallback() {
                ++i;
                if ( i < this.needHandlerRouteObj.length ) {
                    resolve(this.addExceptionStop( i,));
                } else {
                    reject();
                }
            }

            function successCallback( exceptionStopListIndex ) {
                console.log( exceptionStopListIndex );
                console.log( route.Stops[ exceptionStopListIndex ] );
                if ( exceptionStopListIndex >= route.Stops.length ) {
                    exceptionStopListIndex = route.Stops.length - 1
                }
                var exceptionStop = route.Stops[ exceptionStopListIndex ];
                var exceptionRoute = route;
                var exceptionObj = {
                    exceptionStop: exceptionStop,
                    exceptionRoute: exceptionRoute
                };
                this.exceptionRouteAndStopList.push( exceptionObj );
                ++i;
                if ( i < this.needHandlerRouteObj.length ) {
                    resolve(this.addExceptionStop( i ));
                } else {
                    resolve();
                }
            }
        }))
    }

    private bulidExceptionRequest( oneRouteLatLngList ) {
        let requestList = [];
        for ( var i = 0; i < oneRouteLatLngList.length - 1; i++ ) {
            var tmpRequest = {};
            tmpRequest["origin"] = new google.maps.LatLng( oneRouteLatLngList[ i ][ 0 ], oneRouteLatLngList[ i ][ 1 ] );
            tmpRequest["destination"] = new google.maps.LatLng( oneRouteLatLngList[ i + 1 ][ 0 ], oneRouteLatLngList[ i + 1 ][ 1 ] );
            requestList.push( tmpRequest );
        }
        return requestList;
    }

    private calculateExceptionDirections( directionsService, requestList, i? ) {

        let self = this;
        return new Promise((resolve,reject)=> {
            var i = i || 0;
            var directionRequest = {
                origin: requestList[ i ].origin,
                destination: requestList[ i ].destination,
                optimizeWaypoints: false,
                travelMode: google.maps.TravelMode.DRIVING
            };
            directionsService.route( directionRequest, function ( response, status ) {
                if ( status === this.mapService.googleMaps[0].DirectionsStatus.OK ) {
                    ++i;
                    if ( i < requestList.length ) {
                        setTimeout( function () {
                            resolve(self.calculateExceptionDirections( directionsService, requestList, i ));
                        }, i * 10 + 700 );

                    } else {
                        reject();
                    }
                } else {
                    var result = {};
                    result["expectionStopIndex"] = i;
                    result["status "]= status;
                    resolve( result );
                }

            } );
        });

    }
}