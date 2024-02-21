import {isInEnum} from "../utils/enum.utils";

export enum PostType {
  Pin = 'pin',
  InstagramMedia = 'instagram_media',
  YouTubeVideo = 'youtube_video',
  Article = 'article',
  Tweet = 'tweet',
  FacebookStatus = 'facebook_status',
}

export const isValidPostType = (value: string): value is PostType => isInEnum<string>(PostType)(value);
