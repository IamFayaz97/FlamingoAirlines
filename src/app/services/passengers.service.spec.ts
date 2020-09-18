import { TestBed } from '@angular/core/testing';

import { PassengersService } from './passengers.service';
import { HttpClientModule } from '@angular/common/http';

describe('PassengersService', () => {
  let service: PassengersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(PassengersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
