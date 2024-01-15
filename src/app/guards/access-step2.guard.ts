import { CanActivateFn, Router } from '@angular/router';
import { TeslaCarService } from '../services/tesla-car.service';
import { inject } from '@angular/core';

export const AccessStep2Guard: CanActivateFn = (route, state) => {
  const teslaCarService: TeslaCarService = inject(TeslaCarService);
  const router: Router = inject(Router);

  const currentCar = teslaCarService.getCurrentCar();

  if (currentCar && currentCar.model && currentCar.color) return true;
  else {
    router.navigateByUrl('/step1');
    return false;
  }
};
