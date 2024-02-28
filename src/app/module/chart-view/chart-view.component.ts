import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {map, Observable, Subscription} from "rxjs";
import {isValidPostType, PostType} from "../../shared/model/post-type.enum";
import {ChartComponent} from "../../shared/components/chart/chart.component";
import {StatsStore} from "../../shared/store/stats.store";
import {PostStat} from "../../shared/model/post-stat.model";

@Component({
  selector: 'chart-view',
  standalone: true,
  imports: [ ChartComponent ],
  templateUrl: './chart-view.component.html',
  styleUrl: './chart-view.component.scss'
})
export class ChartViewComponent implements OnInit, OnDestroy {
  private readonly subscriptions: Array<Subscription> = [];

  private readonly postType$: Observable<PostType> = this.route.paramMap
    .pipe(map((paramMap: ParamMap) => paramMap.get('postType')))
    .pipe(map((param: string): PostType => isValidPostType(param) ? param : null))

  protected postType: PostType = PostType.Pin;
  protected get stats(): Array<PostStat> {
    return this.statsStore.statsStore$(this.postType).value;
  }

  constructor(
    private route: ActivatedRoute,
    private statsStore: StatsStore,
  ) {}

  ngOnInit() {
    this.subscriptions.push(this.postType$.subscribe((postType) => {
      this.postType = postType;
    }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
