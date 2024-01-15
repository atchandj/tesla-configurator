import { Component, OnInit } from '@angular/core';
import { TeslaCarService } from '../../services/tesla-car.service';
import { forkJoin, merge, mergeMap, take, throwError } from 'rxjs';
import { TeslaCar } from '../../models/tesla-car.model';
import { TeslaOption } from '../../models/tesla-option.model';
import { TeslaModel } from '../../models/tesla-model.model';
import { TeslaConfig } from '../../models/tesla-config.model';
import { Router } from '@angular/router';
import { Color } from '../../models/color.model';
import { CurrencyPipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CurrencyPipe, MatDividerModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss',
})
export class Step3Component implements OnInit {
  teslaCar: TeslaCar | undefined;
  currentModel: TeslaModel | undefined;
  currentColor: Color | undefined;
  currentConfig: TeslaConfig | undefined;
  totalCost: number = 0;
  optionPrice: number = 1000;

  constructor(
    private teslaCarService: TeslaCarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.teslaCarService
      .getCurrentCarAsObservable()
      .pipe(
        take(1),
        mergeMap((teslaCar: TeslaCar | null) => {
          if (
            !teslaCar ||
            !teslaCar.model ||
            !teslaCar.color ||
            !teslaCar.configId
          )
            return throwError(() => new Error('Tesla car not initialized'));
          this.teslaCar = teslaCar;
          return forkJoin({
            modelList: this.teslaCarService.getModels(),
            optionList: this.teslaCarService.getOptions(teslaCar.model),
          });
        })
      )
      .subscribe({
        next: (value: { modelList: TeslaModel[]; optionList: TeslaOption }) => {
          this.currentModel = value.modelList.find(
            (m) => m.code === this.teslaCar?.model
          );
          this.currentColor = this.currentModel?.colors.find(
            (c) => c.code === this.teslaCar?.color
          );
          this.currentConfig = value.optionList.configs.find(
            (m) => m.id === this.teslaCar?.configId
          );

          if (this.currentColor) this.totalCost += this.currentColor?.price;
          if (this.currentConfig) this.totalCost += this.currentConfig?.price;
          if (this.teslaCar?.towHitch) this.totalCost += this.optionPrice;
          if (this.teslaCar?.yoke) this.totalCost += this.optionPrice;
        },
        error: () => this.router.navigate(['/step1']),
      });
  }
}
