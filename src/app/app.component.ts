import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { TeslaCarService } from './services/tesla-car.service';
import { TeslaCar } from './models/tesla-car.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatTabsModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  currentCarSubscription: Subscription | undefined;
  currentCar: TeslaCar | null = null;

  constructor(private teslaCarService: TeslaCarService) {}

  ngOnInit(): void {
    this.currentCarSubscription = this.teslaCarService
      .getCurrentCarAsObservable()
      .subscribe((teslaCar: TeslaCar | null) => {
        this.currentCar = teslaCar;
      });
  }

  isStep2Disabled(): boolean {
    return !this.currentCar || !this.currentCar.model || !this.currentCar.color;
  }

  isStep3Disabled(): boolean {
    return (
      !this.currentCar ||
      !this.currentCar.model ||
      !this.currentCar.color ||
      !this.currentCar.configId
    );
  }

  ngOnDestroy(): void {
    this.currentCarSubscription?.unsubscribe();
  }
}
