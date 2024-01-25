import Header from "@/components/header";
import "./savedRecipes.css";
import Sidebar from "@/components/sidebar";
import Post from "@components/post";
import CookmatesSidebar from "@/components/cookmatesSidebar";
import PostType from "@/types/post";
import { useEffect, useState } from "react";
import { request } from "@services/request";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const SavedRecipes = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const user = useSelector((state: RootState) => state.user);
    const getSavedPosts = async () => {
        try {
            console.log("TOKEN ", user.token);
            const response = await request({
                route: `/post/save/all`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if (response && response.status === 200) setPosts(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        try {
            if (user.token) getSavedPosts();
        } catch (e) {
            console.log(e);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <div className="saved-recipes-page">
            <Header />
            <main className="main-saved-recipes flex">
                <Sidebar current_page="savedRecipes" />
                <div className="main-saved-recipes-section">
                    <h1>Saved Recipes</h1>
                    <section className="main-section flex flex-column gap-5">
                        <div className="posts-container flex flex-column gap-5">
                            {posts &&
                                posts.length > 0 &&
                                posts.map((post: PostType, i: number) => {
                                    return (
                                        <Post
                                            key={i}
                                            _id={post._id}
                                            title={post.title}
                                            posted_by={post.posted_by}
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
                </div>
                <CookmatesSidebar />
            </main>
        </div>
    );
};

export default SavedRecipes;
