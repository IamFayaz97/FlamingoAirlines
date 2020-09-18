import { Passenger } from '../../models/passenger.model';
import * as PassengerAction from '../actions/passengerAction';

export interface State{
    passengers: Passenger[];
}
const initialState: State = { passengers: [] };

export function PassengerReducer(state= initialState, action: PassengerAction.PassengersActionsUnion){
    switch (action.type) {
        case PassengerAction.PASSENGERS_LOAD:
            return {...state};
        case PassengerAction.PASSENGERS_LOAD_SUCCESS:
            return {...state, passengers: action.payload};
        default:
            return state;
    }
}
