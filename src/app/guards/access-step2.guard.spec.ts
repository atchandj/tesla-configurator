import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { accessStep2Guard } from './access-step2.guard';

describe('accessStep2Guard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => accessStep2Guard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
