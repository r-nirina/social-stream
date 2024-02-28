import {Weekday, Hour} from "./axis.enum";

export interface PostStat {
  weekday: Weekday;
  hour: Hour;
  postsCount: number;
}

export type PostStatsIndex = Partial<Record<Weekday, Partial<Record<Hour, PostStat>>>>;
