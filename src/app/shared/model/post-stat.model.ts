import {Weekday, Hour} from "./axis.enum";

export interface PostStat {
  day: Weekday;
  hour: Hour;
  postsCount: number;
}
