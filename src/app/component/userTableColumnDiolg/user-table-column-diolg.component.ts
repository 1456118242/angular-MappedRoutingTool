import { Component, OnInit } from '@angular/core';
import {DialogRef} from "ngx-modialog";
import {RoutePrintDialogPreset} from "../../shared/route-common.dialog.component.context";
import * as _ from 'lodash';
import {CustomColumn} from '../../shared/custom-column.model'

@Component({
  selector: 'app-user-table-column-diolg',
  templateUrl: './user-table-column-diolg.component.html',
})
export class UserTableColumnDiolgComponent implements OnInit {

  public currentTableColumnsDisplayObjs:Array<CustomColumn>;
  public groupCount;
  public overCount;


  constructor(public dialog:DialogRef<RoutePrintDialogPreset>) {
      this.dialog.context.contentClassName = "vex-content";
      this.dialog.context.overlayClassName = "vex-overlay";
      document.querySelector('css-dialog-container').className='vex vex-theme-default';
      this.currentTableColumnsDisplayObjs = dialog.context.currentTableColumnsDisplayObjs;
      const allCount  = this.currentTableColumnsDisplayObjs.length;
      this.groupCount = Array.from({length: Math.floor(allCount/6)});
      this.overCount = Array.from({length: allCount%6});
  }

  ngOnInit() {

  }

  saveCustomColumns() {
    let selectedColumns = _.chain(this.currentTableColumnsDisplayObjs)
        .filter((tableColumn:CustomColumn) => {
          return tableColumn.isShowInRouteSummary;
        })
        .map("field")
        .value()
        .toString();
    this.dialog.close(selectedColumns)
  }

  closeThisDialog() {
    this.dialog.close();
  }
}
