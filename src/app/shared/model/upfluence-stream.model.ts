import {PostType} from "./post-type.enum";
import {Post} from "./post.model";

export type UpfluenceStreamEvent = {
  [key in PostType]: Post;
};
