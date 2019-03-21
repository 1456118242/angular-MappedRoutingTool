import {FieldValueObject } from '../../../shared/field-value-object.model'

export class RouteTableTemplate{
  keyValues: Array<FieldValueObject>;
  startIndex: number;
}
export class RouteTable{
  routeName:string;
  routeId:string;
  showProductPickTypesetting:string;
  routeColor:string;
  routeDeliveryman:string;
  fieldNameList: number[];
  routePickUnits:string;
  customerCount:number;
  palletCount:number;
  pickUnits:string;
  CostPerMile:number;
  distance:string;
  sumOfDistance:number;
  totalTravelTime:'';
  totalServiceTime:'';
  sumOfWeight:number;
  sumOfTime:'';
  serviceTime:'';
  routeCost:'';
}
export class RouteDeliveryMan{
  deliveryManName:string;
}
