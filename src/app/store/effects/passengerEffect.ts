import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import { Store , Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PassengersService } from '../../services/passengers.service';
import { mergeMap, map } from 'rxjs/operators';
import * as fromApp from '../reducers/appReducer';
import * as PassengerAction from '../actions/passengerAction';

@Injectable()
export class PassengerEffect {
    constructor(private action: Actions,
                private store: Store<fromApp.AppState>,
                private passengerService: PassengersService){}

        @Effect()
        loadFlights: Observable<Action> = this.action.pipe(
            ofType<PassengerAction.PassengersActionsUnion>(PassengerAction.PASSENGERS_LOAD),
            mergeMap(action => this.passengerService.getPassengers().pipe(
                map(passengers => new PassengerAction.PassengersLoadSuccess(passengers))
            ))
        );
}
