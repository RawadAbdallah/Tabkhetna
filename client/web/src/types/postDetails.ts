type PostDetails = {
    title: string;
    description: string,
    ingredients?: string;
    instructions?: string;
    cuisine: string;
    media?: File[];
};

export default PostDetails