import { Component, OnInit } from '@angular/core';
import { AncilliaryServices } from 'src/app/models/ancilliaryservices.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PassengersService } from '../../../../services/passengers.service';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { SuccessfulComponent } from 'src/app/shared/dialogs/successful/successful.component';
import { SureComponent } from 'src/app/shared/dialogs/sure/sure.component';

@Component({
  selector: 'app-manage-services',
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.css']
})
export class ManageServicesComponent implements OnInit {
  ancServices: AncilliaryServices[];
  status: boolean;
  showServices = false;
  dontShowServices = false;
  updateServices = {};
  serviceForm: FormGroup;
  serviceEditForm: FormGroup;
  temp1: number;

  constructor( private httpService: HttpClient,
               private passengerService: PassengersService,
               public dialog: MatDialog
     ) {
      this.passengerService.getAncilliaryServices().subscribe(
        data => {
          this.ancServices = data as AncilliaryServices[];
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
  deleteDialog(serviceId: number){
    this.openDialog('delete');
    this.temp1 = serviceId;
  }
  openDialog(situation: string): void {
    const dialogConfig = new MatDialogConfig();
    if (situation === 'add'){
      dialogConfig.disableClose = true;
      dialogConfig.width = '350px';
      dialogConfig.id = 'successful-component';
      dialogConfig.data = {
        name: 'addService',
        title: ' Successful',
        description: 'Service added successfully',
        actionBtnText: 'Okay',
      };
      const modalDialog =
        this.dialog.open(SuccessfulComponent, dialogConfig)
        .afterClosed().subscribe( response => {
          if (response.data) {
            this.showAllServices();
          }
        });
    }
    else if (situation === 'update'){
      dialogConfig.disableClose = true;
      dialogConfig.width = '350px';
      dialogConfig.id = 'successful-component';
      dialogConfig.data = {
        name: 'updateService',
        title: ' Successful',
        description: 'Service Updated successfully',
        actionBtnText: 'Okay',
      };
      const modalDialog =
        this.dialog.open(SuccessfulComponent, dialogConfig)
        .afterClosed().subscribe( response => {
          if (response.data) {
            this.showAllServices();
          }
        });
    }
    else if (situation === 'delete'){
      dialogConfig.disableClose = true;
      dialogConfig.width = '350px';
      dialogConfig.id = 'sure-component';
      dialogConfig.data = {
        name: 'deleteService',
        title: 'Confirmation',
        description: 'Are you sure to delete?',
        actionBtnText1: 'Delete',
        actionBtnText2: 'Cancel'
      };
      const modalDialog =
        this.dialog.open(SureComponent, dialogConfig)
        .afterClosed().subscribe( response => {
          if (response.data) {
            this.deleteService(this.temp1);
          }
          else {
            this.showAllServices();
          }
        });
    }
  }

  private initForm(){
    this.serviceForm = new FormGroup({
      serviceId: new FormControl(null, Validators.required),
      serviceName: new FormControl(null, Validators.required),
      serviceCost: new FormControl(null, Validators.required),
      serviceDesc: new FormControl(null, Validators.required)
    });
    this.serviceEditForm = new FormGroup({
      serviceNewName: new FormControl(null, Validators.required),
      serviceNewCost: new FormControl(null, Validators.required),
      serviceNewDesc: new FormControl(null, Validators.required)
    });
  }
  get serviceId(){
    return this.serviceEditForm.get('serviceId');
  }
  get serviceNewCost(){
    return this.serviceEditForm.get('serviceNewCost');
  }
  get serviceNewName(){
    return this.serviceForm.get('serviceName');
  }
  get serviceNewDesc(){
    return this.serviceForm.get('serviceDesc');
  }
  get serviceName(){
    return this.serviceForm.get('serviceName');
  }
  get serviceCost(){
    return this.serviceForm.get('serviceCost');
  }
  get serviceDesc(){
    return this.serviceForm.get('serviceDesc');
  }
  resetAll(){
    this.serviceForm.reset({
      serviceId: '',
      serviceName: '',
      serviceCost: '',
      serviceDesc: ''
    });
    this.serviceEditForm.reset({
      serviceNewName: '',
      serviceNewCost: '',
      serviceNewDesc: ''
    });
  }
  showAllServices(){
    this.showServices = true;
    this.dontShowServices = false;
    this.updateServices = {};
    const element: HTMLElement = document.getElementById('showAllServices') as HTMLElement;
    element.click();
  }
  dontShowAllServices(){
    this.showServices = false;
    this.dontShowServices = true;
    this.updateServices = {};
  }
  addNewService(){
    this.ancServices.push(this.serviceForm.value);
    this.openDialog('add');
    this.resetAll();
  }
  editService(ancService: AncilliaryServices, i: number){
    this.updateServices[i] = true;
    this.serviceEditForm.setValue({
      serviceNewName: ancService.serviceName,
      serviceNewCost: ancService.serviceCost,
      serviceNewDesc: ancService.serviceDesc
    });
  }
  updateService(serviceId: number){
    this.ancServices.map( service => {
        if (service.serviceId === serviceId){
          service.serviceName = this.serviceEditForm.get('serviceNewName').value;
          service.serviceCost = this.serviceEditForm.get('serviceNewCost').value;
          service.serviceDesc = this.serviceEditForm.get('serviceNewDesc').value;
        }
      });
    this.openDialog('update');
    this.resetAll();
    this.showAllServices();
  }
  deleteService(serviceId: number){
    this.ancServices.map( service => {
      if (service.serviceId === serviceId){
          this.ancServices = this.ancServices.filter( item => item !== service);
      }
    });
  }

}

