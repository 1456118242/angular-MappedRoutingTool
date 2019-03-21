import {FieldValueObject} from '../../../shared/field-value-object.model';

export class RouteSummaryOnMap {
  routeName?:string;
  deliveryman?:string;
  stopCount?:number;
  totalFieldValueObjects?: FieldValueObject[];
  travelTime?:string;
  serviceTime?: string;
  totalTime?: string;

}
