import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {UpfluenceStreamWorkerCommand, UpfluenceStreamWorkerCommands} from "../model/upfluence-stream.model";

@Injectable({
  providedIn: 'root'
})
export class UpfluenceStreamService implements OnInit, OnDestroy {
  private worker: Worker = null;

  ngOnInit() {
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
      this.worker = new Worker(new URL('../worker/upfluence-stream.worker', import.meta.url));
    } catch (e) {
      throw new Error('Web Workers are not supported in this environment', { cause: e });
    }
  }
  private destroyWorker() {
    this.worker?.terminate();
    this.worker = null;
  }

  private postCommand(command: UpfluenceStreamWorkerCommand) {
    this.worker?.postMessage(command);
  }
}
