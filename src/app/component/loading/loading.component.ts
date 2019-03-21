import {OnChanges,Component} from '@angular/core'
import { ObservableBusService } from '../../service/observable-bus.service'

@Component({
  selector:'loading',
  templateUrl:'./loading.component.html',
  providers:[]
})


export class LoadingComponent {
  public state = {
    isShow: false,
    status: 0,
    loadingBarWidth: '0%',
    loadingText: '1%'
  };
  public startSize = 0.02;
  private incTimeout = null;
  private started = false;
  constructor( public observableBusService :ObservableBusService) {
    this.observableBusService.loading$.subscribe((isShowLoading)=>{
      if(isShowLoading){
        this.state.isShow = isShowLoading;
        this.start()
      }else {
        this.complete();
        this.started = isShowLoading
      }


    });
  }

  // componentDidMount(){
  //      if (this.props.isShow){
  //
  //          this.start()
  //
  //      }else{
  //          this.started = false
  //      }
  // }



  start() {

    if ( this.started ) {
      return;
    }

    this.started = true;
    this.launch( this.startSize );

  }

  launch( n ) {
    if ( !this.started ) {
      return;
    }

    let pct = (n * 100) + '%';
    let tmpText = parseInt( (n * 100) ) + "%";

    this.state.loadingBarWidth = pct;
    this.state.loadingText = tmpText;
    this.state.status = n;
    let self = this;
    clearTimeout( this.incTimeout );
    this.incTimeout = setTimeout( function () {
      self.simulateProgress();
    }, 250 );

  }

  simulateProgress() {
    if ( this.state.status >= 1 ) {
      return;
    }

    let rnd = 0;

    let stat = this.state.status;
    if ( stat >= 0 && stat < 0.25 ) {
      // Start out between 3 - 6% increments
      rnd = (Math.random() * (5 - 3 + 1) + 3) / 100;
    } else if ( stat >= 0.25 && stat < 0.65 ) {
      // increment between 0 - 3%
      rnd = (Math.random() * 3) / 100;
    } else if ( stat >= 0.65 && stat < 0.75 ) {
      // increment between 0 - 2%
      rnd = (Math.random() * 2) / 100;
    } else if ( stat >= 0.75 && stat < 0.99 ) {
      // finally, increment it .5 %
      rnd = 0.005;
    } else {
      // after 99%, don't increment:
      rnd = 0;
    }

    let pct = this.state.status + rnd;

    this.launch( pct )
  }

  complete() {
    this.launch( 1 );
    let self = this;

    setTimeout( function () {
      self.state.isShow = false;
    }, 100 );
  }

  buildloadingBarStyle() {
    return {
      width: this.state.loadingBarWidth
    }
  }

  // buildStyle(){
  //     return {
  //         display: this.state.isShow ? "block" : "none"
  //     }
  // }

}


