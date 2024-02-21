import { Routes } from '@angular/router';
import { ChartComponent } from "./routes/chart/chart.component";

export const routes: Routes = [
  { path: 'chart/:postType', title: 'Chart View', component: ChartComponent },
];
