import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { map, mergeMap, take, throwError } from 'rxjs';
import { TeslaCar } from '../../models/tesla-car.model';
import { TeslaCarService } from '../../services/tesla-car.service';
import { TeslaOption } from '../../models/tesla-option.model';
import { TeslaConfig } from '../../models/tesla-config.model';
import { Router } from '@angular/router';
import { CurrencyPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    NgIf,
    FormsModule,
    CurrencyPipe,
  ],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
})
export class Step2Component implements OnInit {
  teslaCar: TeslaCar | undefined;
  option: TeslaOption | undefined;
  selectedConfigId: string = '';
  selectedConfig: TeslaConfig | undefined;
  includeYoke: boolean = false;
  includeTow: boolean = false;

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
          if (!teslaCar)
            return throwError(() => new Error('Tesla car not initialized'));
          this.teslaCar = teslaCar;
          return this.teslaCarService.getOptions(teslaCar.model);
        })
      )
      .subscribe({
        next: (optionList: TeslaOption) => {
          this.option = optionList;
          this.selectedConfig = this.option.configs.find(
            (c) => c.id === this.teslaCar?.configId
          );
          this.selectedConfigId = this.teslaCar?.configId + '';
          this.includeTow = !!this.teslaCar?.towHitch;
          this.includeYoke = !!this.teslaCar?.yoke;
        },
        error: () => this.router.navigate(['/step1']),
      });
  }

  onConfigChange(): void {
    this.selectedConfig = this.option?.configs.find(
      (c) => c.id === +this.selectedConfigId
    );
    if (this.teslaCar) {
      this.teslaCar.configId = +this.selectedConfigId;
      this.teslaCarService.selectCar(this.teslaCar);
    }
  }

  onIncludeYokeChange(yoke: boolean): void {
    if (this.teslaCar) {
      this.teslaCar.yoke = yoke;
      this.teslaCarService.selectCar(this.teslaCar);
    }
  }

  onIncludeTowChange(towHitch: boolean): void {
    if (this.teslaCar) {
      this.teslaCar.towHitch = towHitch;
      this.teslaCarService.selectCar(this.teslaCar);
    }
  }

  getImageSrc(): string {
    return `https://interstate21.com/tesla-app/images/${this.teslaCar?.model}/${this.teslaCar?.color}.jpg`;
  }
}
