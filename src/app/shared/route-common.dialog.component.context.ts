/**
 * Created by 123 on 2018/4/5.
 */
import {DialogPreset, VEXModalContext} from 'ngx-modialog/plugins/vex'
import { RouteInfo } from './route-info.model'
import {EventEmitter} from '@angular/core'
import {RootJson} from "./root-json.model";

export class RoutePrintDialogPreset extends DialogPreset{
  constructor() {
    super();
  }

  public message: string;

  public routeInfos: Array<RouteInfo>;
  public onPrintSimmary:EventEmitter<string>;
  public routeJson: RootJson;
  public printService;
  public listelements;
  public printOptionList;
  public salesColumnGroupNameFieldValueObjectArray;
  public routeInfo;
  public dataService;
  public mapPoints;
  public mapPointID;
  public salesColumnGroupName;
  public mapService;
  public mapRoutingService;
  public globalSettingService;
  public stopInfo;
  public mappedRouting;
  public loadSheetFilted;
  public result;
  public isbeforeunloadHandler;
  public action;
  public errorInfo;
  public count;
  public stopInfos;
  public allRoute;
  public activityList;
  public rootJson;
  public routePlanner;
  public isSaveChange;
  public locationIDstr;
  public lSDatestr;
  public loadSheetIDstr;
  public modal;
  public changeInfos;
  public currentTableColumnsDisplayObjs;
}
