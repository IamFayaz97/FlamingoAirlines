import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePurchasesComponent } from './manage-purchases.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

describe('ManagePurchasesComponent', () => {
  let component: ManagePurchasesComponent;
  let fixture: ComponentFixture<ManagePurchasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatDialogModule
      ],
      declarations: [ ManagePurchasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
