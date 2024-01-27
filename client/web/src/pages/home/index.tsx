import Sidebar from "@components/sidebar";
import Header from "@components/header";
import CreatePost from "@/components/createPost";
import CookmatesSidebar from "@/components/cookmatesSidebar";
import Post from "@components/post";
import "./home.css";
import SEO from "@/utils/seo";
import { useCallback, useEffect, useRef, useState } from "react";
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
    const [page, setPage] = useState<number>(1);
    const [posts, setPosts] = useState<PostType[]>([]);
    const postContainerRef = useRef<HTMLDivElement>(null);
    const [isAtBottom, setIsAtBottom] = useState<boolean>(false);
    const getPosts = useCallback(async () => {
        try {
            const response = await request({
                route: `/post?page=${page}`,
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (response && response.status === 200) {
                setPosts((prev) => {
                    const newPosts = [...prev];
                    newPosts.push(...response.data.posts);
                    return newPosts;
                });
            }
        } catch (e) {
            return null;
        }
    }, [user.token, page, setPosts])

    useEffect(() => {
        const fetchData = async() =>{
            if (user.token) await getPosts();
        }
        fetchData()
    }, [user, getPosts, isAtBottom]);

     useEffect(() => {
        const handleScroll = () => {
            const newY = postContainerRef.current?.scrollTop;
            const maxScroll =(
                (postContainerRef.current?.scrollHeight || 0) -
                (postContainerRef.current?.clientHeight || 0) - 100);

                if(newY){
                    setIsAtBottom(newY >= maxScroll);
                }
        };

        if(isAtBottom){
            setPage(prev=> prev + 1)
        }

        postContainerRef.current?.addEventListener("scroll", handleScroll);
    }, [isAtBottom]);
    return (
        <div className="home-page">
            <Header />
            <div className="home-main flex">
                <Sidebar current_page="home" />
                <section
                    className="main-section flex flex-column gap-5"
                    ref={postContainerRef}
                >
                    <CreatePost />
                    <div className="posts-container flex flex-column gap-5">
                        {posts &&
                            posts.length > 0 &&
                            posts.map((post, i) => {
                                return (
                                    <Post
                                        key={i}
                                        _id={post._id}
                                        posted_by={post.posted_by}
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
