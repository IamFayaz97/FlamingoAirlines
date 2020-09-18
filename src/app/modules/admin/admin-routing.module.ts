import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../../shared/login/login.component';
import { ManagePassengersComponent } from './components/manage-passengers/manage-passengers.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageServicesComponent } from './components/manage-services/manage-services.component';
import { ManageMealsComponent } from './components/manage-meals/manage-meals.component';
import { ManagePurchasesComponent } from './components/manage-purchases/manage-purchases.component';
import { RoleGuard } from '../../security/role.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: AdminDashboardComponent, canActivate: [RoleGuard] },
  { path: 'managePassengers', component: ManagePassengersComponent, canActivate: [RoleGuard] },
  { path: 'managePurchases', component: ManagePurchasesComponent, canActivate: [RoleGuard] },
  { path: 'manageServices', component: ManageServicesComponent, canActivate: [RoleGuard] },
  { path: 'manageMeals', component: ManageMealsComponent, canActivate: [RoleGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
