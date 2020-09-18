import { Component, OnInit } from '@angular/core';
import { PassengersService } from 'src/app/services/passengers.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { SureComponent } from 'src/app/shared/dialogs/sure/sure.component';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [SocialAuthService],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn = false;
  constructor(public passengerService: PassengersService,
              private router: Router,
              public dialog: MatDialog,
              public authService: SocialAuthService) {
      // this.loggedIn= localStorage.getItem("SessionUser");
     }
  ngOnInit(): void {}
  login(){
    this.dialog.closeAll();
    this.router.navigate(['/admin/login']);
  }
  logOut(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '350px';
    dialogConfig.id = 'sure-component';
    dialogConfig.data = {
        name: 'deleteService',
        title: 'Confirmation',
        description: 'Are you sure to logout?',
        actionBtnText1: 'Logout',
        actionBtnText2: 'Cancel'
      };
    const modalDialog =
        this.dialog.open(SureComponent, dialogConfig)
        .afterClosed().subscribe( response => {
          if (response.data){
            // this.authService.signOut().then().catch();
            this.passengerService.loggedIn = false;
            this.passengerService.cleartoken();
            this.router.navigate(['/']);
          }
          else {
            console.log(response.data);
          }
        });
  }
  check(type: string){
    switch (type) {
      case 'Admin':
        if (this.passengerService.getRole() === 'admin') {
          return true;
        }
        break;
      case 'Inflight':
        if (this.passengerService.getRole() === 'staff-inflight') {
          return true;
        }
        break;
      case 'Check-In':
        if (this.passengerService.getRole() === 'staff-checkin') {
          return true;
        }
        break;
    }
  }

}
