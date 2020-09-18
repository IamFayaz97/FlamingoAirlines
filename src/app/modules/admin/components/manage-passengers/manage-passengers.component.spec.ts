import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePassengersComponent } from './manage-passengers.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

describe('ManagePassengersComponent', () => {
  let component: ManagePassengersComponent;
  let fixture: ComponentFixture<ManagePassengersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatDialogModule
      ],
      declarations: [ ManagePassengersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
