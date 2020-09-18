import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PassengersService } from 'src/app/services/passengers.service';
import { SocialAuthService } from 'angularx-social-login';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const matDialogStub = () => ({
      open: (displayFlightsComponent, dialogConfig) => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      })
    });
    const passengersServiceStub = () => ({
      gettoken: () => ({}),
      loggedIn: {}
    });
    const socialAuthServiceStub = () => ({
      authState: { subscribe: f => f({}) },
      signOut: () => ({})
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: PassengersService, useFactory: passengersServiceStub },
        { provide: SocialAuthService, useFactory: socialAuthServiceStub }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it(`flightSelected has default value`, () => {
    expect(component.flightSelected).toEqual(false);
  });
  it(`someErrors has default value`, () => {
    expect(component.someErrors).toEqual(false);
  });
  it(`showLogOutMessage has default value`, () => {
    expect(component.showLogOutMessage).toEqual(false);
  });
  describe('checkIfLoginExists', () => {
    it('makes expected calls', () => {
      const passengersServiceStub: PassengersService = fixture.debugElement.injector.get(
        PassengersService
      );
      spyOn(passengersServiceStub, 'gettoken').and.callThrough();
      component.checkIfLoginExists();
      expect(passengersServiceStub.gettoken).toHaveBeenCalled();
    });
  });
  describe('checkLogin', () => {
    it('makes expected calls', () => {
      spyOn(component, 'checkIfLoginExists').and.callThrough();
      spyOn(component, 'showFlights').and.callThrough();
      spyOn(component, 'resetAll').and.callThrough();
      component.checkLogin();
      expect(component.checkIfLoginExists).toHaveBeenCalled();
    });
  });
  describe('signInWithGoogle', () => {
    it('makes expected calls', () => {
      const socialAuthServiceStub: SocialAuthService = fixture.debugElement.injector.get(
        SocialAuthService
      );
      spyOn(component, 'checkIfLoginExists').and.callThrough();
      spyOn(component, 'showFlights').and.callThrough();
      component.signInWithGoogle();
      expect(component.checkIfLoginExists).toHaveBeenCalled();
    });
  });
  describe('signOut', () => {
    it('makes expected calls', () => {
      const socialAuthServiceStub: SocialAuthService = fixture.debugElement.injector.get(
        SocialAuthService
      );
      spyOn(socialAuthServiceStub, 'signOut').and.callThrough();
      component.signOut();
      expect(socialAuthServiceStub.signOut).toHaveBeenCalled();
    });
  });
});
