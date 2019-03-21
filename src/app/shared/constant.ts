import { DropDownMenuTemplate } from '../component/dropDownMenu/shared/drop-down-menu.model';
import {} from '@types/googlemaps';

export let AjaxUrl: string = "ajax/GMMapRouteAjax.aspx?&RequestAjaxType=";//?RequestAjaxType=

export let AjaxUrlForPlan:string = 'ajax/MappedRoutingForPlanAjax.aspx?&RequestAjaxType=';

export let AjaxUrlRoutePlanner:string = 'ajax/GMRoutePlannerUpdate.aspx?&RequestAjaxType=';

export let PlannerType:number = 1;

export const actions = {
    SAVE_SEQSETTING: 20,
    SET_DRIECTIONOPTION: 27,
    GET_ALL_LOADSHEET: 38,
    MOVE_INVOICE: 39,
    GET_CUSTOMER_RECIPET: 95,
    DELIVERYMAN_ROUTEPLANNER_ACTIONS_WRITE_ROUTE_JSON: 11,
    DELIVERYMAN_ROUTEPLANNER_ACTIONS_MAPPOINTS: 19,
    DELIVERYMAN_ROUTEPLANNER_ACTIONS_ALLDELIVERYMAN: 18,
    DELIVERYMAN_ROUTEPLANNER_ACTIONS_ALLROUTEJSON: 17,
    LOAD_CUSTOMERS:21,
    SEARCH_CUSTOMER: 22,
    ADD_SCHEDULEDSTOP: 23,
    SALESMAN_ROUTEPLANNER_ACTIONS_WRITE_ROUTE_JSON: 50,
    SALESMAN_ROUTEPLANNER_ACTIONS_ALLSALESMANROUTE: 51,
    SALESMAN_ROUTEPLANNER_ACTIONS_ALLSALESMAN: 52,
    ACTIVITY_ROUTEPLANNER: 55
};

export let CustomerLocationSaveUrl : string = "ajax/Customer_BatchGeo.aspx?&RequestAjaxType=";

export const ReSequenceDropDownMenuTemplate: DropDownMenuTemplate = {
  menuText: 'Re-Seq',
  keyValues: [{
    field: 'Closest Stop First',
    value: 0,
    isShow: false
  }, {
    field: 'Farthest Stop First',
    value: 1,
    isShow: false
  }, {
    field: 'Service Windows',
    value: 2,
    isShow: false
  }, {
    field: 'Shortest Distance',
    value: 3,
    isShow: false
  }]
};

export const ReSequenceType = {
  closest_stop_first: 0,
  farthest_stop_first: 1,
  service_windows: 2,
  shortest_distance: 3
};

export const ColumnOptionDropDownMenuTemplate: DropDownMenuTemplate = {
  menuText: 'Column',
  keyValues: [{
    field: 'Distance between stops',
    value: "distanceBetween",
    isShow: true
  }, {
    field: 'Distance from warehouse',
    value: "distanceWarehouse",
    isShow: false
  }, {
    field: 'City',
    value: "city",
    isShow: false
  }, {
    field: 'Address',
    value: "address",
    isShow: false
  }]
};

export const DefaultGoogleMapOption: google.maps.MapOptions = {
  center: { lat: 40.1451, lng: -99.6680 },
  draggable: true,
  zoom: 5,
  gestureHandling: 'greedy'
};

export const PhaseType = {
  all: { text: "All",value:"All" },
  oneAndThree: { text: "1 & 3", value:"13" },
  twoAndFour: { text: "2 & 4", value:"24" },
  oneOnly: { text: "1 only", value:"1" },
  twoOnly: { text: "2 only", value:"2" },
  threeOnly: { text: "3 only", value:"3" },
  fourOnly: { text: "4 only", value:"4" }
};

export const NormalSizeShapeCoords = [16,1.14,  21,2.1, 25,4.2, 28,7.4, 30,11.3,  30.6,15.74, 25.85,26.49, 21.02,31.89, 15.92,43.86, 10.92,31.89, 5.9,26.26, 1.4,15.74, 2.1,11.3, 4,7.4, 7.1,4.2, 11,2.1, 16,1.14];

export const BigSizeShapeCoords = [24, 1.71, 31.5, 3.15, 37.5, 6.3, 42, 11.1, 45, 16.95, 45.96, 23.61, 38.775, 39.735, 31.53, 47.835, 23.88, 65.78, 16.38, 47.835, 8.85, 39.39, 2.09, 23.61, 3.15, 16.95, 6, 11.1, 10.64, 6.3, 16.5, 3.15, 24, 1.71];

export const GoogleMaploadWayPointsEveryTime:number = 25;

export const printComponentView = {
    mappedRouting:'mappedRouting',
    mappedRoutingForPlan:'mappedRoutingForPlan'
};
export enum ajaxRequestType {
  json = 0,
  empty = 1,
  string = 2,
  ignore =3
};

