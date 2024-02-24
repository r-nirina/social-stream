import {Message} from "../utils/message.utils";
import {isInEnum} from "../utils/enum.utils";

export enum UpfluenceStreamWorkerCommands {
  InitStream = 'INIT_STREAM',
}
export enum UpfluenceStreamWorkerMessages {
  StreamInitialized = 'STREAM_INITIALIZED',
}

export enum UpfluenceStreamWorkerErrors {
  InvalidCommand = 'INVALID_COMMAND',
}

export interface UpfluenceStreamWorkerCommand<T = unknown> extends Message<UpfluenceStreamWorkerCommands, T> {}
export interface UpfluenceStreamWorkerMessage<T = unknown> extends Message<UpfluenceStreamWorkerMessages, T> {}

export const isValidUpfluenceStreamWorkerCommand = (value: string): value is UpfluenceStreamWorkerCommands => isInEnum<string>(UpfluenceStreamWorkerCommands)(value);
export const isValidUpfluenceStreamWorkerMessage = (value: string): value is UpfluenceStreamWorkerMessages => isInEnum<string>(UpfluenceStreamWorkerMessages)(value);
