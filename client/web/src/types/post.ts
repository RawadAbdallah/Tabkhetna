import CommentType from "./comment";
import UserType from "./user";

type PostType = {
  _id: string,
  uploader: string;
  profile_pic?: string;
  title: string;
  media?: string[];
  createdAt: string;
  ingredients?: string;
  instructions?: string;
  likes: UserType[];
  saves: number;
  comments: CommentType[];
};
export default PostType