import Sidebar from "@components/sidebar";
import Header from "@components/header";
import CreatePost from "@/components/createPost";
import CookmatesSidebar from "@/components/cookmatesSidebar";
import Post from "@components/post";
import "./home.css";
import SEO from "@/utils/seo";
import { useEffect, useState } from "react";
import PostType from "@/types/post";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { request } from "@/services/request";

const Home: React.FC = () => {
    SEO({
        title: "Tabkhetna",
        description: "Tabkhetna's home page",
    });
    const user = useSelector((state: RootState) => state.user);
    const [scrollPage, setScrollPage] = useState<number>(1);
    const [posts, setPosts] = useState<PostType[]>([]);
    console.log(posts.length)
    const getPosts = async () => {
        try {
            const response = await request({
                route: `/post?page=${scrollPage}`,
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (response && response.status === 200) {
                setPosts((prev) => {
                    const newPosts = [...prev]
                    newPosts.push(...response.data.posts)
                    return newPosts
                 });
            }

            console.log("POSTS", [...posts])
        } catch (e) {
            return null;
        }
    };

    useEffect(() => {
        if (user.token) getPosts();
    }, [user]);
    return (
        <div className="home-page">
            <Header />
            <div className="home-main flex">
                <Sidebar current_page="home" />
                <section className="main-section flex flex-column gap-5">
                    <CreatePost />
                    <div className="posts-container flex flex-column gap-5">
                        {posts && posts.length > 0 &&
                            posts.map((post, i) => {
                                return (
                                    <Post
                                        key={i}
                                        _id={post._id}
                                        title={post.title}
                                        uploader={post.uploader}
                                        profile_pic={post.profile_pic}
                                        createdAt={post.createdAt}
                                        media={post.media}
                                        likes={post.likes}
                                        saves={post.saves}
                                        comments={post.comments}
                                        ingredients={post.ingredients}
                                        instructions={post.instructions}
                                    />
                                );
                            })}
                    </div>
                </section>
                <CookmatesSidebar />
            </div>
        </div>
    );
};

export default Home;
