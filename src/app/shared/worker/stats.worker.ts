/// <reference lib="webworker" />

import {PostStat, PostStatsIndex} from "../model/post-stat.model";
import {StatsWorkerNS} from "../model/stats-worker.model";
import {BehaviorSubject, map, Observable, OperatorFunction} from "rxjs";
import {PostType} from "../model/post-type.enum";
import {Hour, Weekday} from "../model/axis.enum";
import {mapTimestampToHour, mapTimestampToWeekday} from "../utils/axis.utils";
import {sortPostStat} from "../utils/post-stat.utils";

class StatsWorker {
  private readonly pinStats$: BehaviorSubject<PostStatsIndex> = new BehaviorSubject<PostStatsIndex>({});
  private readonly instagramMediaStats$: BehaviorSubject<PostStatsIndex> = new BehaviorSubject<PostStatsIndex>({});
  private readonly youTubeVideoStats$: BehaviorSubject<PostStatsIndex> = new BehaviorSubject<PostStatsIndex>({});
  private readonly articleStats$: BehaviorSubject<PostStatsIndex> = new BehaviorSubject<PostStatsIndex>({});
  private readonly tweetStats$: BehaviorSubject<PostStatsIndex> = new BehaviorSubject<PostStatsIndex>({});
  private readonly facebookStatusStats$: BehaviorSubject<PostStatsIndex> = new BehaviorSubject<PostStatsIndex>({});

  private stats$(postType: PostType): BehaviorSubject<PostStatsIndex> {
    switch (postType) {
      case PostType.Pin:
        return this.pinStats$;
      case PostType.InstagramMedia:
        return this.instagramMediaStats$;
      case PostType.YouTubeVideo:
        return this.youTubeVideoStats$;
      case PostType.Article:
        return this.articleStats$;
      case PostType.Tweet:
        return this.tweetStats$;
      case PostType.FacebookStatus:
        return this.facebookStatusStats$;
    }
  }

  constructor() {
    this.initSubscriptions();
    this.initCommandHandler();
  }
  private initSubscriptions() {
    Object.values(PostType).forEach((postType: PostType) => {
      this.stats$(postType).pipe(StatsWorker.mapStatsIndexToArray).subscribe(
        (stats: Array<PostStat>) => this.postMessage<StatsWorkerNS.StatsComputedPayload>({
          type: StatsWorkerNS.Messages.StatsComputed,
          payload: { stats, postType },
        }),
      );
    });
  }
  private initCommandHandler() {
    addEventListener('message', (event: MessageEvent) => {
      if (this.isValidCommand(event)) {
        this.handleCommand(event.data as StatsWorkerNS.Command);
      } else {
        throw new Error(StatsWorkerNS.Errors.InvalidCommand);
      }
    });
  }

  private isValidCommand(event: MessageEvent): boolean {
    try {
      return StatsWorkerNS.isValidCommand(event.data.type);
    } catch (e) {
      return false;
    }
  }
  private handleCommand(command: StatsWorkerNS.Command) {
    switch (command.type) {
      case StatsWorkerNS.Commands.ComputeStats:
        this.computeStats((<StatsWorkerNS.Command<StatsWorkerNS.ComputeStatsPayload>>command).payload);
        break;
    }
  }

  private postMessage<T>(message: StatsWorkerNS.Message<T>) {
    postMessage(message);
  }

  private computeStats({ postType, post }: StatsWorkerNS.ComputeStatsPayload) {
    const acc: PostStatsIndex = this.stats$(postType).value;

    const weekday: Weekday = mapTimestampToWeekday(post.timestamp);
    const hour: Hour = mapTimestampToHour(post.timestamp);
    const postsCount: number = (acc[weekday]?.[hour]?.postsCount ?? 0) + 1;

    this.stats$(postType).next({
      ...acc,
      [weekday]: {
        ...acc[weekday],
        [hour]: {
          weekday,
          hour,
          postsCount,
        },
      },
    });
  }

  private static readonly mapStatsIndexToArray: OperatorFunction<PostStatsIndex, Array<PostStat>> =
    (source: Observable<PostStatsIndex>) => source.pipe(
      map((stats) => Object.values(stats).flatMap(
        s => Object.values(s),
      ).sort(sortPostStat)),
    );
}

export const statsWorker = new StatsWorker();
