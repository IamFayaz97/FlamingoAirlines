import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PassengersService } from 'src/app/services/passengers.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SocialAuthService, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  beforeEach(() => {
    const passengersServiceStub = () => ({
      loggedIn: {},
      cleartoken: () => ({}),
      getRole: () => ({})
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const matDialogStub = () => ({
      closeAll: () => ({}),
      open: (sureComponent, dialogConfig) => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      })
    });
    const socialAuthServiceStub = () => ({});
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HeaderComponent],
      providers: [
        { provide: PassengersService, useFactory: passengersServiceStub },
        { provide: Router, useFactory: routerStub },
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: SocialAuthService, useFactory: socialAuthServiceStub },
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(
                  '698459103665-jqpr37lpub1sgis344isia4ki8l72dg6.apps.googleusercontent.com'
                ),
              }
            ],
          } as SocialAuthServiceConfig,
        }
      ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it(`loggedIn has default value`, () => {
    expect(component.loggedIn).toEqual(false);
  });
  describe('login', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(matDialogStub, 'closeAll').and.callThrough();
      component.login();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(matDialogStub.closeAll).toHaveBeenCalled();
    });
  });
  describe('logOut', () => {
    it('makes expected calls', () => {
      const passengersServiceStub: PassengersService = fixture.debugElement.injector.get(
        PassengersService
      );
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      spyOn(passengersServiceStub, 'cleartoken').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(matDialogStub, 'open').and.callThrough();
      component.logOut();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });
});
