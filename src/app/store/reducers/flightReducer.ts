import { Flight } from '../../models/flight.model';
import * as FlightAction from '../actions/flightAction';

export interface State{
    flights: Flight[];
}
const initialState: State = { flights: [] };
export function FlightReducer(state= initialState, action: FlightAction.FlightsActionsUnion){
    switch (action.type) {
        case FlightAction.FLIGHTS_LOAD:
            return {...state};
        case FlightAction.FLIGHTS_LOAD_SUCCESS:
            return {...state, flights: action.payload};
        default:
            return state;
    }
}
