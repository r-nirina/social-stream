import { Routes } from '@angular/router';
import { ChartComponent } from "./module/chart/chart.component";

export const routes: Routes = [
  { path: 'chart/:postType', title: 'Chart View', component: ChartComponent },
];
