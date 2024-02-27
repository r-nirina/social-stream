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

export const weekdayAxisLabel = (weekday: Weekday): string => {
  switch (weekday) {
    case Weekday.Sunday:
      return 'Sunday';
    case Weekday.Monday:
      return 'Monday';
    case Weekday.Tuesday:
      return 'Tuesday';
    case Weekday.Wednesday:
      return 'Wednesday';
    case Weekday.Thursday:
      return 'Thursday';
    case Weekday.Friday:
      return 'Friday';
    case Weekday.Saturday:
      return 'Saturday';
  }
};
export const hourAxisLabel = (hour: Hour): string => {
  switch (hour) {
    case Hour.AM12:
      return '12am';
    case Hour.AM1:
      return '1am';
    case Hour.AM2:
      return '2am';
    case Hour.AM3:
      return '3am';
    case Hour.AM4:
      return '4am';
    case Hour.AM5:
      return '5am';
    case Hour.AM6:
      return '6am';
    case Hour.AM7:
      return '7am';
    case Hour.AM8:
      return '8am';
    case Hour.AM9:
      return '9am';
    case Hour.AM10:
      return '10am';
    case Hour.AM11:
      return '11am';
    case Hour.PM12:
      return '12pm';
    case Hour.PM1:
      return '1pm';
    case Hour.PM2:
      return '2pm';
    case Hour.PM3:
      return '3pm';
    case Hour.PM4:
      return '4pm';
    case Hour.PM5:
      return '5pm';
    case Hour.PM6:
      return '6pm';
    case Hour.PM7:
      return '7pm';
    case Hour.PM8:
      return '8pm';
    case Hour.PM9:
      return '9pm';
    case Hour.PM10:
      return '10pm';
    case Hour.PM11:
      return '11pm';
  }
};
