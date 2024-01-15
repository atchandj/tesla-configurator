import { TestBed } from '@angular/core/testing';

import { TeslaCarService } from './tesla-car.service';

describe('TeslaCarService', () => {
  let service: TeslaCarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeslaCarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
