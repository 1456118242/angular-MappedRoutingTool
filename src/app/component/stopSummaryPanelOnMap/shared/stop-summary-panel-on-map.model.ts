import {FieldValueObject} from '../../../shared/field-value-object.model';
import { TimeFieldObject } from '../../../shared/time-field-object.model';

export class StopSummaryOnMap {
  parentID?:string;
  id?:string;
  customerID?: string;
  userName?: string;
  company?:string;
  address?: string;
  address2?: string;
  routeName?: string;
  fieldValueObjects?: FieldValueObject[];
  serviceTimes?: TimeFieldObject[];
  totalFieldValueObjects?: FieldValueObject[];
}
