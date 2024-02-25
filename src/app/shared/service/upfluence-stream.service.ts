import {Injectable, OnDestroy} from '@angular/core';
import {
  isValidUpfluenceStreamWorkerMessage,
  UpfluenceStreamWorkerCommand,
  UpfluenceStreamWorkerCommands, UpfluenceStreamWorkerErrors,
  UpfluenceStreamWorkerMessage, UpfluenceStreamWorkerMessages
} from "../model/upfluence-stream-worker.model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpfluenceStreamService implements OnDestroy {
  private worker: Worker = null;

  private readonly _workerReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get workerReady$(): Observable<boolean> { return this._workerReady$.asObservable(); }

  constructor() {
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
      default:
        console.log(message);
        break;
    }
  }

  private handleWorkerReady() {
    this._workerReady$.next(true);
  }
}
