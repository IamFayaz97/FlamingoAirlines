import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

cards =
  [
    {
      title: 'Passengers',
      url: 'assets/images/logo/passengers_logo.jpg'
    },
    {
      title: 'Inflight Purchase',
      url: 'assets/images/logo/cart_logo.png'
    },
    {
      title: 'Ancilliary Services',
      url: 'assets/images/logo/ancilliary_logo.png'
    },
    {
      title: 'Meals',
      url: 'assets/images/logo/meals_logo.jpg'
    }
  ];

  constructor(private router: Router) {}
  manage(situation: string){

    if (situation === 'Passengers') {
      this.router.navigate(['/admin/managePassengers']);
    }

    else if (situation === 'Inflight Purchase') {
      this.router.navigate(['/admin/managePurchases']);
 }

    else if (situation === 'Ancilliary Services') {
      this.router.navigate(['/admin/manageServices']);
 }

    else if (situation === 'Meals') {
      this.router.navigate(['/admin/manageMeals']);
 }
  }


}
