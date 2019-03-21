import { RequestedStop } from './requested-stop.model'

export class RequestedRoute {
  id?: string;
  color?: string;
  name?: string;
  startLat?: number;
  startLng?: number;
  endLat?: number;
  endLng?: number;
  calculateDirectionsByManual?: boolean;
  duration?: number;
  distance?: number;
  requestStops?: Array<RequestedStop>
}
