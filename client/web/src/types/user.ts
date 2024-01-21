import PostType from "./post";

type UserType = {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    country?: string | null;
    role: number;
    is_online: boolean;
    posts?: Array<PostType>;
    profile_pic?: string;
    achievements?: Array<string>
};

export default UserType
