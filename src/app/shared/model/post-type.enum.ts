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

export const postTypeLabel = (postType: PostType): string => {
  switch (postType) {
    case PostType.Pin:
      return 'Pin';
    case PostType.InstagramMedia:
      return 'Instagram Media';
    case PostType.YouTubeVideo:
      return 'YouTube Video';
    case PostType.Article:
      return 'Article';
    case PostType.Tweet:
      return 'Tweet';
    case PostType.FacebookStatus:
      return 'Facebook Status';
  }
};
