import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { PassengersService } from './services/passengers.service';
import { SuccessfulComponent } from './shared/dialogs/successful/successful.component';
import { SureComponent } from './shared/dialogs/sure/sure.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { DisplayFlightsComponent } from './shared/dialogs/display-flights/display-flights.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SocialAuthService, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PassengerReducer } from './store/reducers/passengerReducer';
import { FlightReducer } from './store/reducers/flightReducer';
import { FlightEffect } from './store/effects/flightEffect';
import { PassengerEffect } from './store/effects/passengerEffect';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SuccessfulComponent,
    SureComponent,
    DisplayFlightsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    SocialLoginModule,
    StoreModule.forRoot( {flightState : FlightReducer, passengerState : PassengerReducer},
      {runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
    }}),
    EffectsModule.forRoot([FlightEffect, PassengerEffect]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [PassengersService,
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
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