export enum LSStatus{
        newLs = 1,
        lockedForRouting = 2,
        loaded = 3,
        returned = 4,
        balanced = 5,
        transferred = 6,
        verified = 7
}

export enum PromptedMessage {
    saveCustomerDistancesAndDurationFailMessage = "Save customer distance and duration fail.",
    requestGoogleDirectionFailMessage = 'Please try again, Directions request failed due to ',
    sequenceRouteFromServeFailMessage = "Sequence from serve fail.",
    optimizeRouteInfoNotMatchMaxStopCountFailMessage = "Total Max Number of Stops is less than the Total Stops for selected Routes. Please update the Max Number of Stops and Try Again.",
    optimizeRouteInfoNotMatchMaxWeightFailMessage = "Total Max Weight is less than the Total Weight for selected Routes. Please update the Max Weight and Try Again.",
    optimizeRouteInfoNotMatchMaxCasesFailMessage = "Total Max Cases is less than the Total Cases for selected Routes. Please update the Max Cases of Stops and Try Again.",
    optimizeRouteInfoNoSelectedFromRoute = 'Please select From Route first',
    optimizeRouteInfoNoSelectedToRoute = 'Please select To Route first',
    optimizeRouteInfoNoSelectedFromRouteAndToRoute = 'Please select From Route And To Route first',
    cannotDeleteReason = "Event has a related invoice and cannot be deleted.",
    moreThan500StopMessage = 'A total of more than 1000 stops and cannot be efficiently routed. Only customer pins will be displayed for these routes.',
    isSaveChangesMessage = 'Save Changes ?',
    defaultRouteNotFoundMessage = 'Default Route not found. Stops have not been moved.'
};

export const ShowColumnOption = {
    StopName: {
        columnName: "Stop Name",
        isShow: true
    },
    Phase: {
        columnName: "Phase",
        isShow: true
    },
    StopsperWeek: {
        columnName: "Stops per Week",
        isShow: true
    },
    CasesperStop: {
        columnName: "Cases per Stop",
        isShow: true
    },
    CustomerID: {
        columnName: "CustomerID",
        isShow: false
    },
    ShortName: {
        columnName: "Short Name",
        isShow: false
    },
    City: {
        columnName: "City",
        isShow: false
    },
    State: {
        columnName: "State",
        isShow: false
    },
    Company: {
        columnName: "Company",
        isShow: false
    },
    Address: {
        columnName: "Address",
        isShow: false
    },
    PostalCode: {
        columnName: "Postal Code",
        isShow: false
    }
};

export const Colors = [
    {"label":"Blue","value":"0000FF"},
    {"label":"Navy Blue","value":"000080"},
    {"label":"Slate Blue","value":"483D8B"},
    {"label":"Steel Blue","value":"4682B4"},
    {"label":"Sky Blue","value":"00BFFF"},
    {"label":"Forest Green","value":"228B22"},
    {"label":"Olive Green","value":"556B2F"},
    {"label":"Sea Green","value":"2E8B57"},
    {"label":"Lime Green","value":"32CD32"},
    {"label":"Yellow Green","value":"9ACD32"},
    {"label":"Gold","value":"FFD700"},
    {"label":"Golden Rod","value":"DAA520"},
    {"label":"Medium Yellow","value":"CDCD00"},
    {"label":"Dark Yellow","value":"8B8B00"},
    {"label":"Khaki","value":"BDB76B"},
    {"label":"Saddle Brown","value":"8B4513"},
    {"label":"Brown","value":"CD853F"},
    {"label":"Chocolate Brown","value":"D2691E"},
    {"label":"Orange","value":"FF8C00"},
    {"label":"Dark Orange","value":"CD3700"},
    {"label":"Orange Red","value":"FF4500"},
    {"label":"Red","value":"FF0000"},
    {"label":"Tomato Red","value":"FF6347"},
    {"label":"Firebrick Red","value":"B22222"},
    {"label":"Indian Red","value":"CD5C5C"},
    {"label":"Salmon","value":"EE8262"},
    {"label":"Pink","value":"FF1493"},
    {"label":"Dark Pink","value":"8B5F65"},
    {"label":"Rosy Brown","value":"BC8F8F"},
    {"label":"Maroon","value":"B03060"},
    {"label":"Violet Red","value":"D02090"},
    {"label":"Magenta","value":"FF00FF"},
    {"label":"Violet","value":"EE82EE"},
    {"label":"Orchid Purple","value":"BA55D3"},
    {"label":"Purple","value":"A020F0"},
    {"label":"Medium Purple","value":"9370DB"},
    {"label":"Black","value":"000000"},
    {"label":"Dark Grey","value":"363636"},
    {"label":"Light Grey","value":"8B8989"}
    ];

export interface Phase {
    text:string,
    value:string
}

export const ActivityText = {
    delivery: "Delivery",
    sales: "Sales",
    merchandiser: "Merchandiser",
    other: "Other"
  };


