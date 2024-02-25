/// <reference lib="webworker" />

import {
  isValidUpfluenceStreamWorkerCommand,
  UpfluenceStreamWorkerCommand,
  UpfluenceStreamWorkerCommands,
  UpfluenceStreamWorkerErrors,
  UpfluenceStreamWorkerMessage,
  UpfluenceStreamWorkerMessages
} from "../model/upfluence-stream-worker.model";
import { CONFIG } from "../../../environments/environment.config";
import { PostType } from "../model/post-type.enum";
import { catchError, filter, map, Observable, of, OperatorFunction, Subject } from "rxjs";
import { Article, FacebookStatus, InstagramMedia, Pin, Post, Tweet, YouTubeVideo } from "../model/post.model";
import { UpfluenceStreamEvent } from "../model/upfluence-stream.model";

class UpfluenceStreamWorker {
  private eventSource: EventSource = null;

  private readonly rawEvents$: Subject<string> = new Subject<string>();
  private readonly events$: Observable<UpfluenceStreamEvent> = this.rawEvents$.pipe(
    map((rawEvent: string): UpfluenceStreamEvent => JSON.parse(rawEvent)),
    catchError(() => of(null)),
    filter((event: UpfluenceStreamEvent): boolean => Boolean(event)),
  );
  private readonly pin$: Observable<Pin> = this.events$.pipe(
    UpfluenceStreamWorker.mapEventToPostOperator<Pin>(PostType.Pin),
  );
  private readonly instagramMedia$: Observable<InstagramMedia> = this.events$.pipe(
    UpfluenceStreamWorker.mapEventToPostOperator<InstagramMedia>(PostType.InstagramMedia),
  );
  private readonly youTubeVideo$: Observable<YouTubeVideo> = this.events$.pipe(
    UpfluenceStreamWorker.mapEventToPostOperator<YouTubeVideo>(PostType.YouTubeVideo),
  );
  private readonly article$: Observable<Article> = this.events$.pipe(
    UpfluenceStreamWorker.mapEventToPostOperator<Article>(PostType.Article),
  );
  private readonly tweet$: Observable<Tweet> = this.events$.pipe(
    UpfluenceStreamWorker.mapEventToPostOperator<Tweet>(PostType.Tweet),
  );
  private readonly facebookStatus$: Observable<FacebookStatus> = this.events$.pipe(
    UpfluenceStreamWorker.mapEventToPostOperator<FacebookStatus>(PostType.FacebookStatus),
  );

  constructor() {
    this.initSubscriptions();
    this.initCommandHandler();
    this.postMessage({ type: UpfluenceStreamWorkerMessages.WorkerReady });
  }
  private initSubscriptions() {
    this.pin$.subscribe((payload: Pin) => this.postMessage<Pin>({
      type: UpfluenceStreamWorkerMessages.NewPin,
      payload,
    }));
    this.instagramMedia$.subscribe((payload: InstagramMedia) => this.postMessage<InstagramMedia>({
      type: UpfluenceStreamWorkerMessages.NewInstagramMedia,
      payload,
    }));
    this.youTubeVideo$.subscribe((payload: YouTubeVideo) => this.postMessage<YouTubeVideo>({
      type: UpfluenceStreamWorkerMessages.NewYouTubeVideo,
      payload,
    }));
    this.article$.subscribe((payload: Article) => this.postMessage<Article>({
      type: UpfluenceStreamWorkerMessages.NewArticle,
      payload,
    }));
    this.tweet$.subscribe((payload: Tweet) => this.postMessage<Tweet>({
      type: UpfluenceStreamWorkerMessages.NewTweet,
      payload,
    }));
    this.facebookStatus$.subscribe((payload: FacebookStatus) => this.postMessage<FacebookStatus>({
      type: UpfluenceStreamWorkerMessages.NewFacebookStatus,
      payload,
    }));
  }
  private initCommandHandler() {
    addEventListener('message', (event: MessageEvent) => {
      if (this.isValidCommand(event)) {
        this.handleCommand(event.data as UpfluenceStreamWorkerCommand);
      } else {
        throw new Error(UpfluenceStreamWorkerErrors.InvalidCommand);
      }
    });
  }

  private isValidCommand(event: MessageEvent): boolean {
    try {
      return isValidUpfluenceStreamWorkerCommand(event.data.type);
    } catch (e) {
      return false;
    }
  }
  private handleCommand(command: UpfluenceStreamWorkerCommand) {
    switch (command.type) {
      case UpfluenceStreamWorkerCommands.InitStream:
        this.initStream();
        break;
    }
  }

  private postMessage<T>(message: UpfluenceStreamWorkerMessage<T>) {
    postMessage(message);
  }

  private initStream() {
    this.destroyStream();

    const eventSource: EventSource = new EventSource(CONFIG.UpfluenceStreamURL);

    eventSource.addEventListener('message', (event: MessageEvent<string>) => {
      this.rawEvents$.next(event.data);
    });

    this.eventSource = eventSource;
  }
  private destroyStream() {
    this.eventSource?.close();
  }

  private static readonly mapEventToPostOperator =
    <P extends Post>(postType: PostType): OperatorFunction<UpfluenceStreamEvent, P> =>
      (source) => source.pipe(
        map((post: UpfluenceStreamEvent): Post => post[postType]),
        catchError(() => of(null)),
        filter((post: Post): post is P => Boolean(post)),
      );
}

export const upfluenceStreamWorker = new UpfluenceStreamWorker();
