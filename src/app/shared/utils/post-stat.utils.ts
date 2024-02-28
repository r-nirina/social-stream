import {PostStat} from "../model/post-stat.model";
import {mapHourToJSValue} from "./axis.utils";

export const sortPostStat = (s1: PostStat, s2: PostStat): number => {
  const h1: number = mapHourToJSValue(s1.hour);
  const h2: number = mapHourToJSValue(s2.hour);

  return (
    (h1 < h2) ? -1 :
      (h1 > h2) ? 1 :
        0
  );
}
