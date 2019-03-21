/**
 * Created by 123 on 2018/4/24.
 */
import {Injectable} from '@angular/core';
import {UtilService} from './util.service'
import {RouteInfo} from "../shared/route-info.model";
import {RepositoryService} from "./repository.service";
@Injectable()
export class PrintService {
    public constructor(public util: UtilService, public repositoryService: RepositoryService) {
        console.log(this.util);
    }

    printSummery(id: string) {
        this.util.print(id);
    }

    lSdataFormat(routeInfos: Array<RouteInfo>) {
        routeInfos.forEach((r) => {
            r.lSDate = this.util.dateFormat(r.lSDate);
        });
    }

    dateAndTimeFormat(): string {
        return this.util.dateAndTimeFormat();
    }

    addCustomerReceiptToStop(listelements) {
        listelements.forEach((listelement) => {
            listelement.route.stopInfos.forEach((stop) => {
                try {
                    stop.customerReceipt = Number(Number(this.repositoryService.getReceiptByCustomerIDAndLoadSheetID(stop.customerID, listelement.route.id)["Receipt"]).toFixed(2));
                } catch (e) {
                    stop.customerReceipt = 0;
                }
            });
        });
    }

    addTotalCustomerReceiptToRoute(listelements) {
        listelements.forEach((listelement) => {
            let total = 0;
            listelement.route.stopInfos.forEach((stop) => {
                total = total + stop.customerReceipt
            });
            listelement.route['totalCustomerReceipt'] = total;
        });
    }


}
