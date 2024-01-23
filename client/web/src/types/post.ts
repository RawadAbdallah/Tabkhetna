import CommentType from "./comment";

type PostType = {
  uploader: string;
  profile_pic: string;
  title: string;
  media?: string[];
  created_at: string;
  ingredients?: string;
  instructions?: string;
  likes: number;
  saves: number;
  comments: CommentType[];
};
export default PostType