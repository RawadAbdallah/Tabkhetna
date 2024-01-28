import Header from "@/components/header";
import "./search.css";
import Sidebar from "@/components/sidebar";
import CookmatesSidebar from "@/components/cookmatesSidebar";
import { useSelector } from "react-redux";
import { request } from "@/services/request";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import PostType from "@/types/post";
import Post from "@/components/post";
import UserType from "@/types/user";

const Search = () => {
    const user = useSelector((state: RootState) => state.user);
    const [posts, setPosts] = useState<PostType[]>([]);
    const [users, setUsers] = useState<UserType[]>([])
    const [searchParams, setSearchParams] = useState(
        new URLSearchParams(location.search)
    );
    const query = searchParams.get("q");
    useEffect(() => {
        const searchPosts = async () => {
            try {
                console.log("Route: ", `/post/search?q=${query}`);
                const response = await request({
                    route: `/post/search?q=${query}`,
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        "Content-type": "application/json",
                    },
                });

                if (response && response.status === 200) {
                    setPosts(response.data.posts);
                }
            } catch (e) {
                console.log(e);
            }
        };

        const searchUsers = async () => {
            try {
                const response = await request({
                    route: `/profile/search?q=${query}`,
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        "Content-type": "application/json",
                    },
                });
                if(response && response.status === 200){
                  setUsers(response.data)
                }
            } catch (e) {
                console.log(e);
            }
        }; 

        console.log(users)

        if (user.token) {
            searchUsers();
            searchPosts();
        }
        setSearchParams(new URLSearchParams(location.search));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, query, location.search]);
    useEffect(() => {
        console.log("POSTS", posts);
    }, [posts]);
    return (
        <div className="search-page">
            <Header />
            <div className="search-main flex">
                <Sidebar />
                <section className="main-section flex flex-column gap-5">
                    <h1>Search results for: {query}</h1>
                    {
                      users &&
                      users.length > 0 &&
                      users.map(user => {
                        return <>
                          {user.firstname} {user.lastname}
                        </>
                      })
                    }
                    {posts &&
                        posts.length > 0 &&
                        posts.map((post: PostType, i: number) => {
                            return (
                                <div
                                    className="posts-container"
                                    key={post._id + i}
                                >
                                    <h2>Posts</h2>
                                    <Post
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
                                </div>
                            );
                        })}
                </section>
                <CookmatesSidebar />
            </div>
        </div>
    );
};

export default Search;
