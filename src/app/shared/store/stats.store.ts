import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PostStat} from "../model/post-stat.model";
import {PostType} from "../model/post-type.enum";

@Injectable({
  providedIn: 'root'
})
export class StatsStore {
  private readonly pinStats$: BehaviorSubject<Array<PostStat>> =
    new BehaviorSubject<Array<PostStat>>([]);
  private readonly instagramMediaStats$: BehaviorSubject<Array<PostStat>> =
    new BehaviorSubject<Array<PostStat>>([]);
  private readonly youTubeVideoStats$: BehaviorSubject<Array<PostStat>> =
    new BehaviorSubject<Array<PostStat>>([]);
  private readonly articleStats$: BehaviorSubject<Array<PostStat>> =
    new BehaviorSubject<Array<PostStat>>([]);
  private readonly tweetStats$: BehaviorSubject<Array<PostStat>> =
    new BehaviorSubject<Array<PostStat>>([]);
  private readonly facebookStatusStats$: BehaviorSubject<Array<PostStat>> =
    new BehaviorSubject<Array<PostStat>>([]);

  private stats$(postType: PostType): BehaviorSubject<Array<PostStat>> {
    switch (postType) {
      case PostType.Pin:
        return this.pinStats$;
      case PostType.InstagramMedia:
        return this.instagramMediaStats$;
      case PostType.YouTubeVideo:
        return this.youTubeVideoStats$;
      case PostType.Article:
        return this.articleStats$;
      case PostType.Tweet:
        return this.tweetStats$;
      case PostType.FacebookStatus:
        return this.facebookStatusStats$;
    }
  }

  updateStats(postType: PostType, stats: Array<PostStat>) {
    this.stats$(postType).next(stats);
  }
}
