import { Injectable } from '@angular/core';

import { StopInfo } from '../../../shared/stop-info.model'
import { DropDownMenuTemplate } from '../../dropDownMenu/shared/drop-down-menu.model'

@Injectable()
export class RouteInfoService {

  buildSequenceDropDownMenuTemplate(): DropDownMenuTemplate{
    // const dropDownMenuTemplate = new DropDownMenuTemplate();
    // dropDownMenuTemplate.menuText = 'Re-Seq';
    // dropDownMenuTemplate.keyValues = [{
    //   field:'Closest Stop First',
    //   value: "0",
    //   isShow: false
    // },{
    //   field:'Farthest Stop First',
    //   value: "1",
    //   isShow: false
    // },{
    //   field:'Service Windows',
    //   value: "2",
    //   isShow: false
    // },{
    //   field:'Shortest Distance',
    //   value: "3",
    //   isShow: false
    // }];
    //
    // return dropDownMenuTemplate;

    return null;

  }
}
