import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Observable, map, mergeMap } from "rxjs";
import { isValidPostType, PostType } from "../../shared/model/post-type.enum";
import { AsyncPipe } from "@angular/common";
import { ChartComponent } from "../../shared/components/chart/chart.component";
import { StatsStore } from "../../shared/store/stats.store";
import { PostStat } from "../../shared/model/post-stat.model";

@Component({
  selector: 'chart-view',
  standalone: true,
  imports: [
    AsyncPipe,
    ChartComponent
  ],
  templateUrl: './chart-view.component.html',
  styleUrl: './chart-view.component.scss'
})
export class ChartViewComponent {
  protected readonly postType$: Observable<PostType> = this.route.paramMap
    .pipe(map((paramMap: ParamMap) => paramMap.get('postType')))
    .pipe(map((param: string): PostType => isValidPostType(param) ? param : null))

  protected readonly statsStore$: Observable<Array<PostStat>> = this.postType$.pipe(
    mergeMap((postType: PostType) => this.statsStore.statsStore$(postType)),
  );

  constructor(
    private route: ActivatedRoute,
    private statsStore: StatsStore,
  ) {}
}
