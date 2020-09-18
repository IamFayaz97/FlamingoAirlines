import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { DisplayFlightsComponent } from 'src/app/shared/dialogs/display-flights/display-flights.component';
import { PassengersService } from 'src/app/services/passengers.service';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: SocialUser;
  googleUser: boolean;
  loggedIn: boolean;
  typeOfUser: string;
  loginForm: FormGroup;
  flightSelected = false;
  someErrors = false;
  googleUserSelection: any;
  showLogOutMessage = false;
  constructor(
      private router: Router,
      public dialog: MatDialog,
      public passengerService: PassengersService,
      public authService: SocialAuthService
  ) {}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      userType: new FormControl(null)
    });
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
  get userName(){
    return this.loginForm.get('userName');
  }
  get password(){
    return this.loginForm.get('password');
  }
  get userType(){
    return this.loginForm.get('userType');
  }
  checkIfLoginExists(): boolean{
    if (this.passengerService.gettoken()){
      this.showLogOutMessage = true;
      return true;
    }
    else {
      return false;
    }
  }
  checkLogin(){
    if (this.checkIfLoginExists()){
      return ;
    }
    if (this.userName.value === 'admin' && this.password.value === 'admin'){
      this.showFlights('admin');
    }
    else if (this.userName.value === 'staff' && this.password.value === 'staff'){
      if (this.userType.value === 'checkin') {
        this.showFlights('staff-checkin');
      }
      else if (this.userType.value === 'inflight') {
        this.showFlights('staff-inflight');
 }
    }
    else{
      this.someErrors = true;
      setTimeout(
        () => this.someErrors = false, 3000
      );
      this.resetAll();
    }
  }
  navigate(kindOfUser: string){
    switch (kindOfUser) {
      case 'admin':
        localStorage.setItem('SessionUser', 'admin');
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'checkin':
        localStorage.setItem('SessionUser', 'staff-checkin');
        this.router.navigate(['/staff/checkin']);
        break;
      case 'inflight':
        localStorage.setItem('SessionUser', 'staff-inflight');
        this.router.navigate(['/staff/inflight']);
        break;
    }
    this.passengerService.loggedIn = true;

  }
  resetAll(){
    this.loginForm.reset();
    this.showLogOutMessage = false;
  }
  showFlights(userType: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '100vw';
    dialogConfig.id = 'displayflights-component';
    dialogConfig.autoFocus = false;
    dialogConfig.maxHeight = '90vh';
    dialogConfig.data = {
        user : userType
      };
    const dialogRef = this.dialog.open(DisplayFlightsComponent, dialogConfig).afterClosed().subscribe(
        response => {
          if (response.data === 'admin') {
            this.navigate('admin');
          }
          else if (response.data === 'staff-checkin') {
            this.navigate('checkin');
 }
          else if (response.data === 'staff-inflight') {
            this.navigate('inflight');
 }
        }
      );
  }
  signInWithGoogle(): void {
    if (this.checkIfLoginExists()) {
      return ;
    }
    if (this.googleUserSelection != null){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe(user => {
      if (user){
          if (this.googleUserSelection === 'checkin'){
            this.showFlights('staff-checkin');
        }
        else if (this.googleUserSelection === 'inflight'){
            this.showFlights('staff-inflight');
        }
          this.passengerService.loggedIn = true;
      }
    });
    }
  }
  signOut(): void {
    this.authService.signOut();
  }

}
