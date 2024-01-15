import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeslaModel } from '../models/tesla-model.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { TeslaCar } from '../models/tesla-car.model';
import { TeslaOption } from '../models/tesla-option.model';

@Injectable({
  providedIn: 'root',
})
export class TeslaCarService {
  private currentTeslaCar$: BehaviorSubject<TeslaCar | null> =
    new BehaviorSubject<TeslaCar | null>(null);

  constructor(private http: HttpClient) {}

  getModels(): Observable<TeslaModel[]> {
    return this.http.get<TeslaModel[]>('/models');
  }

  getOptions(modelCode: string): Observable<TeslaOption> {
    return this.http.get<TeslaOption>('/options/' + modelCode);
  }

  getCurrentCarAsObservable(): Observable<TeslaCar | null> {
    return this.currentTeslaCar$;
  }

  getCurrentCar(): TeslaCar | null {
    return this.currentTeslaCar$.getValue();
  }

  selectCar(teslaCar: TeslaCar): void {
    this.currentTeslaCar$.next(teslaCar);
  }
}
