import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PassengersService } from '../../../services/passengers.service';
import { Flight } from 'src/app/models/flight.model';
import { AppState } from 'src/app/store/reducers/appReducer';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/flightReducer';
import * as flightAction from 'src/app/store/actions/flightAction';
import * as fromApp from 'src/app/store/reducers/appReducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display-flights',
  templateUrl: './display-flights.component.html',
  styleUrls: ['./display-flights.component.css']
})
export class DisplayFlightsComponent implements OnInit {

  flights: Flight[] = [];
  flightsObs: Observable<State>;

  constructor(
    private passengersService: PassengersService,
    public dialogRef: MatDialogRef<DisplayFlightsComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private store: Store<fromApp.AppState>) {
      this.flightsObs = this.store.select('flightState');
      this.store.dispatch(new flightAction.FlightsLoad());
      this.flightsObs.subscribe((state: State) =>
    (this.flights = state.flights)
    );
  }

  ngOnInit(): void {
  }
  cancel(flight: Flight){
    this.passengersService.selectedFlight = flight;
    this.dialogRef.close({ data: this.modalData.user });
  }
  validateFlights(flight: Flight){
    const time = new Date().getHours();
    let disableProperty = false;
    if (parseInt(flight.flightTime.substring(0, 2), 10) > time) {
      disableProperty = false;
    }
    else {
      disableProperty = true;
    }

    switch (this.modalData.user) {
      case 'staff-checkin':
        return !disableProperty;
      case 'staff-inflight':
        return disableProperty;
    }
  }
  isAdmin(){
    if (this.modalData.user === 'admin') {
      return true;
    }
    else {
     return false;
    }
  }
}
