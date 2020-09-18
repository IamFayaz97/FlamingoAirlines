import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes:
Routes =
[
  /*{
    path:  "", pathMatch:  "full", redirectTo:  "home"
  }, */
  {
    path: '', pathMatch: 'full', component: HomeComponent
  },
  { path: 'staff',
    loadChildren: () =>  import('./modules/staff/staff.module').then(m => m.StaffModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
