import { Action } from '@ngrx/store';
import { Passenger } from '../../models/passenger.model';

export const PASSENGERS_LOAD = '[Passenger] Load passengers';
export const PASSENGERS_LOAD_SUCCESS = '[Passenger] Load passengers success';

export class PassengersLoad implements Action{
    readonly type = PASSENGERS_LOAD;
}
export class PassengersLoadSuccess implements Action{
    readonly type = PASSENGERS_LOAD_SUCCESS;
    constructor(public payload: Passenger[]){}
}

export type PassengersActionsUnion = PassengersLoad | PassengersLoadSuccess;
