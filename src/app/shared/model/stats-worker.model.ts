import {Message as GenericMessage} from "./message.model";
import {isInEnum} from "../utils/enum.utils";
import {PostType} from "./post-type.enum";
import {Post} from "./post.model";
import {PostStat} from "./post-stat.model";

export namespace StatsWorkerNS {
  export enum Commands {
    ComputeStats = 'COMPUTE_POST_TYPE_STATS',
  }
  export enum Messages {
    StatsComputed = 'POST_TYPE_STATS_COMPUTED',
  }
  export enum Errors {
    InvalidCommand = 'INVALID_COMMAND',
    InvalidMessage = 'INVALID_MESSAGE',
  }

  interface Payload {
    postType: PostType;
  }
  export interface ComputeStatsPayload extends Payload {
    post: Post;
  }
  export interface StatsComputedPayload extends Payload {
    stats: Array<PostStat>;
  }

  export interface Command<P extends Partial<Payload> = unknown> extends GenericMessage<Commands, P> {}
  export interface Message<P extends Partial<Payload> = unknown> extends GenericMessage<Messages, P> {}

  export const isValidCommand = (value: string): value is Commands => isInEnum<string>(Commands)(value);
  export const isValidMessage = (value: string): value is Messages => isInEnum<string>(Messages)(value);
}


