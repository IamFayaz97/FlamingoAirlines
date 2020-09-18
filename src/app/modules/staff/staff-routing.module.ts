import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckinComponent } from './components/checkin/checkin.component';
import { InflightComponent } from './components/inflight/inflight.component';
import { LoginComponent } from '../../shared/login/login.component';
import { AuthenticationGuard } from 'src/app/security/authentication.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthenticationGuard] },
  { path:  'checkin', component:  CheckinComponent, canActivate: [AuthenticationGuard] },
  { path: 'inflight', component: InflightComponent, canActivate: [AuthenticationGuard] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
