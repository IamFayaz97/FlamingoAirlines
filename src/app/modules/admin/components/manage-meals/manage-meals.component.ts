import { Component, OnInit } from '@angular/core';
import { Meals } from 'src/app/models/meals.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PassengersService } from '../../../../services/passengers.service';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { SuccessfulComponent } from 'src/app/shared/dialogs/successful/successful.component';
import { SureComponent } from 'src/app/shared/dialogs/sure/sure.component';

@Component({
  selector: 'app-manage-meals',
  templateUrl: './manage-meals.component.html',
  styleUrls: ['./manage-meals.component.css']
})
export class ManageMealsComponent implements OnInit {

  constructor( private httpService: HttpClient,
               private passengerService: PassengersService,
               public dialog: MatDialog
     ) {
      this.passengerService.getMeals().subscribe(
        data => {
          this.meals = data as Meals[];
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        }
      );
  }
  get mealNewCost(){
    return this.mealEditForm.get('mealNewCost');
  }
  get mealNewName(){
    return this.mealForm.get('mealName');
  }
  get mealNewDesc(){
    return this.mealForm.get('mealDesc');
  }
  get mealName(){
    return this.mealForm.get('mealName');
  }
  get mealId(){
    return this.mealForm.get('mealId');
  }
  get mealCost(){
    return this.mealForm.get('mealCost');
  }
  get mealDesc(){
    return this.mealForm.get('mealDesc');
  }
  get mealURL(){
    return this.mealForm.get('mealURL');
  }
  get mealNewURL(){
    return this.mealEditForm.get('mealNewURL');
  }

  meals: Meals[];
  status: boolean;
  showMeals = false;
  dontShowMeals = false;
  updateMeal = {};
  mealForm: FormGroup;
  mealEditForm: FormGroup;
  temp1: number;
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
        name: 'addMeal',
        title: ' Successful',
        description: 'Meal added successfully',
        actionBtnText: 'Okay',
      };
      const modalDialog =
        this.dialog.open(SuccessfulComponent, dialogConfig)
        .afterClosed().subscribe( response => {
          if (response.data) {
            this.showAllMeals();
          }
        });
    }
    else if (situation === 'update'){
      dialogConfig.disableClose = true;
      dialogConfig.width = '350px';
      dialogConfig.id = 'successful-component';
      dialogConfig.data = {
        name: 'updateMeal',
        title: ' Successful',
        description: 'Meal Updated successfully',
        actionBtnText: 'Okay',
      };
      const modalDialog =
        this.dialog.open(SuccessfulComponent, dialogConfig)
        .afterClosed().subscribe( response => {
          if (response.data) {
            this.showAllMeals();
          }
        });
    }
    else if (situation === 'delete'){
      dialogConfig.disableClose = true;
      dialogConfig.width = '350px';
      dialogConfig.id = 'sure-component';
      dialogConfig.data = {
        name: 'deleteMeal',
        title: 'Confirmation',
        description: 'Are you sure to delete?',
        actionBtnText1: 'Delete',
        actionBtnText2: 'Cancel'
      };
      const modalDialog =
        this.dialog.open(SureComponent, dialogConfig)
        .afterClosed().subscribe( response => {
          if (response.data) {
            this.deleteMeal(this.temp1);
          }
          else {
            this.showAllMeals();
          }
        });
    }
  }

  private initForm(){
    this.mealForm = new FormGroup({
      mealName: new FormControl(null, Validators.required),
      mealId: new FormControl(null, Validators.required),
      mealCost: new FormControl(null, Validators.required),
      mealDesc: new FormControl(null, Validators.required),
      mealURL: new FormControl(null)
    });
    this.mealEditForm = new FormGroup({
      mealNewName: new FormControl(null, Validators.required),
      mealNewCost: new FormControl(null, Validators.required),
      mealNewDesc: new FormControl(null, Validators.required),
      mealNewURL: new FormControl(null)
    });
  }
  resetAll(){
    this.mealForm.reset({
      mealName: '',
      mealId: '',
      mealCost: '',
      mealDesc: '',
      mealURL: ''
    });
    this.mealEditForm.reset({
      mealNewName: '',
      mealNewCost: '',
      mealNewDesc: '',
      mealNewURL: ''
    });
  }
  showAllMeals(){
    this.showMeals = true;
    this.dontShowMeals = false;
    this.updateMeal = {};
    const element: HTMLElement = document.getElementById('showAllMeals') as HTMLElement;
    element.click();
  }
  dontShowAllMeals(){
    this.showMeals = false;
    this.dontShowMeals = true;
    this.updateMeal = {};
  }
  addNewMeal(){
    this.meals.push(this.mealForm.value);
    this.openDialog('add');
    this.resetAll();
  }
  editMeal(meal: Meals, i: number){
    this.updateMeal[i] = true;
    this.mealEditForm.setValue({
      mealNewName: meal.mealName,
      mealNewCost: meal.mealCost,
      mealNewDesc: meal.mealDesc,
      mealNewURL: meal.mealURL
    });
  }
  updateMeals(mealId: number){
    this.meals.map( meal => {
        if (meal.mealId === mealId){
          meal.mealName = this.mealEditForm.get('mealNewName').value;
          meal.mealCost = this.mealEditForm.get('mealNewCost').value;
          meal.mealDesc = this.mealEditForm.get('mealNewDesc').value;
          meal.mealURL = this.mealEditForm.get('mealNewURL').value;
        }
      });
    this.openDialog('update');
    this.resetAll();
    this.showAllMeals();
  }
  deleteMeal(mealId: number){
    this.meals.map( meal => {
      if (meal.mealId === mealId){
          this.meals = this.meals.filter( item => item !== meal);
      }
    });
  }
  deleteDialog(mealId: number){
    this.openDialog('delete');
    this.temp1 = mealId;
  }

}

