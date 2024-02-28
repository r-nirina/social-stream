import {Post} from "../model/post.model";
import {Hour, Weekday} from "../model/axis.enum";

export const mapTimestampToWeekday = (timestamp: Post['timestamp']): Weekday => {
  const date: Date = new Date(timestamp * 1000);
  return mapJSValueToWeekday(date.getDay());
}
export const mapTimestampToHour = (timestamp: Post['timestamp']): Hour => {
  const date: Date = new Date(timestamp * 1000);
  return mapJSValueToHour(date.getHours());
}

export const mapWeekdayToJSValue = (weekday: Weekday): number => {
  switch (weekday) {
    case Weekday.Sunday:
      return 0;
    case Weekday.Monday:
      return 1;
    case Weekday.Tuesday:
      return 2;
    case Weekday.Wednesday:
      return 3;
    case Weekday.Thursday:
      return 4;
    case Weekday.Friday:
      return 5;
    case Weekday.Saturday:
      return 6;
  }
};
export const mapHourToJSValue = (hour: Hour): number => {
  switch (hour) {
    case Hour.AM12:
      return 0;
    case Hour.AM1:
      return 1;
    case Hour.AM2:
      return 2;
    case Hour.AM3:
      return 3;
    case Hour.AM4:
      return 4;
    case Hour.AM5:
      return 5;
    case Hour.AM6:
      return 6;
    case Hour.AM7:
      return 7;
    case Hour.AM8:
      return 8;
    case Hour.AM9:
      return 9;
    case Hour.AM10:
      return 10;
    case Hour.AM11:
      return 11;
    case Hour.PM12:
      return 12;
    case Hour.PM1:
      return 13;
    case Hour.PM2:
      return 14;
    case Hour.PM3:
      return 15;
    case Hour.PM4:
      return 16;
    case Hour.PM5:
      return 17;
    case Hour.PM6:
      return 18;
    case Hour.PM7:
      return 19;
    case Hour.PM8:
      return 20;
    case Hour.PM9:
      return 21;
    case Hour.PM10:
      return 22;
    case Hour.PM11:
      return 23;
  }
};

export const mapJSValueToWeekday = (value: number): Weekday => {
  switch (value) {
    case 0:
      return Weekday.Sunday;
    case 1:
      return Weekday.Monday;
    case 2:
      return Weekday.Tuesday;
    case 3:
      return Weekday.Wednesday;
    case 4:
      return Weekday.Thursday;
    case 5:
      return Weekday.Friday;
    case 6:
      return Weekday.Saturday;
    default:
      return null;
  }
}
export const mapJSValueToHour = (value: number): Hour => {
  switch (value) {
    case 0:
      return Hour.AM12;
    case 1:
      return Hour.AM1;
    case 2:
      return Hour.AM2;
    case 3:
      return Hour.AM3;
    case 4:
      return Hour.AM4;
    case 5:
      return Hour.AM5;
    case 6:
      return Hour.AM6;
    case 7:
      return Hour.AM7;
    case 8:
      return Hour.AM8;
    case 9:
      return Hour.AM9;
    case 10:
      return Hour.AM10;
    case 11:
      return Hour.AM11;
    case 12:
      return Hour.PM12;
    case 13:
      return Hour.PM1;
    case 14:
      return Hour.PM2;
    case 15:
      return Hour.PM3;
    case 16:
      return Hour.PM4;
    case 17:
      return Hour.PM5;
    case 18:
      return Hour.PM6;
    case 19:
      return Hour.PM7;
    case 20:
      return Hour.PM8;
    case 21:
      return Hour.PM9;
    case 22:
      return Hour.PM10;
    case 23:
      return Hour.PM11;
    default:
      return null;
  }
}
