import {Message} from "./message.model";
import {isInEnum} from "../utils/enum.utils";

export enum UpfluenceStreamWorkerCommands {
  InitStream = 'INIT_STREAM',
}
export enum UpfluenceStreamWorkerMessages {
  WorkerReady = 'WORKER_READY',
  StreamInitialized = 'STREAM_INITIALIZED',
  NewPin = 'NEW_PIN',
  NewInstagramMedia = 'NEW_INSTAGRAM_MEDIA',
  NewYouTubeVideo = 'NEW_YOUTUBE_VIDEO',
  NewArticle = 'NEW_ARTICLE',
  NewTweet = 'NEW_TWEET',
  NewFacebookStatus = 'NEW_FACEBOOK_STATUS',
}

export enum UpfluenceStreamWorkerErrors {
  InvalidCommand = 'INVALID_COMMAND',
  InvalidMessage = 'INVALID_MESSAGE',
}

export interface UpfluenceStreamWorkerCommand<T = unknown> extends Message<UpfluenceStreamWorkerCommands, T> {}
export interface UpfluenceStreamWorkerMessage<T = unknown> extends Message<UpfluenceStreamWorkerMessages, T> {}

export const isValidUpfluenceStreamWorkerCommand = (value: string): value is UpfluenceStreamWorkerCommands => isInEnum<string>(UpfluenceStreamWorkerCommands)(value);
export const isValidUpfluenceStreamWorkerMessage = (value: string): value is UpfluenceStreamWorkerMessages => isInEnum<string>(UpfluenceStreamWorkerMessages)(value);
