import "./profile.css";
import Header from "@components/header";
import Sidebar from "@components/sidebar";
import Post from "@components/post";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { request, serverURL } from "@/services/request";
import Loader from "@/components/loader";
import default_profile_pic from "@/assets/images/default_profile_pic.png";
import UserType from "@/types/user";
import CookmateType from "@/types/cookmate";

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
    achievements: [
        "cookester",
        "event master",
        "challenger",
        "recipe streaker",
    ],
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
    const user = useSelector((state: RootState) => {
        return state.user;
    });
    const [profileData, setProfileData] = useState<UserType>({
        _id: "",
        firstname: "",
        lastname: "",
        email: "",
        country: null,
        role: 0,
        is_online: false,
        posts: [],
        profile_pic: "",
        achievements: [],
    });
    const [topCookmates, setTopCookmates] = useState<CookmateType[]>([
        {
            _id: "",
            firstname: "",
            lastname: "",
            profile_pic: "",
            is_online: false,
        },
    ]);

    const [isLoading, setIsLoading] = useState(true);
    const getProfileData = async () => {
        try {
            if (user && user.token) {
                setIsLoading(true);
                // Fetch basic profile information first
                const { token } = user;
                const result = await request({
                    route: "/profile/",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                setProfileData(result?.data || []);
                setIsLoading(false);
            }
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    };

    const getTopCookmates = async () => {
        try {
            if (user && user.token) {
                setIsLoading(true);
                console.log("getting top cookmates");
                const { token } = user;
                const result = await request({
                    route: "/cookmates/top",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                setTopCookmates(result?.data.cookmates);
                console.log("Top cookmates", topCookmates);
                setIsLoading(false);
            }
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProfileData();
        getTopCookmates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <div className="profile-page">
            {isLoading && <Loader />}
            <Header />
            <main className="home-main flex">
                <Sidebar />
                <section className="profile-section flex flex-column gap-5">
                    <div className="profile-info-wrapper flex flex-column gap-3">
                        <img
                            className="profile-pic"
                            src={
                                `${serverURL}uploads/images/${profileData.profile_pic}` ||
                                default_profile_pic
                            }
                        />
                        <h2>
                            {profileData.firstname} {profileData.lastname}
                        </h2>
                    </div>

                    <div className="achievements-wrapper flex align-center gap-5">
                        <div className="flex flex-column align-center">
                            <img
                                loading="lazy"
                                src={"src/assets/images/star_icon.svg"}
                                alt="⭐"
                            />
                            <h2>Achievements</h2>
                        </div>
                        {profileData.achievements &&
                        profileData.achievements.length > 0 ? (
                            <ul className="achievements-list">
                                {data.achievements.map((achievement, index) => {
                                    return <li key={index}>{achievement}</li>;
                                })}
                            </ul>
                        ) : (
                            <p>Haven't achieved any yet!</p>
                        )}
                    </div>

                    <div className="profile-main gap-5">
                        <div className="posts-container flex flex-column gap-5">
                            {profileData.posts &&
                            profileData.posts.length > 0 ? (
                                profileData.posts.map((post) => {
                                    return (
                                        <Post
                                            key={post.title + post.uploader}
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
                                })
                            ) : (
                                <div className="no-posts-headline">
                                    Haven't Posted Yet
                                </div>
                            )}
                        </div>
                        <div className="profile-cookmates-wrapper flex flex-column gap-5">
                            <h2>
                                {profileData.firstname} {profileData.lastname}'s
                                Cookmates
                            </h2>
                            <div className="cookmates-number flex align-center gap-3">
                                <img
                                    src="/src/assets/images/cookmates_icon.svg"
                                    alt="cookmates icon"
                                />
                                <p>{topCookmates.length} cookmate(s)</p>
                            </div>
                            {topCookmates && topCookmates.length > 0 ? (
                                <ul className="profile-cookmates-list">
                                    {topCookmates.map((cookmate) => {
                                        return (
                                            <li key={cookmate._id}>
                                                <Link
                                                    to={`/user/${cookmate._id}`}
                                                    className="flex align-center"
                                                >
                                                    <img
                                                        loading="lazy"
                                                        src={`${serverURL}uploads/images/${cookmate.profile_pic}`}
                                                        alt="pic"
                                                    />
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
                            <Link to={`/cookmates`}>
                                See All {">"}
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Profile;
