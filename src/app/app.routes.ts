import { Routes } from '@angular/router';
import { ChartViewComponent } from "./module/chart-view/chart-view.component";

export const routes: Routes = [
  { path: 'chart/:postType', title: 'Chart View', component: ChartViewComponent },
];
