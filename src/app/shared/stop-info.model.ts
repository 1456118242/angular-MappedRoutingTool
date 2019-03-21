import {FieldValueObject} from './field-value-object.model'
import {TimeFieldObject} from './time-field-object.model'

export class StopInfo {
  id:string;
  oldRouteInfoID?: string;
  eventID?:string;
  drivingTime: TimeFieldObject;
  weight?:string;
  imageIndex: number;
  userName:string;
  customerID: string;
  company: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  customerReceipt:number;
  locked?:boolean;
  lat?: string;
  lng?: string;
  distance?: number;
  duration?: number;
  sequence?: number;
  oldSequence?: number;
  distanceBetween?: number;
  distanceWarehouse?: number;
  customerServiceDuration: number;
  serviceWindows: Array<TimeFieldObject>;
  closestMatchingServiceWindow: TimeFieldObject;
  assignments: Array<TimeFieldObject>;
  customerDuration:number;
  color:string;
  fsm:number;
  isGrayColor:boolean;
  invoices?: string[];
  allInvoices?:string[];
  customColumnFieldValueObj?: FieldValueObject;
  activity:string;
  activityTypeText:string;
  startTime:number;
  endTime: number;
  startTimeColor: string;
  endTimeColor: string;

  helper?: boolean;
  //forPlan
  savedRealLoadSheetID:string;
  routeID?: string;
  routeColor?: string;
  routeName?: string
  routeStartTime?: string;

  //only Mapped Routing
  averageServiceTimeSecond:number;
  customerFixedServiceTimeSecond: number;
  customerDurationSecond:number;

  //RoutePlanner
    phase?: string;
    stopsPerWeek?: number;
    driveDuration?:number;
    oldStopIndex?:number;
    oldStopInfoIndex?: number;
    extprice:number;
    numUnitsStr:string;
    origActivity:string;
    oldPhase:string;
    cases:number;
    seq:number;

}
