import { Message as GenericMessage } from "./message.model";
import { isInEnum } from "../utils/enum.utils";
import {PostType} from "./post-type.enum";
import {Post} from "./post.model";

export namespace UpfluenceStreamWorkerNS {
  export enum Commands {
    InitStream = 'INIT_STREAM',
  }
  export enum Messages {
    WorkerReady = 'WORKER_READY',
    StreamInitialized = 'STREAM_INITIALIZED',
    NewPost = 'NewPost',
  }
  export enum Errors {
    InvalidCommand = 'INVALID_COMMAND',
    InvalidMessage = 'INVALID_MESSAGE',
  }

  interface Payload {}
  export interface NewPostPayload<P extends Post = Post> extends Payload {
    postType: PostType;
    post: P;
  }

  export interface Command<P extends Partial<Payload> = unknown> extends GenericMessage<Commands, P> {}
  export interface Message<P extends Partial<Payload> = unknown> extends GenericMessage<Messages, P> {}

  export const isValidCommand = (value: string): value is Commands => isInEnum<string>(Commands)(value);
  export const isValidMessage = (value: string): value is Messages => isInEnum<string>(Messages)(value);
}
