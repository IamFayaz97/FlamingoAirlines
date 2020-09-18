import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { StaffRoutingModule } from './staff-routing.module';
import { CheckinComponent } from './components/checkin/checkin.component';
import { InflightComponent } from './components/inflight/inflight.component';

@NgModule({
  declarations: [CheckinComponent, InflightComponent],

  imports: [
    CommonModule,
    StaffRoutingModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatCardModule, MatButtonModule, MatDialogModule, MatIconModule, MatFormFieldModule, MatSelectModule
  ]
})
export class StaffModule { }
