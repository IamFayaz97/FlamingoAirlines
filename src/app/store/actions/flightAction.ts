import { Action } from '@ngrx/store';
import { Flight } from '../../models/flight.model';

export const FLIGHTS_LOAD = '[Flight] Load flights';
export const FLIGHTS_LOAD_SUCCESS = '[Flights] Load flights success';

export class FlightsLoad implements Action{
    readonly type = FLIGHTS_LOAD;
}
export class FlightsLoadSuccess implements Action{
    readonly type = FLIGHTS_LOAD_SUCCESS;
    constructor(public payload: Flight[]){}
}
export type FlightsActionsUnion = FlightsLoad | FlightsLoadSuccess;
