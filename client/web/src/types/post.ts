type CommentType = {
  profile_pic: string;
  username: string;
  comment: string;
};

type PostType = {
  uploader: string;
  profile_pic: string;
  title: string;
  media?: string[];
  created_at: string;
  recipe?: string;
  instructions?: string;
  likes: number;
  saves: number;
  comments_count: number;
  comments: CommentType[];
};
export default PostType