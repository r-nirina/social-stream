/// <reference lib="webworker" />

import { CONFIG } from "../../../environments/environment.config";
import { PostType } from "../model/post-type.enum";
import { catchError, filter, map, Observable, of, OperatorFunction, Subject } from "rxjs";
import { Article, FacebookStatus, InstagramMedia, Pin, Post, Tweet, YouTubeVideo } from "../model/post.model";
import { UpfluenceStreamEvent } from "../model/upfluence-stream.model";
import { UpfluenceStreamWorkerNS as WorkerNS } from "../model/upfluence-stream-worker.model";

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

  private posts$(postType: PostType):
    Observable<Pin>
    | Observable<InstagramMedia>
    | Observable<YouTubeVideo>
    | Observable<Article>
    | Observable<Tweet>
    | Observable<FacebookStatus> {
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

  constructor() {
    this.initSubscriptions();
    this.initCommandHandler();
    this.postMessage({ type: WorkerNS.Messages.WorkerReady });
  }
  private initSubscriptions() {
    Object.values(PostType).forEach((postType: PostType) => {
      this.posts$(postType).subscribe((post: Post) => this.postMessage<WorkerNS.NewPostPayload>({
        type: WorkerNS.Messages.NewPost,
        payload: { postType, post },
      }));
    });
  }
  private initCommandHandler() {
    addEventListener('message', (event: MessageEvent) => {
      if (this.isValidCommand(event)) {
        this.handleCommand(event.data as WorkerNS.Command);
      } else {
        throw new Error(WorkerNS.Errors.InvalidCommand);
      }
    });
  }

  private isValidCommand(event: MessageEvent): boolean {
    try {
      return WorkerNS.isValidCommand(event.data.type);
    } catch (e) {
      return false;
    }
  }
  private handleCommand(command: WorkerNS.Command) {
    switch (command.type) {
      case WorkerNS.Commands.InitStream:
        this.initStream();
        break;
    }
  }

  private postMessage<T>(message: WorkerNS.Message<T>) {
    postMessage(message);
  }

  private initStream() {
    this.destroyStream();

    const eventSource: EventSource = new EventSource(CONFIG.UpfluenceStreamURL);

    eventSource.addEventListener('open', () => {
      this.postMessage({ type: WorkerNS.Messages.StreamInitialized });
    });
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
