import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Article, FacebookStatus, InstagramMedia, Pin, Post, Tweet, YouTubeVideo } from "../model/post.model";
import {PostType} from "../model/post-type.enum";

@Injectable({
  providedIn: 'root'
})
export class PostsStore {
  private readonly pin$: BehaviorSubject<Record<Post['id'], Pin>> =
    new BehaviorSubject<Record<Post['id'], Pin>>({});
  private readonly instagramMedia$: BehaviorSubject<Record<Post['id'], InstagramMedia>> =
    new BehaviorSubject<Record<Post['id'], InstagramMedia>>({});
  private readonly youTubeVideo$: BehaviorSubject<Record<Post['id'], YouTubeVideo>> =
    new BehaviorSubject<Record<Post['id'], YouTubeVideo>>({});
  private readonly article$: BehaviorSubject<Record<Post['id'], Article>> =
    new BehaviorSubject<Record<Post['id'], Article>>({});
  private readonly tweet$: BehaviorSubject<Record<Post['id'], Tweet>> =
    new BehaviorSubject<Record<Post['id'], Tweet>>({});
  private readonly facebookStatus$: BehaviorSubject<Record<Post['id'], FacebookStatus>> =
    new BehaviorSubject<Record<Post['id'], FacebookStatus>>({});

  private postsStore$(postType: PostType):
    BehaviorSubject<Record<Post['id'], Pin>>
    | BehaviorSubject<Record<Post['id'], InstagramMedia>>
    | BehaviorSubject<Record<Post['id'], YouTubeVideo>>
    | BehaviorSubject<Record<Post['id'], Article>>
    | BehaviorSubject<Record<Post['id'], Tweet>>
    | BehaviorSubject<Record<Post['id'], FacebookStatus>> {
    switch (postType) {
      case PostType.Pin:
        return this.pin$;
      case PostType.InstagramMedia:
        return this.instagramMedia$;
      case PostType.YouTubeVideo:
        return this.youTubeVideo$;
      case PostType.Article:
        return this.article$;
      case PostType.Tweet:
        return this.tweet$;
      case PostType.FacebookStatus:
        return this.facebookStatus$;
    }
  }

  saveNewPost<P extends Post>(postType: PostType, post: P) {
    const postsStore$ = this.postsStore$(postType);
    postsStore$.next(<any>{
      ...postsStore$.value,
      [post.id]: post,
    });
  }
}
