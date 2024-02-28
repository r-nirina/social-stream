import { Routes } from '@angular/router';
import { ChartViewComponent } from "./module/chart-view/chart-view.component";
import {PostType} from "./shared/model/post-type.enum";

export const routes: Routes = [
  { path: 'chart/:postType', title: 'Chart View', component: ChartViewComponent },
  { path: 'chart', redirectTo: `/chart/${PostType.Pin}`, pathMatch: 'full' },
  { path: '', redirectTo: `/chart`, pathMatch: 'full' },
];
