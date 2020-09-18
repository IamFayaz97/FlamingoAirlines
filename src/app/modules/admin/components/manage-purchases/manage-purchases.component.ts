import { Component, OnInit } from '@angular/core';
import { InflightPurchase } from 'src/app/models/inflightpurchase.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PassengersService } from '../../../../services/passengers.service';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { SuccessfulComponent } from 'src/app/shared/dialogs/successful/successful.component';
import { SureComponent } from 'src/app/shared/dialogs/sure/sure.component';

@Component({
  selector: 'app-manage-purchases',
  templateUrl: './manage-purchases.component.html',
  styleUrls: ['./manage-purchases.component.css']
})
export class ManagePurchasesComponent implements OnInit {

  purchases: InflightPurchase[];
  status: boolean;
  showPurchases = false;
  dontShowPurchases = false;
  updatePurchases = {};
  purchaseForm: FormGroup;
  purchaseEditForm: FormGroup;
  temp1: number;

  constructor( private httpService: HttpClient,
               private passengerService: PassengersService,
               public dialog: MatDialog
     ) {
      this.passengerService.getPurchases().subscribe(
        data => {
          this.purchases = data as InflightPurchase[];
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        }
      );
  }
  closeDialog(){
    this.dialog.closeAll();
  }
  ngOnInit() {
    this.initForm();
  }
  deleteDialog(purchaseId: number){
    this.openDialog('delete');
    this.temp1 = purchaseId;
  }
  openDialog(situation: string): void {
    const dialogConfig = new MatDialogConfig();
    if (situation === 'add'){
      dialogConfig.disableClose = true;
      dialogConfig.width = '350px';
      dialogConfig.id = 'successful-component';
      dialogConfig.data = {
        name: 'addPurchase',
        title: ' Successful',
        description: 'Purchase added successfully',
        actionBtnText: 'Okay',
      };
      const modalDialog =
        this.dialog.open(SuccessfulComponent, dialogConfig)
        .afterClosed().subscribe( response => {
          if (response.data) {
            this.showAllPurchases();
          }
        });
    }
    else if (situation === 'update'){
      dialogConfig.disableClose = true;
      dialogConfig.width = '350px';
      dialogConfig.id = 'successful-component';
      dialogConfig.data = {
        name: 'updatePurchase',
        title: ' Successful',
        description: 'Purchase Updated successfully',
        actionBtnText: 'Okay',
      };
      const modalDialog =
        this.dialog.open(SuccessfulComponent, dialogConfig)
        .afterClosed().subscribe( response => {
          if (response.data) {
            this.showAllPurchases();
          }
        });
    }
    else if (situation === 'delete'){
      dialogConfig.disableClose = true;
      dialogConfig.width = '350px';
      dialogConfig.id = 'sure-component';
      dialogConfig.data = {
        name: 'deletePurchase',
        title: 'Confirmation',
        description: 'Are you sure to delete?',
        actionBtnText1: 'Delete',
        actionBtnText2: 'Cancel'
      };
      const modalDialog =
        this.dialog.open(SureComponent, dialogConfig)
        .afterClosed().subscribe( response => {
          if (response.data) {
            this.deletePurchase(this.temp1);
          }
          else {
            this.showAllPurchases();
          }
        });
    }
  }

  private initForm(){
    this.purchaseForm = new FormGroup({
      purchaseId: new FormControl(null, Validators.required),
      purchaseTitle: new FormControl(null, Validators.required),
      purchaseCost: new FormControl(null, Validators.required),
      purchaseDesc: new FormControl(null, Validators.required),
      purchaseURL : new FormControl()
    });
    this.purchaseEditForm = new FormGroup({
      purchaseNewName: new FormControl(null, Validators.required),
      purchaseNewCost: new FormControl(null, Validators.required),
      purchaseNewDesc: new FormControl(null, Validators.required),
      purchaseNewURL: new FormControl()
    });
  }
  get purchaseId(){
    return this.purchaseEditForm.get('purchaseId');
  }
  get purchaseNewCost(){
    return this.purchaseEditForm.get('purchaseNewCost');
  }
  get purchaseNewName(){
    return this.purchaseForm.get('purchaseTitle');
  }
  get purchaseNewDesc(){
    return this.purchaseForm.get('purchaseDesc');
  }
  get purchaseTitle(){
    return this.purchaseForm.get('purchaseTitle');
  }
  get purchaseCost(){
    return this.purchaseForm.get('purchaseCost');
  }
  get purchaseDesc(){
    return this.purchaseForm.get('purchaseDesc');
  }
  get purchaseURL(){
    return this.purchaseForm.get('purchaseURL');
  }
  get purchaseNewURL(){
    return this.purchaseEditForm.get('purchaseNewURL');
  }
  resetAll(){
    this.purchaseForm.reset({
      purchaseId: '',
      purchaseTitle: '',
      purchaseCost: '',
      purchaseDesc: '',
      purchaseURL: ''
    });
    this.purchaseEditForm.reset({
      purchaseNewName: '',
      purchaseNewCost: '',
      purchaseNewDesc: '',
      purchaseNewURL: ''
    });
  }
  showAllPurchases(){
    this.showPurchases = true;
    this.dontShowPurchases = false;
    this.updatePurchases = {};
    const element: HTMLElement = document.getElementById('showAllPurchases') as HTMLElement;
    element.click();
  }
  dontShowAllPurchases(){
    this.showPurchases = false;
    this.dontShowPurchases = true;
    this.updatePurchases = {};
  }
  addNewPurchase(){
    this.purchases.push(this.purchaseForm.value);
    this.openDialog('add');
    this.resetAll();
  }
  editPurchase(Purchase: InflightPurchase, i: number){
    this.updatePurchases[i] = true;
    this.purchaseEditForm.setValue({
      purchaseNewName: Purchase.purchaseTitle,
      purchaseNewCost: Purchase.purchaseCost,
      purchaseNewDesc: Purchase.purchaseDesc,
      purchaseNewURL: Purchase.purchaseURL
    });
  }
  updatePurchase(purchaseId: number){
    this.purchases.map( purchase => {
        if (purchase.purchaseId === purchaseId){
          purchase.purchaseTitle = this.purchaseEditForm.get('purchaseNewName').value;
          purchase.purchaseCost = this.purchaseEditForm.get('purchaseNewCost').value;
          purchase.purchaseDesc = this.purchaseEditForm.get('purchaseNewDesc').value;
          purchase.purchaseURL = this.purchaseEditForm.get('purchaseNewURL').value;
        }
      });
    this.openDialog('update');
    this.resetAll();
    this.showAllPurchases();
  }
  deletePurchase(purchaseId: number){
    this.purchases.map( purchase => {
      if (purchase.purchaseId === purchaseId){
          this.purchases = this.purchases.filter( item => item !== purchase);
      }
    });
  }

}


