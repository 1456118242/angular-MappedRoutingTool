import { RouteInfo } from './route-info.model'
import {ToolsBar} from '../component/toolsbar/shared/tools-bar.model'
import {FieldValueObject} from "./field-value-object.model";
import {StopSummaryPanelOnMap} from "../component/stopSummaryPanelOnMap/stop-summary-panel-on-map.component";
import {StopSummaryOnMap} from "../component/stopSummaryPanelOnMap/shared/stop-summary-panel-on-map.model";
import {RouteSummaryOnMap} from "../component/routeSummaryPanelOnMap/shared/route-summary-on-map.model";
import {CustomColumn} from "./custom-column.model";

export class RootJson {
  routeInfos: Array<RouteInfo>;
  showCustomColumnssetting:string;
  salesColumnGroupName: Array<string>;
  salesColumnGroupNameFieldValueObjectArray:Array<FieldValueObject>;
  isSelectAllRouteInfo:boolean;
  isDrawRouteline:boolean;
  currentShowStopSummaryOnMapObj: StopSummaryOnMap;
  isShowStopSummaryOnMap: boolean;
  currentShowRouteSummaryOnMapObj: RouteSummaryOnMap;
  isShowRouteSummaryOnMap: boolean;
  showColumn:string;
  reSeqSetting:string;
  isAutoRoute?:boolean;
  isSaveLoadSheetAndRoute?:boolean;
  timeFormat: any;
  sumOfCustomColumns: CustomColumn[];
  dateFormat:number;
  timelineHeaderObjList?: any;
  isShowTimeline?:boolean;
  isShowMoveToThisLoadSheet?:boolean;
  routeEditPermission?:string;
  ShowExtPrice?:string;
  currentShowPhase:any;
}
