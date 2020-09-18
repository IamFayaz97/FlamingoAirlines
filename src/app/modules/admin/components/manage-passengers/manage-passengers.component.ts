import { Component, OnInit } from '@angular/core';
import { Passenger } from 'src/app/models/passenger.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PassengersService } from '../../../../services/passengers.service';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { SuccessfulComponent } from 'src/app/shared/dialogs/successful/successful.component';
import { SureComponent } from 'src/app/shared/dialogs/sure/sure.component';
import { Meals } from 'src/app/models/meals.model';
import { AncilliaryServices } from 'src/app/models/ancilliaryservices.model';

@Component({
  selector: 'app-manage-passengers',
  templateUrl: './manage-passengers.component.html',
  styleUrls: ['./manage-passengers.component.css']
})
export class ManagePassengersComponent implements OnInit {

  passengers: Passenger[];
  meals: Meals[];
  services: AncilliaryServices[];
  status: boolean;
  showPassengers = false;
  dontShowPassengers = false;
  updatePassengers = {};
  passengerForm: FormGroup;
  passengerEditForm: FormGroup;
  showFilters = false;
  temp1: string;
  myDate = new Date();
  unfilteredPassengers: Passenger[];
  constructor( private passengerService: PassengersService,
               public dialog: MatDialog
     ) {
      this.passengerService.getPassengers().subscribe(
        data => {
          this.passengers = data as Passenger[];
          this.unfilteredPassengers = this.passengers;
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        });
      this.passengerService.getMeals().subscribe(
        data => {
          this.meals = data as Meals[];
        });
      this.passengerService.getAncilliaryServices().subscribe(
        data => {
          this.services = data as AncilliaryServices[];
        });
  }
  closeDialog(){
    this.dialog.closeAll();
  }
  ngOnInit() {
    this.initForm();
  }
  openDialog(situation: string): void {
    const dialogConfig = new MatDialogConfig();
    if (situation === 'add'){
      dialogConfig.disableClose = true;
      dialogConfig.width = '350px';
      dialogConfig.id = 'successful-component';
      dialogConfig.data = {
        name: 'addPassenger',
        title: ' Successful',
        description: 'Passenger added successfully',
        actionBtnText: 'Okay',
      };
      const modalDialog =
        this.dialog.open(SuccessfulComponent, dialogConfig)
        .afterClosed().subscribe( response => {
          if (response.data) {
            this.showAllPassengers();
          }
        });
    }
    else if (situation === 'update'){
      dialogConfig.disableClose = true;
      dialogConfig.width = '350px';
      dialogConfig.id = 'successful-component';
      dialogConfig.data = {
        name: 'updatePassenger',
        title: ' Successful',
        description: 'Passenger Updated successfully',
        actionBtnText: 'Okay',
      };
      const modalDialog =
        this.dialog.open(SuccessfulComponent, dialogConfig)
        .afterClosed().subscribe( response => {
          if (response.data) {
            this.showAllPassengers();
          }
        });
    }
    else if (situation === 'delete'){
      dialogConfig.disableClose = true;
      dialogConfig.width = '350px';
      dialogConfig.id = 'sure-component';
      dialogConfig.data = {
        name: 'deletePassenger',
        title: 'Confirmation',
        description: 'Are you sure to delete?',
        actionBtnText1: 'Delete',
        actionBtnText2: 'Cancel'
      };
      const modalDialog =
        this.dialog.open(SureComponent, dialogConfig)
        .afterClosed().subscribe( response => {
          if (response.data) {
            this.deletePassenger(this.temp1);
          }
          else {
            this.showAllPassengers();
          }
        });
    }
  }

