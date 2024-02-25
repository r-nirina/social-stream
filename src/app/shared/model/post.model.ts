export interface Post {
  id: number;
  timestamp: number;
}

export interface Pin extends Post {
  title: string;
  description: string;
  links: string;
  likes: number;
  comments: number;
  saves: number;
  repins: number;
  post_id: string;
}
export interface InstagramMedia extends Post {
  text: string;
  link: string;
  type: string;
  location_name: string;
  likes: number;
  comments: number;
  post_id: string;
  views: number;
  mtype: number;
  thumbnail_url: string;
  hidden_likes: boolean;
  plays: number;
}
export interface YouTubeVideo extends Post {
  name: string;
  description: string;
  link: string;
  views: number;
  comments: number;
  likes: number;
  dislikes: number;
  post_id: string;
}
export interface Article extends Post {
  title: string;
  description: string;
  url: string;
  content: string;
}
export interface Tweet extends Post {
  content: string;
  retweets: number;
  favorites: number;
  post_id: string;
  is_retweet: boolean;
  comments: number;
}
export interface FacebookStatus extends Post {}
