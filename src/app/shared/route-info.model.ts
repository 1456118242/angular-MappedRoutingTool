import {StopInfo} from './stop-info.model'
import {FieldValueObject} from './field-value-object.model'
import {CustomColumn} from "./custom-column.model";

export class RouteInfo {
    id: string;
    routeID?: string;
    planID?: string;
    routeName: string;
    startTime: string;
    endTime: string;
    endPlanTime:string;
    color: string;
    distance: number;
    duration: number;
    displayColumnOption: Array<string>;
    startMapPointID: string;
    endMapPointID: string;
    deliveryman: string;
    routeCost: string;
    palletCount: number;
    helper?: boolean;
    stopInfos: Array<StopInfo>;
    fieldValueObjects: Array<FieldValueObject>;
    helperPercent: string;
    costPerMile: string;
    isSelected: boolean;
    isShowOnMap: boolean;
    customColumns?: CustomColumn[];
    lastChange?: any;
    status?: string;
    lSDate: string;
    vehicleID?: string;
    userName:string;
    isEditVehicle?: boolean;
    timelineObj?: any;
    routeSelectColumnState?: any;
    maxCargoWeight?: string;
    routeNum?:string;
    maxStopCount?: number;
    maxCases?: string;
    activityTypeText?: string;
    address: string;
    planDate: string;
    allowedActivities: Array<string>;
    driveTime: number;
    oldServiceTime: number;
    isFormState: boolean;
    isToState: boolean;
    isShowDeliverymanArray: boolean;
    vehicle:string;

    //forPlan
    savedRealLoadSheetID:string;

    //RoutePlanner
    hidedStopInfos?: StopInfo[];
    routeFrequency: number;
    activity?:string;
    sumOfExtPrice?:number;
    isHideRouteInTableAndMap?:boolean = false;
    routeVersionID:string;
    plannedDistance:number;


}
