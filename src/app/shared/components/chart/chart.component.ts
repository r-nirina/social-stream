import {Component, Input} from '@angular/core';
import {AgChartsAngular} from "ag-charts-angular";
import {AgChartOptions} from "ag-charts-community";
import {PostStat} from "../../model/post-stat.model";
import {propertyOf} from "../../utils/model.utils";
import {PostType, postTypeLabel} from "../../model/post-type.enum";

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ AgChartsAngular ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  @Input() postType: PostType = PostType.Pin;
  @Input() stats: Array<PostStat> = [];

  protected mapStatsToOptions(postType: PostType, stats: Array<PostStat>): AgChartOptions {
    return {
      title: {
        text: postTypeLabel(postType),
        fontFamily: 'Titillium Web',
      },
      series: [{
        type: 'bubble',
        xKey: propertyOf<PostStat>('hour'),
        yKey: propertyOf<PostStat>('weekday'),
        sizeKey: propertyOf<PostStat>('postsCount'),
        data: stats,
      }],
      axes: [
        {
          type: 'category',
          position: 'bottom',
          title: {
            text: 'Hour of the day (UTC)',
            fontFamily: 'Titillium Web',
          },
        },
        {
          type: 'category',
          position: 'left',
          title: {
            text: 'Day of the week (UTC)',
            fontFamily: 'Titillium Web',
          },
        },
      ],
    };
  }
}
