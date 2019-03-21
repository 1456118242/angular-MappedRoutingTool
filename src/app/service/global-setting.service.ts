import { Injectable } from '@angular/core'
import {RootJson} from "../shared/root-json.model";

@Injectable()
export class GlobalSettingService {
  public MapPointJsonData_Server:any;
  public DeliverymanList_Server:any;
  public CustomerReceipt_Server:any;
  public isSaveDataAction:boolean;
  public HelperPercent : number = 1;
  public MilesConversionConstant: number = 1609.344;
  public rootJson:RootJson;
  public oldRootJson: RootJson;
  public beforeAutoChangeRootJson: RootJson;
  public OldShowProductPickTypesetting: any;
  public samePlanLoadSheetObjList:any[];
  public routeTypeActivityEvents:any;
  public newLoadSheetId:any;
  public Route_Server: any;
  public Activity_Server: any;
  public routeIdStr:string;
  public isDrawRoutesByManual:boolean;
  public isMultiWindow: boolean;
}
