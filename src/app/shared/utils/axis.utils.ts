import {Post} from "../model/post.model";
import {Hour, Weekday} from "../model/axis.enum";

export const mapTimestampToWeekday = (timestamp: Post['timestamp']): Weekday => {
  const date: Date = new Date(timestamp * 1000);
  return date.getDay() as Weekday;
}
export const mapTimestampToHour = (timestamp: Post['timestamp']): Hour => {
  const date: Date = new Date(timestamp * 1000);
  return date.getHours() as Hour;
}
