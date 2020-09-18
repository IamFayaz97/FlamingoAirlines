import { Component, OnInit } from '@angular/core';
import { PassengersService } from '../../../../services/passengers.service';
import { Meals } from '../../../../models/meals.model';
import { InflightPurchase } from '../../../../models/inflightpurchase.model';
import { AncilliaryServices } from '../../../../models/ancilliaryservices.model';
import { Passenger } from 'src/app/models/passenger.model';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Flight } from 'src/app/models/flight.model';

@Component({
  selector: 'app-inflight',
  templateUrl: './inflight.component.html',
  styleUrls: ['./inflight.component.css']
})
export class InflightComponent implements OnInit {

  meals: Meals[];
  purchases: InflightPurchase[];
  ancServices: AncilliaryServices[];
  passengers: Passenger[];
  totalPassengers: number;
  updatePassengers = {};
  update = false;
  selectiveItems: FormGroup;
  noMeals = {};
  selectedFlight: Flight;
  checkedSeats: string[] = [
    'A1', 'A2', 'A3', 'A4', 'A5', 'A6',
    'B1', 'B2', 'B3', 'B4', 'B5', 'B6',
    'C1', 'C2', 'C3', 'C4', 'C5', 'C6',
    'D1', 'D2', 'D3', 'D4', 'D5', 'D6',
    'E1', 'E2', 'E3', 'E4', 'E5', 'E6',
    'F1', 'F2', 'F3', 'F4', 'F5', 'F6'
  ];
  status = false;
  constructor(
    private passengerService: PassengersService,
    public fb: FormBuilder
     ) {
      this.passengerService.getMeals().subscribe(
        data => { this.meals = data as Meals[]; }
      );
      this.passengerService.getPurchases().subscribe(
        data => { this.purchases = data as InflightPurchase[]; }
      );
      this.passengerService.getAncilliaryServices().subscribe(
        data => { this.ancServices = data as AncilliaryServices[]; }
      );
      this.passengerService.getPassengers().subscribe(
        data => {
          this.passengers = data as Passenger[];
          this.totalPassengers = this.passengers.length;
          this.checkNoMeals(this.passengers);
        }
      );
      this.selectedFlight = this.passengerService.selectedFlight;
  }
  checkNoMeals(passengers: Passenger[]){
    for (let index = 0; index < this.passengers.values.length; index++) {
      if (this.passengers[index].passengerMeals.values.length === 0) {
         this.noMeals[index] = true;
      }
      else {
        this.noMeals[index] = false;
      }
      console.log(this.noMeals);
     }
  }
  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.selectiveItems = new FormGroup({
      passengerMeals : new FormControl('', Validators.required),
      passengerServices : new FormControl('', Validators.required),
      passengerPurchases : new FormControl('', Validators.required)
    });
  }
  editPassenger(passenger: Passenger, index: number){
    this.updatePassengers[index] = true;
    if (passenger.passengerPurchases == null) {
      passenger.passengerPurchases = [];
    }
    this.selectiveItems.setValue({
      passengerMeals: passenger.passengerMeals,
      passengerServices: passenger.passengerServices,
      passengerPurchases: passenger.passengerPurchases
    });
  }
  addOptions(passengerName: string){
    this.passengers.map( passenger => {
      if (passenger.passengerName === passengerName){
        passenger.passengerMeals = this.selectiveItems.get('passengerMeals').value;
        passenger.passengerServices = this.selectiveItems.get('passengerServices').value;
        passenger.passengerPurchases = this.selectiveItems.get('passengerPurchases').value;
      }
    });
    this.resetSelection();
  }
  resetSelection(){
    this.selectiveItems.reset({
      passengerMeals: [],
      passengerServices: [],
      passengerPurchases: []
    });
    this.updatePassengers = {};
  }
  checkMealStatus(seat: string){
    this.passengers.filter(data => data.passengerMeals != null);
  }
  checkSeatStatus(seat: string){
    if (!this.passengers) {
      return false;
    }
    return this.passengers.filter(data => data.passengerMeals != null)
    .map(data => data.seat).includes(seat);
  }
}
