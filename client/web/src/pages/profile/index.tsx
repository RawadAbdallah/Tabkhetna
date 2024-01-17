import "./profile.css";
import Header from "@components/header";
import Sidebar from "@components/sidebar";
import Post from "@components/post";

import { Link } from "react-router-dom";

const data = {
  id: 1,
    profile_pic: "./src/assets/images/default_profile_pic.png",
    firstname: "Rawad",
    lastname: "Abdallah",
    posts: [
        {
            uploader: "Rawad Abdallah",
            profile_pic: "src/assets/images/default_profile_pic.png",
            created_at: "2 hours ago",
            title: "This is a test post for the home page.",
            ingredients: "This is a ingredients",
            instructions: "Instructions are: cook and egg",
            media: [
                "src/assets/images/register-background.png",
                "src/assets/images/login-background.png",
            ],
            likes: 10,
            saves: 5,
            comments: [
                {
                    profile_pic: "src/assets/images/default_profile_pic.png",
                    username: "Mohammad Ali",
                    comment: "Not bad",
                },
            ],
        },

        {
            uploader: "Rawad Abdallah",
            profile_pic: "src/assets/images/default_profile_pic.png",
            created_at: "2 hours ago",
            title: "This is a test post for the home page.",
            instructions: "Instructions are: cook and egg",
            media: [
                "src/assets/images/register-background.png",
                "src/assets/images/login-background.png",
            ],
            likes: 10,
            saves: 5,
            comments: [
                {
                    profile_pic: "src/assets/images/default_profile_pic.png",
                    username: "Mohammad Ali",
                    comment: "Not bad",
                },
            ],
        },
    ],
    achievements: [],
    cookmates: [
        {
            id: "1",
            profile_pic: "/src/assets/images/default_profile_pic.png",
            firstname: "Ali",
            lastname: "Abdallah",
            is_online: true,
            last_online: "",
        },

        {
            id: "2",
            profile_pic: "/src/assets/images/default_profile_pic.png",
            firstname: "Mo",
            lastname: "Salah",
            is_online: false,
            last_online: "10 min",
        },

        {
            id: "3",
            profile_pic: "/src/assets/images/default_profile_pic.png",
            firstname: "Ammar",
            lastname: "Zo",
            is_online: true,
        },

        {
            id: "4",
            profile_pic: "/src/assets/images/default_profile_pic.png",
            firstname: "Khaled",
            lastname: "Chadad",
            is_online: false,
            last_online: "1 day",
        },
        {
            id: "5",
            profile_pic: "/src/assets/images/default_profile_pic.png",
            firstname: "Mo",
            lastname: "Salah",
            is_online: false,
            last_online: "10 min",
        },

        {
            id: "6",
            profile_pic: "/src/assets/images/default_profile_pic.png",
            firstname: "Ammar",
            lastname: "Zo",
            is_online: true,
        },

        {
            id: "7",
            profile_pic: "/src/assets/images/default_profile_pic.png",
            firstname: "Khaled",
            lastname: "Chadad",
            is_online: false,
            last_online: "1 day",
        },
    ],
};

const Profile: React.FC = () => {
    return (
        <div className="home-page">
            <Header />
            <main className="home-main flex">
                <Sidebar />
                <section className="profile-section flex flex-column gap-5">
                    <div className="profile-info-wrapper flex flex-column gap-3">
                        <img className="profile-pic" src={data.profile_pic} />
                        <h2>
                            {data.firstname} {data.lastname}
                        </h2>
                    </div>
                    <div className="achievements-wrapper flex align-center">
                        <div className="flex flex-column align-center">
                            <img
                                src={"src/assets/images/star_icon.svg"}
                                alt="⭐"
                            />
                            <h2>Achievements</h2>
                        </div>
                        {data.achievements.length > 0 ? (
                            <ul className="achievements-list">
                                {data.achievements.map((item) => {
                                    return <li>{item}</li>;
                                })}
                            </ul>
                        ) : (
                            <p>Haven't achieved any yet!</p>
                        )}
                    </div>
                    <div className="profile-main gap-5">
                        <div className="posts-container flex flex-column gap-5">
                            {data.posts.map((post, i) => {
                                return (
                                    <Post
                                        key={i}
                                        title={post.title}
                                        uploader={post.uploader}
                                        profile_pic={post.profile_pic}
                                        created_at={post.created_at}
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
                        <div className="profile-cookmates-wrapper flex flex-column gap-5">
                            <h2>
                                {data.firstname} {data.lastname}'s Cookmates
                            </h2>
                            <div className="cookmates-number flex align-center gap-3">
                                <img
                                    src="/src/assets/images/cookmates_icon.svg"
                                    alt="cookmates icon"
                                />
                                <p>{data.cookmates.length} cookmates</p>
                            </div>
                            {data.cookmates.length > 0 ? (
                                    <ul className="profile-cookmates-list">
                                        {data.cookmates.map((cookmate, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link
                                                        to={`/user/${cookmate.id}`}
                                                        className="flex align-center"
                                                    >
                                                      <img src={cookmate.profile_pic} alt="pic"/>
                                                        {cookmate.firstname}{" "}
                                                        {cookmate.lastname}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                            ) : (
                                <p> No cookmates yet!</p>
                            )}
                            <Link to={`/profile/${data.id}/cookmates`}>See All {'>'}</Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Profile;
