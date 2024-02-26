import {Injectable, OnDestroy} from '@angular/core';
import {
  isValidUpfluenceStreamWorkerMessage,
  UpfluenceStreamWorkerCommand,
  UpfluenceStreamWorkerCommands, UpfluenceStreamWorkerErrors,
  UpfluenceStreamWorkerMessage, UpfluenceStreamWorkerMessages
} from "../model/upfluence-stream-worker.model";
import {BehaviorSubject, Observable} from "rxjs";
import {PostsStore} from "../store/posts.store";
import {Article, FacebookStatus, InstagramMedia, Pin, Tweet, YouTubeVideo} from "../model/post.model";

@Injectable({
  providedIn: 'root'
})
export class UpfluenceStreamService implements OnDestroy {
  private worker: Worker = null;

  private readonly _workerReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get workerReady$(): Observable<boolean> { return this._workerReady$.asObservable(); }

  constructor(private postsStore: PostsStore) {
    this.initWorker();
  }
  ngOnDestroy() {
    this.destroyWorker();
  }

  initStream() {
    this.postCommand({ type: UpfluenceStreamWorkerCommands.InitStream });
  }

  private initWorker() {
    try {
      this.destroyWorker();
      const worker: Worker = new Worker(new URL('../worker/upfluence-stream.worker', import.meta.url));
      this.initMessageHandler(worker);
      this.worker = worker;
    } catch (e) {
      throw new Error('Web Workers are not supported in this environment', { cause: e });
    }
  }
  private destroyWorker() {
    this.worker?.terminate();
    this._workerReady$.next(false);
    this.worker = null;
  }

  private initMessageHandler(worker: Worker) {
    worker.addEventListener('message', (event: MessageEvent) => {
      if (this.isValidMessage(event)) {
        this.handleMessage(event.data as UpfluenceStreamWorkerMessage);
      } else {
        throw new Error(UpfluenceStreamWorkerErrors.InvalidMessage);
      }
    });
  }

  private postCommand<T>(command: UpfluenceStreamWorkerCommand<T>) {
    this.worker?.postMessage(command);
  }

  private isValidMessage(event: MessageEvent): boolean {
    try {
      return isValidUpfluenceStreamWorkerMessage(event.data.type);
    } catch (e) {
      return false;
    }
  }
  private handleMessage(message: UpfluenceStreamWorkerMessage) {
    switch (message?.type) {
      case UpfluenceStreamWorkerMessages.WorkerReady:
        this.handleWorkerReady();
        break;
      case UpfluenceStreamWorkerMessages.StreamInitialized:
        break;
      case UpfluenceStreamWorkerMessages.NewPin:
        this.postsStore.saveNewPin(message.payload as Pin);
        break;
      case UpfluenceStreamWorkerMessages.NewInstagramMedia:
        this.postsStore.saveNewInstagramMedia(message.payload as InstagramMedia);
        break;
      case UpfluenceStreamWorkerMessages.NewYouTubeVideo:
        this.postsStore.saveNewYouTubeVideo(message.payload as YouTubeVideo);
        break;
      case UpfluenceStreamWorkerMessages.NewArticle:
        this.postsStore.saveNewArticle(message.payload as Article);
        break;
      case UpfluenceStreamWorkerMessages.NewTweet:
        this.postsStore.saveNewTweet(message.payload as Tweet);
        break;
      case UpfluenceStreamWorkerMessages.NewFacebookStatus:
        this.postsStore.saveNewFacebookStatus(message.payload as FacebookStatus);
        break;
    }
  }

  private handleWorkerReady() {
    this._workerReady$.next(true);
  }
}