  private initForm(){
    this.passengerForm = new FormGroup({
      passengerName: new FormControl(null, Validators.required),
      passportNo: new FormControl(null),
      passengerdob: new FormControl(null),
      passengerAddress: new FormControl(null),
      hasInfant: new FormControl(false),
      needWheelChair: new FormControl(false),
      passengerMeals: new FormControl([]),
      passengerServices: new FormControl([])
    });
    this.passengerEditForm = new FormGroup({
      passportNewNo: new FormControl(null),
      passengerNewdob: new FormControl(null),
      passengerNewAddress: new FormControl(null),
      hasInfantNew: new FormControl(false),
      needWheelChairNew: new FormControl(false),
      passengerNewMeals: new FormControl([]),
      passengerNewServices: new FormControl([])
    });
  }
  get passengerServices(){
    return this.passengerForm.get('passengerServices');
  }
  get passengerNewServices(){
    return this.passengerEditForm.get('passengerNewServices');
  }
  get passengerMeals(){
    return this.passengerForm.get('passengerMeals');
  }
  get passengerNewMeals(){
    return this.passengerEditForm.get('passengerNewMeals');
  }
  get hasInfant(){
    return this.passengerForm.get('hasInfant');
  }
  get hasInfantNew(){
    return this.passengerEditForm.get('hasInfantNew');
  }
  get needWheelChair(){
    return this.passengerForm.get('needWheelChair');
  }
  get needWheelChairNew(){
    return this.passengerEditForm.get('needWheelChairNew');
  }
  get passengerNewdob(){
    return this.passengerEditForm.get('passengerNewdob');
  }
  get passportNewNo(){
    return this.passengerEditForm.get('passportNewNo');
  }
  get passengerNewAddress(){
    return this.passengerEditForm.get('passengerAddress');
  }
  get passengerName(){
    return this.passengerForm.get('passengerName');
  }
  get passportNo(){
    return this.passengerForm.get('passportNo');
  }
  get passengerdob(){
    return this.passengerForm.get('passengerdob');
  }
  get passengerAddress(){
    return this.passengerForm.get('passengerAddress');
  }
  resetAll(){
    this.passengerForm.reset({
      passengerName: '',
      passportNo: '',
      passengerdob: '',
      passengerAddress: '',
      hasInfant: null,
      needWheelChair: null,
      passengerMeals: [],
      passengerServices: []
    });
    this.passengerEditForm.reset({
      passportNewNo: '',
      passengerNewdob: '',
      passengerNewAddress: '',
      hasInfantNew: null,
      needWheelChairNew: null,
      passengerNewMeals: [],
      passengerNewServices: []
    });
  }
  showAllPassengers(){
    this.showPassengers = true;
    this.dontShowPassengers = false;
    this.updatePassengers = {};
    const element: HTMLElement = document.getElementById('showAllPassengers') as HTMLElement;
    element.click();
  }
  dontShowAllPassengers(){
    this.showPassengers = false;
    this.dontShowPassengers = true;
    this.updatePassengers = {};
  }
  addNewPassenger(){
    this.passengers.push(this.passengerForm.value);
    this.openDialog('add');
    this.resetAll();
  }
  editPassenger(passenger: Passenger, i: number){
    this.updatePassengers[i] = true;

    if (passenger.passportNo == null) {
      passenger.passportNo = null;
    }
    if (passenger.passengerAddress == null) {
      passenger.passengerAddress = null;
    }
    if (passenger.passengerdob == null) {
      passenger.passengerdob = null;
    }
    if (passenger.hasInfant == null) {
      passenger.hasInfant = false;
    }
    if (passenger.needWheelChair == null) {
      passenger.needWheelChair = false;
    }
    if (passenger.passengerMeals == null) {
      passenger.passengerMeals = [];
    }
    if (passenger.passengerServices == null) {
      passenger.passengerServices = [];
    }
    this.passengerEditForm.setValue({
      passportNewNo: passenger.passportNo,
      passengerNewdob: passenger.passengerdob,
      passengerNewAddress: passenger.passengerAddress,
      hasInfantNew: passenger.hasInfant,
      needWheelChairNew: passenger.needWheelChair,
      passengerNewMeals: passenger.passengerMeals,
      passengerNewServices: passenger.passengerServices
    });
  }
  updatePassenger(passengerName: string){
    this.passengers.map( passenger => {
        if (passenger.passengerName === passengerName){
          passenger.passportNo = this.passengerEditForm.get('passportNewNo').value;
          passenger.passengerdob = this.passengerEditForm.get('passengerNewdob').value;
          passenger.passengerAddress = this.passengerEditForm.get('passengerNewAddress').value;
          passenger.hasInfant = this.passengerEditForm.get('hasInfantNew').value;
          passenger.needWheelChair = this.passengerEditForm.get('needWheelChairNew').value;
          passenger.passengerMeals = this.passengerEditForm.get('passengerNewMeals').value;
          passenger.passengerServices = this.passengerEditForm.get('passengerNewServices').value;
        }
      });
    this.openDialog('update');
    this.resetAll();
    this.showAllPassengers();
  }
  deletePassenger(passengerName: string){
    this.passengers.map( passenger => {
      if (passenger.passengerName === passengerName){
          this.passengers = this.passengers.filter( item => item !== passenger);
      }
    });
    this.unfilteredPassengers.map( passenger => {
      if (passenger.passengerName === passengerName){
          this.unfilteredPassengers = this.unfilteredPassengers.filter( item => item !== passenger);
      }
    });
  }
  deleteDialog(passengerName: string){
    this.openDialog('delete');
    this.temp1 = passengerName;
  }
 filter(type: string){
  if (this.passengers == null) {
      return ;
  }
  this.passengers = this.unfilteredPassengers;
  switch (type) {
    case 'passport':
      this.passengers = this.passengers.filter(data => {
        return (data.passportNo == null);
      });
      break;
    case 'date':
      this.passengers = this.passengers.filter(data => {
        return (data.passengerdob == null);
      });
      break;
    case 'address':
      this.passengers = this.passengers.filter(data => {
        return (data.passengerAddress == null);
      });
      break;
    case 'cancel':
      this.passengers = this.unfilteredPassengers;
      this.showFilters = false;
  }
 }

}
