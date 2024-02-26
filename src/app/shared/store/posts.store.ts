import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Article, FacebookStatus, InstagramMedia, Pin, Post, Tweet, YouTubeVideo } from "../model/post.model";

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

  private saveNewPost<P extends Post>(post: P, postStore$: BehaviorSubject<Record<Post['id'], P>>) {
    postStore$.next({
      ...postStore$.value,
      [post.id]: post,
    });
  }

  saveNewPin(pin: Pin) {
    this.saveNewPost<Pin>(pin, this.pin$);
  }
  saveNewInstagramMedia(instagramMedia: InstagramMedia) {
    this.saveNewPost<InstagramMedia>(instagramMedia, this.instagramMedia$);
  }
  saveNewYouTubeVideo(youTubeVideo: YouTubeVideo) {
    this.saveNewPost<YouTubeVideo>(youTubeVideo, this.youTubeVideo$);
  }
  saveNewArticle(article: Article) {
    this.saveNewPost<Article>(article, this.article$);
  }
  saveNewTweet(tweet: Tweet) {
    this.saveNewPost<Tweet>(tweet, this.tweet$);
  }
  saveNewFacebookStatus(facebookStatus: FacebookStatus) {
    this.saveNewPost<FacebookStatus>(facebookStatus, this.facebookStatus$);
  }
}
