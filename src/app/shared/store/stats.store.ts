import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PostStat} from "../model/post-stat.model";

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

  updatePinStats(stats: Array<PostStat>) {
    this.pinStats$.next(stats);
  }
  updateInstagramMediaStats(stats: Array<PostStat>) {
    this.instagramMediaStats$.next(stats);
  }
  updateYouTubeVideoStats(stats: Array<PostStat>) {
    this.youTubeVideoStats$.next(stats);
  }
  updateArticleStats(stats: Array<PostStat>) {
    this.articleStats$.next(stats);
  }
  updateTweetStats(stats: Array<PostStat>) {
    this.tweetStats$.next(stats);
  }
  updateFacebookStatusStats(stats: Array<PostStat>) {
    this.facebookStatusStats$.next(stats);
  }
}
