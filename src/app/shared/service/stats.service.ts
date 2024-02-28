import { Injectable, OnDestroy } from '@angular/core';
import { StatsStore } from "../store/stats.store";
import { StatsWorkerNS } from "../model/stats-worker.model";
import { PostType } from "../model/post-type.enum";
import { Post } from "../model/post.model";

@Injectable({
  providedIn: 'root'
})
export class StatsService implements OnDestroy {
  private worker: Worker = null;

  constructor(private statsStore: StatsStore) {
    this.initWorker();
  }
  ngOnDestroy() {
    this.destroyWorker();
  }

  computeStats(postType: PostType, post: Post) {
    this.postCommand<StatsWorkerNS.ComputeStatsPayload>({
      type: StatsWorkerNS.Commands.ComputeStats,
      payload: { postType, post },
    });
  }

  private initWorker() {
    try {
      this.destroyWorker();
      const worker: Worker = new Worker(new URL('../worker/stats.worker', import.meta.url));
      this.initMessageHandler(worker);
      this.worker = worker;
    } catch (e) {
      throw new Error('Web Workers are not supported in this environment', { cause: e });
    }
  }
  private destroyWorker() {
    this.worker?.terminate();
    this.worker = null;
  }

  private initMessageHandler(worker: Worker) {
    worker.addEventListener('message', (event: MessageEvent) => {
      if (this.isValidMessage(event)) {
        this.handleMessage(event.data as StatsWorkerNS.Message);
      } else {
        throw new Error(StatsWorkerNS.Errors.InvalidMessage);
      }
    });
  }

  private postCommand<Payload>(command: StatsWorkerNS.Command<Payload>) {
    this.worker?.postMessage(command);
  }

  private isValidMessage(event: MessageEvent): boolean {
    try {
      return StatsWorkerNS.isValidMessage(event.data.type);
    } catch (e) {
      return false;
    }
  }
  private handleMessage(message: StatsWorkerNS.Message) {
    switch (message.type) {
      case StatsWorkerNS.Messages.StatsComputed:
        this.handleStatsComputed((<StatsWorkerNS.Message<StatsWorkerNS.StatsComputedPayload>>message).payload);
        break;
    }
  }

  private handleStatsComputed({ postType, stats }: StatsWorkerNS.StatsComputedPayload) {
    this.statsStore.updateStats(postType, stats);
  }
}
