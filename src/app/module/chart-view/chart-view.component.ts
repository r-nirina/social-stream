import { Component } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import { Observable, map } from "rxjs";
import {isValidPostType, PostType} from "../../shared/model/post-type.enum";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'chart-view',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './chart-view.component.html',
  styleUrl: './chart-view.component.scss'
})
export class ChartViewComponent {
  protected readonly postType$: Observable<PostType> = this.route.paramMap
    .pipe(map((paramMap: ParamMap) => paramMap.get('postType')))
    .pipe(map((param: string): PostType => isValidPostType(param) ? param : null))

  constructor(private route: ActivatedRoute) {}
}
