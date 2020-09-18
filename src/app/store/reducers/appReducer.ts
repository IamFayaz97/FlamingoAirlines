import { ActionReducerMap } from '@ngrx/store';
import * as fromFlight from '../reducers/flightReducer';
import * as fromPassenger from '../reducers/passengerReducer';
// import * as fromSeat from '../reducers/seat.reducer'

export interface AppState{
  flightState: fromFlight.State;
   passengerState: fromPassenger.State;
//   seatState : fromSeat.SeatState;
}

export const appReducer: ActionReducerMap<AppState> = {
    flightState : fromFlight.FlightReducer,
    passengerState : fromPassenger.PassengerReducer,
    // seatState    : fromSeat.SeatReducer
};
