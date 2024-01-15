import { Routes } from '@angular/router';
import { Step1Component } from './components/step1/step1.component';
import { Step2Component } from './components/step2/step2.component';
import { Step3Component } from './components/step3/step3.component';
import { AccessStep2Guard } from './guards/access-step2.guard';
import { AccessStep3Guard } from './guards/access-step3.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/step1', pathMatch: 'full' },
  { path: 'step1', component: Step1Component },
  { path: 'step2', component: Step2Component, canActivate: [AccessStep2Guard] },
  { path: 'step3', component: Step3Component, canActivate: [AccessStep3Guard] },
  { path: '**', redirectTo: '/step1' },
];
