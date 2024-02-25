/// <reference lib="webworker" />

import {
  isValidUpfluenceStreamWorkerCommand,
  UpfluenceStreamWorkerCommand,
  UpfluenceStreamWorkerCommands,
  UpfluenceStreamWorkerErrors,
  UpfluenceStreamWorkerMessage,
  UpfluenceStreamWorkerMessages
} from "../model/upfluence-stream.model";
import {CONFIG} from "../../../environments/environment.config";

class UpfluenceStreamWorker {
  private eventSource: EventSource = null;

  constructor() {
    addEventListener('message', (event: MessageEvent) => {
      if (this.isValidCommand(event)) {
        this.handleCommand(event.data as UpfluenceStreamWorkerCommand);
      } else {
        throw new Error(UpfluenceStreamWorkerErrors.InvalidCommand);
      }
    });
    this.postMessage({ type: UpfluenceStreamWorkerMessages.WorkerReady });
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

  private postMessage(message: UpfluenceStreamWorkerMessage) {
    postMessage(message);
  }

  private initStream() {
    this.eventSource = new EventSource(CONFIG.UpfluenceStreamURL);
  }
}


export const upfluenceStreamWorker = new UpfluenceStreamWorker();
