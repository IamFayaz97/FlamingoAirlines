import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import { Store , Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PassengersService } from '../../services/passengers.service';
import { mergeMap, map } from 'rxjs/operators';
import * as fromApp from '../reducers/appReducer';
import * as FlightAction from '../actions/flightAction';

@Injectable()
export class FlightEffect {
    constructor(private action: Actions,
                private store: Store<fromApp.AppState>,
                private passengerService: PassengersService){}

        @Effect()
        loadFlights: Observable<Action> = this.action.pipe(
            ofType<FlightAction.FlightsActionsUnion>(FlightAction.FLIGHTS_LOAD),
            mergeMap(action => this.passengerService.getFlights().pipe(
                map(flights => new FlightAction.FlightsLoadSuccess(flights))
            ))
        );
}
