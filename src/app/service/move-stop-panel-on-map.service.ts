import {Injectable} from '@angular/core'

@Injectable()
export class MoveStopPanelOnMapService {
    private moveStopDiv: any;
    public clickHandler: any;

    constructor() {
        this.moveStopDiv = document.createElement('div');
        this.moveStopDiv.setAttribute('id', 'move-stop-div-on-map');

        let btn = document.createElement('a');
        btn.setAttribute('style', 'padding-left: 3px;cursor:pointer;');
        btn.text = "Place selected stops after this stop in sequence";
        const _self = this;

        btn.onclick = function () {
            _self.clickHandler();
        };

        this.moveStopDiv.appendChild(btn);
    }


    public setPosition(position: any) {
        let btnGroupHeight = document.getElementById("btn-group").clientHeight;
        let routeListHeight = document.getElementById("route-list").clientHeight;
        let offsetTopPixel = routeListHeight + btnGroupHeight;

        if (document.querySelectorAll("#move-stop-div-on-map").length == 0) {
            document.body.appendChild(this.moveStopDiv);
        }
        let left = position.x;
        let top = position.y + offsetTopPixel || 0;
        document.getElementById("move-stop-div-on-map").style.left = left.toString() + 'px';
        document.getElementById("move-stop-div-on-map").style.top = top.toString() + 'px';
    }

    public remove() {
        let tmpDiv = document.querySelectorAll("#move-stop-div-on-map");
        if (tmpDiv.length > 0) {
            tmpDiv[0].parentNode.removeChild(tmpDiv[0]);
        }
    }
}
