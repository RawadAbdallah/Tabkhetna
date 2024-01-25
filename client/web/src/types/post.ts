import CommentType from "./comment";
import UserType from "./user";

type PostType = {
  _id: string,
  uploader: string;
  posted_by: string;
  profile_pic?: string;
  title: string;
  media?: string[];
  createdAt: string;
  ingredients?: string;
  instructions?: string;
  likes: UserType[];
  saves: UserType[];
  comments: CommentType[];
};
export default PostType