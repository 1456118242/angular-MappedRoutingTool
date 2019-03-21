import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

import {Phase, PhaseType} from '../../shared/constant'
import {ObservableBusService} from "../../service/observable-bus.service";

@Component({
  selector: 'phase-select-panel',
  templateUrl:'phase-select-panel.component.html',
  providers:[]

})
export class PhaseSelectPanelComponent implements OnInit ,OnChanges{

  @Output() onChangePhase = new EventEmitter<Phase>();
  @Input() currentShowPhase_v:{text:string,value:string};
  public phaseType_v: any;

  constructor(private observerble :ObservableBusService) {
    this.phaseType_v = PhaseType;

  }

  ngOnInit(): void{
      this.observerble.refreshComponentToViewSource$.subscribe(()=>{
          this.currentShowPhase_v = PhaseType.all;
      });
  }

  public changePhase(selectedPhase: Phase){
    this.currentShowPhase_v = selectedPhase;
    this.onChangePhase.emit(selectedPhase);
  }

    ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
    }



}

