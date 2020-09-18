import { Component, OnInit } from '@angular/core';
import { PassengersService } from '../../../../services/passengers.service';
import { AncilliaryServices } from '../../../../models/ancilliaryservices.model';
import { Passenger } from 'src/app/models/passenger.model';
import { FormBuilder } from '@angular/forms';
import { Flight } from 'src/app/models/flight.model';
import { State } from 'src/app/store/reducers/passengerReducer';
import * as fromApp from 'src/app/store/reducers/appReducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Meals } from 'src/app/models/meals.model';
import { InflightPurchase } from 'src/app/models/inflightpurchase.model';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {
  constructor(
    private passengerService: PassengersService,
    public fb: FormBuilder,
    private store: Store<fromApp.AppState>
  ) {
    this.passengerService.getPassengers().subscribe(
      data => {
        this.passengers = data as Passenger[];
        this.totalPassengers = this.passengers.length ;
        this.unfilteredPassengers = this.passengers;
        this.totalunfilteredPassengers = this.unfilteredPassengers.length;
    });
    this.passengerService.getAncilliaryServices().subscribe(
      data => {
        this.ancServices = data as AncilliaryServices[];
      }
    );
    this.passengerService.getMeals().subscribe(
      data => {
        this.meals = data as Meals[];
      }
    );
    this.passengerService.getPurchases().subscribe(
      data => {
        this.purchases = data as InflightPurchase[];
      }
    );
    this.selectedFlight = this.passengerService.selectedFlight;
   }
  checkedSeats: string[] = [
    'A1', 'A2', 'A3', 'A4', 'A5', 'A6',
    'B1', 'B2', 'B3', 'B4', 'B5', 'B6',
    'C1', 'C2', 'C3', 'C4', 'C5', 'C6',
    'D1', 'D2', 'D3', 'D4', 'D5', 'D6',
    'E1', 'E2', 'E3', 'E4', 'E5', 'E6',
    'F1', 'F2', 'F3', 'F4', 'F5', 'F6'
  ];
  showFilters = false;
  unfilteredPassengers: Passenger[];
  passengers: Passenger[] = [];
  totalPassengers = 0;
  totalunfilteredPassengers = this.totalPassengers;
  ancServices: AncilliaryServices[];
  selectedFlight: Flight;
  updatePassengers = {};
  checkedSeat: any;
  checkinIndex = 0;
  changeRequest: boolean;
  allowCheckin = false;
  selectedIndex = 1;
  allowUndoCheckIn = false;
  checkedIndex = 0;
  hasInfant = false;
  showOptions = {};
  needsWheelChair = false;
  showErrorMessage = false;
  checkboxes = {};
  passengersObs: Observable<State>;
  meals: Meals[];
  purchases: InflightPurchase[];

  checkedSeatindex: number;
  checkInEvent: any;
  ngOnInit(): void {
  }
  seeOptions(i: number, passenger: Passenger){
    this.showOptions[i] = true;
    this.hasInfant = passenger.hasInfant;
    this.needsWheelChair = passenger.needWheelChair;
  }
  filter(passengerType: string){
    if (this.passengers == null) {
      return ;
    }
    this.passengers = this.unfilteredPassengers;
    switch (passengerType) {
      case 'infant':
        this.passengers = this.passengers.filter(data => {
          return (data.hasInfant === true);
        });
        break;
      case 'wheelchair':
          this.passengers = this.passengers.filter(data => {
            return (data.needWheelChair === true);
          });
          break;
      case 'checkedin':
          this.passengers = this.passengers.filter(data => {
            return (data.seat != null);
          });
          break;
      case 'notcheckedin':
        this.passengers = this.passengers.filter(data => {
          return (data.seat == null);
        });
        break;
      case 'cancelfilters':
        this.showFilters = false;
        break;
    }
    this.totalPassengers = this.passengers.length;
  }
  checkedInPassenger(seat: string){
    if (!this.passengers) {
      return false;
    }
    return this.passengers.filter(data => data.seat != null)
    .map(data => data.seat).includes(seat);
  }
  getTypeOfPassenger(seat: string){
    if (!this.passengers) {
      return false;
    }
    if (this.passengers.filter(data => data.hasInfant === true).map(data => data.seat).includes(seat)) {
      return '2px solid yellow';
    }
    else if (this.passengers.filter(data => data.needWheelChair === true).map(data => data.seat).includes(seat)) {
      return '2px solid red';
 }
  }
  checkInToFlight(index: number){
    this.allowCheckin = true;
    this.selectedIndex = 0;
    this.checkinIndex = index;
  }
  reservedStatus(seat: string): boolean{
    if (!this.passengers) {
      return ;
    }
    const index = this.passengers.filter(data => data.seat != null).findIndex(data => data.seat === seat);
    if (this.allowCheckin && (index === -1)){
        return false;
    }
    else if (this.allowUndoCheckIn && (index !== -1)){
        return false;
    }
    else {
      return true;
 }
  }
  bookIn(){
    this.passengers[this.checkinIndex].seat = this.checkedSeat;
    this.unfilteredPassengers[this.checkinIndex].seat = this.checkedSeat;
    this.passengers[this.checkinIndex].hasInfant = this.hasInfant;
    this.unfilteredPassengers[this.checkinIndex].hasInfant = this.hasInfant;
    this.passengers[this.checkinIndex].needWheelChair = this.needsWheelChair;
    this.unfilteredPassengers[this.checkinIndex].needWheelChair = this.needsWheelChair;
    this.resetCheckIn();
  }
  resetCheckIn(){
    this.needsWheelChair = false;
    this.hasInfant = false;
    this.checkedSeat = null;
    this.allowCheckin = false;
    this.allowUndoCheckIn = false;
    this.changeRequest = false;
    this.selectedIndex = 1;
    this.showOptions = {};
    this.showErrorMessage = false;
    this.checkboxes = {};
    this.passengers = this.unfilteredPassengers;
    if (this.checkInEvent != null) {
      this.checkInEvent.target.checked = false;
    }
  }
  undoCheckInFromFlight(){
    this.allowUndoCheckIn = true;
    this.selectedIndex = 0;
  }
  undoCheckIn(){
    if (!this.passengers) {
      return false;
    }
    const index = this.passengers.filter(data => data.seat != null).findIndex(data => data.seat === this.checkedSeat);
    if (index !== -1){
    this.passengers[index].seat = null;
    this.allowUndoCheckIn = false;
    this.selectedIndex = 1;
   }
   else{
     this.showErrorMessage = true;
   }
    this.resetCheckIn();
  }
  onChange(event: any, index: number){
    if (this.checkedSeat && this.allowCheckin){
      this.showErrorMessage = true;
      if (event.target.checked) {
        event.target.checked = false;
      }
      else {
        this.checkedSeat = null;
      }
    }
    else if (this.checkedSeat && this.allowUndoCheckIn){
      this.showErrorMessage = true;
      if (!event.target.checked) {
        event.target.checked = true;
      }
      else {
        this.checkedSeat = null;
      }
    }
    else{
      this.checkedSeat = event.target.value;
      this.checkInEvent = event;
    }
  }
  changeSeat(passenger: Passenger){
    this.selectedIndex = 0;
    this.allowCheckin = true;
    this.changeRequest = true;
  }
  changeSeating(){
    this.passengers[this.checkinIndex].seat = this.checkedSeat;
    this.unfilteredPassengers[this.checkinIndex].seat = this.checkedSeat;
    this.resetCheckIn();
  }
}
