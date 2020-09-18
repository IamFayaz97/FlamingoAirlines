import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PassengersService } from '../services/passengers.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private passengerService: PassengersService, private router: Router){}
  canActivate(): boolean{
    if (!(this.passengerService.getRole() === 'admin')) {
        this.passengerService.msgforInvalidLogin = true;
        this.passengerService.cleartoken();
        this.router.navigateByUrl('/admin/login');
        }
    return true;
  }

}
