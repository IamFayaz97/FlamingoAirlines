import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassengersService {
    login: any;
    public loggedIn: boolean = !!localStorage.getItem('SessionUser');
    public selectedFlight: any = null;
    public msgforInvalidLogin = false;
  constructor(private httpService: HttpClient) {
   }
  getPassengers(): Observable<any>{
    return this.httpService.get('./assets/passengers.json');
  }
  getAncilliaryServices(): Observable<any>{
    return this.httpService.get('./assets/ancilliaryServices.json');
  }
  getMeals(): Observable<any>{
    return this.httpService.get('./assets/meals.json');
  }
  getFlights(): Observable<any>{
    return this.httpService.get('./assets/flights.json');
  }
  getPurchases(): Observable<any>{
    return this.httpService.get('./assets/inflightPurchase.json');
  }
  gettoken(){
    return !!localStorage.getItem('SessionUser');
  }
  getRole(){
    return localStorage.getItem('SessionUser');
  }
  cleartoken(){
    localStorage.clear();
  }
}
