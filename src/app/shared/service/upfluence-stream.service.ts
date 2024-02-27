import { Injectable, OnDestroy } from '@angular/core';
import { UpfluenceStreamWorkerNS as WorkerNS } from "../model/upfluence-stream-worker.model";
import { BehaviorSubject, Observable } from "rxjs";
import { PostsStore } from "../store/posts.store";
import { StatsService } from "./stats.service";

@Injectable({
  providedIn: 'root'
})
export class UpfluenceStreamService implements OnDestroy {
  private worker: Worker = null;

  private readonly _workerReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly workerReady$: Observable<boolean> = this._workerReady$.asObservable();

  constructor(
    private postsStore: PostsStore,
    private statsService: StatsService,
  ) {
    this.initWorker();
  }
  ngOnDestroy() {
    this.destroyWorker();
  }

  initStream() {
    this.postCommand({ type: WorkerNS.Commands.InitStream });
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
        this.handleMessage(event.data as WorkerNS.Message);
      } else {
        throw new Error(WorkerNS.Errors.InvalidMessage);
      }
    });
  }

  private postCommand<T>(command: WorkerNS.Command<T>) {
    this.worker?.postMessage(command);
  }

  private isValidMessage(event: MessageEvent): boolean {
    try {
      return WorkerNS.isValidMessage(event.data.type);
    } catch (e) {
      return false;
    }
  }
  private handleMessage(message: WorkerNS.Message) {
    switch (message?.type) {
      case WorkerNS.Messages.WorkerReady:
        this.handleWorkerReady();
        break;
      case WorkerNS.Messages.StreamInitialized:
        break;
      case WorkerNS.Messages.NewPost:
        this.handleNewPost((<WorkerNS.Message<WorkerNS.NewPostPayload>>message).payload);
        break;
    }
  }

  private handleWorkerReady() {
    this._workerReady$.next(true);
  }

  private handleNewPost({ postType, post }: WorkerNS.NewPostPayload) {
    this.postsStore.saveNewPost(postType, post);
    this.statsService.computeStats(postType, post);
  }
}
