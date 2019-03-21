import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';

import { FieldValueObject } from '../../shared/field-value-object.model';
import { DropDownMenuTemplate } from './shared/drop-down-menu.model';

import { DropDownMenuService } from './shared/drop-down-menu.service';

@Component({
  selector: 'drop-down-menu',
  templateUrl:'drop-down-menu.component.html',
  providers:[ DropDownMenuService ]

})
export class DropDownMenuComponent implements OnInit{

  @Input() dropDownMenuTemplate: DropDownMenuTemplate;
  @Output() onClick = new EventEmitter<FieldValueObject>();
  @Output() onSelectItem = new EventEmitter<FieldValueObject>();

  public isShowDropDownMenu_v: boolean;

  constructor(public dropDownMenuService: DropDownMenuService) {
    this.setIsShowDropDownMenuFalse();
  }

  ngOnInit(): void{

  }

  toggleDropDownMenu(): void{
    this.isShowDropDownMenu_v = !this.isShowDropDownMenu_v;
  }

  setIsShowDropDownMenuFalse(): void{
    this.isShowDropDownMenu_v = false;
  }

  public clickHandler(){
    this.setIsShowDropDownMenuFalse();
    const selectedKeyValue = this.dropDownMenuTemplate.keyValues.find(d => d.isShow);

    this.onClick.emit(selectedKeyValue);
  }

  public selectItemHandler(keyValue: FieldValueObject){
    this.setIsShowDropDownMenuFalse();
    this.dropDownMenuTemplate.keyValues.forEach(d => d.isShow = false);
    keyValue.isShow = true;

    this.onSelectItem.emit(keyValue);
  }

}

