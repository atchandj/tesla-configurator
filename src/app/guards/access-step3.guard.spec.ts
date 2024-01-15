import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { accessStep3Guard } from './access-step3.guard';

describe('accessStep3Guard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => accessStep3Guard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
