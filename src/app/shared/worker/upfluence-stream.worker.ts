/// <reference lib="webworker" />

import {
  isValidUpfluenceStreamWorkerCommand,
  UpfluenceStreamWorkerCommand,
  UpfluenceStreamWorkerCommands,
  UpfluenceStreamWorkerErrors
} from "../model/upfluence-stream.model";
import {CONFIG} from "../../../environments/environment.config";

class UpfluenceStreamWorker {
  private eventSource: EventSource = null;

  constructor() {
    addEventListener('message', (message: MessageEvent) => {
      if (this.isValidCommand(message)) {
        this.handleCommand(message.data as UpfluenceStreamWorkerCommand);
      } else {
        throw new Error(UpfluenceStreamWorkerErrors.InvalidCommand);
      }
    });
  }

  private isValidCommand(message: MessageEvent): boolean {
    try {
      return isValidUpfluenceStreamWorkerCommand(message.data.type);
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

  private initStream() {
    this.eventSource = new EventSource(CONFIG.UpfluenceStreamURL);
  }
}


export const upfluenceStreamWorker = new UpfluenceStreamWorker();
