import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from '../../shared/login/login.component';
import { ManagePassengersComponent } from './components/manage-passengers/manage-passengers.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { LayoutModule } from '@angular/cdk/layout';
import { PassengersService } from '../../services/passengers.service';
import { SuccessfulComponent } from '../../shared/dialogs/successful/successful.component';
import { ManageServicesComponent } from './components/manage-services/manage-services.component';
import { ManageMealsComponent } from './components/manage-meals/manage-meals.component';
import { ManagePurchasesComponent } from './components/manage-purchases/manage-purchases.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    LoginComponent,
    ManagePassengersComponent,
    ManageServicesComponent,
    AdminDashboardComponent,
    ManageMealsComponent,
    ManagePurchasesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    LayoutModule
  ],
  providers: [
    ],
  entryComponents: [SuccessfulComponent]
})
export class AdminModule { }
