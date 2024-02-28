import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {PostStat} from "../model/post-stat.model";
import {PostType} from "../model/post-type.enum";

@Injectable({
  providedIn: 'root'
})
export class StatsStore {
  private readonly _pinStats$: BehaviorSubject<Array<PostStat>> =
    new BehaviorSubject<Array<PostStat>>([]);
  private readonly _instagramMediaStats$: BehaviorSubject<Array<PostStat>> =
    new BehaviorSubject<Array<PostStat>>([]);
  private readonly _youTubeVideoStats$: BehaviorSubject<Array<PostStat>> =
    new BehaviorSubject<Array<PostStat>>([]);
  private readonly _articleStats$: BehaviorSubject<Array<PostStat>> =
    new BehaviorSubject<Array<PostStat>>([]);
  private readonly _tweetStats$: BehaviorSubject<Array<PostStat>> =
    new BehaviorSubject<Array<PostStat>>([]);
  private readonly _facebookStatusStats$: BehaviorSubject<Array<PostStat>> =
    new BehaviorSubject<Array<PostStat>>([]);

  statsStore$(postType: PostType): BehaviorSubject<Array<PostStat>> {
    switch (postType) {
      case PostType.Pin:
        return this._pinStats$;
      case PostType.InstagramMedia:
        return this._instagramMediaStats$;
      case PostType.YouTubeVideo:
        return this._youTubeVideoStats$;
      case PostType.Article:
        return this._articleStats$;
      case PostType.Tweet:
        return this._tweetStats$;
      case PostType.FacebookStatus:
        return this._facebookStatusStats$;
    }
  }

  updateStats(postType: PostType, stats: Array<PostStat>) {
    this.statsStore$(postType).next(stats);
  }
}
