import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TeslaCarService } from '../../services/tesla-car.service';
import { TeslaCar } from '../../models/tesla-car.model';
import { TeslaModel } from '../../models/tesla-model.model';
import { AsyncPipe } from '@angular/common';
import { forkJoin, take } from 'rxjs';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    AsyncPipe,
  ],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss',
})
export class Step1Component implements OnInit {
  models: TeslaModel[] = [];
  selectedModel: TeslaModel | null | undefined = null;
  selectedModelCode: string = '';
  selectedColor: string = '';

  constructor(private teslaCarService: TeslaCarService) {}

  ngOnInit(): void {
    forkJoin([
      this.teslaCarService.getCurrentCarAsObservable().pipe(take(1)),
      this.teslaCarService.getModels(),
    ]).subscribe((value: [TeslaCar | null, TeslaModel[]]) => {
      let teslaCar: TeslaCar | null = value[0];
      this.models = value[1];
      if (teslaCar) {
        this.selectedModel = this.findModelFromCode(teslaCar.model);
        if (this.selectedModel) {
          this.selectedModelCode = this.selectedModel.code;
          this.selectedColor = teslaCar.color;
          if (!this.selectedColor && this.selectedModel.colors.length)
            this.selectedColor = this.selectedModel.colors[0].code;
        }
      }
    });
    this.teslaCarService.getModels().subscribe((modelList: TeslaModel[]) => {
      this.models = modelList;
    });
  }

  findModelFromCode(code: string): TeslaModel | undefined {
    return this.models.find((m) => m.code === code);
  }

  onModelChange() {
    this.selectedModel = this.models.find(
      (m) => m.code === this.selectedModelCode
    );
    if (this.selectedModel && this.selectedModel.colors.length) {
      this.selectedColor = this.selectedModel.colors[0].code;
      let teslaCar: TeslaCar = new TeslaCar(
        this.selectedModelCode,
        this.selectedColor
      );
      this.teslaCarService.selectCar(teslaCar);
    }
  }

  onColorChange() {
    let teslaCar: TeslaCar | null = this.teslaCarService.getCurrentCar();
    if (teslaCar) {
      teslaCar.color = this.selectedColor;
      this.teslaCarService.selectCar(teslaCar);
    }
  }

  getImageSrc(): string {
    return `https://interstate21.com/tesla-app/images/${this.selectedModelCode}/${this.selectedColor}.jpg`;
  }
}
