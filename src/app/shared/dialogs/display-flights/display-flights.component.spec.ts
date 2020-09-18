import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFlightsComponent } from './display-flights.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { Inject, Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

describe('DisplayFlightsComponent', () => {
  let component: DisplayFlightsComponent;
  let fixture: ComponentFixture<DisplayFlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({ }),
        SocialLoginModule
      ],
      providers: [
        StoreModule,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      declarations: [DisplayFlightsComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
 });
});
