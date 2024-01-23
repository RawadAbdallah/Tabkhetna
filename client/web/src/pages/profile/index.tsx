import "./profile.css";
import Header from "@components/header";
import Sidebar from "@components/sidebar";
import Post from "@components/post";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { request, serverURL } from "@/services/request";
import Loader from "@/components/loader";
import default_profile_pic from "@/assets/images/default_profile_pic.png";
import UserType from "@/types/user";
import CookmateType from "@/types/cookmate";
import starIcon from "@images/star_icon.svg";

const Profile: React.FC = () => {
    const user = useSelector((state: RootState) => {
        return state.user;
    });
    const { userId } = useParams();
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

                // Use userId from params if available, otherwise use current user's ID
                const idToFetch = userId;

                const { token } = user;
                const result = await request({
                    route: `/profile/${idToFetch}`, // Use the appropriate route to fetch user data by ID
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
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
                const { token } = user;
                const result = await request({
                    route: `/cookmates/top/${userId}`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                });
                setTopCookmates(result?.data.cookmates);
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
        console.log(topCookmates);
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
                            src={`${serverURL}uploads/images/${profileData.profile_pic}`}
                            onError={(e) => {
                                const imgElement = e.target as HTMLImageElement;
                                if (imgElement) {
                                    imgElement.onerror = null;
                                    imgElement.src = default_profile_pic;
                                }
                            }}
                        />
                        <h2>
                            {profileData.firstname} {profileData.lastname}
                        </h2>
                    </div>

                    <div className="achievements-wrapper flex align-center gap-5">
                        <div className="flex flex-column align-center">
                            <img loading="lazy" src={starIcon} alt="⭐" />
                            <h2>Achievements</h2>
                        </div>
                        {profileData.achievements &&
                        profileData.achievements.length > 0 ? (
                            <ul className="achievements-list">
                                {profileData.achievements.map(
                                    (achievement, index) => {
                                        return (
                                            <li key={index}>{achievement}</li>
                                        );
                                    }
                                )}
                            </ul>
                        ) : (
                            <p>Hasn't achieved any yet!</p>
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
                                <div className="no-posts-headline flex align-center justify-center">
                                    Hasn't Posted Yet
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
                                                    to={`/profile/${cookmate._id}`}
                                                    className="flex align-center"
                                                >
                                                    <img
                                                        loading="lazy"
                                                        src={`${serverURL}uploads/images/${cookmate.profile_pic}`}
                                                        onError={(e) => {
                                                            const imgElement =
                                                                e.target as HTMLImageElement;
                                                            if (imgElement) {
                                                                imgElement.onerror =
                                                                    null;
                                                                imgElement.src =
                                                                    default_profile_pic;
                                                            }
                                                        }}
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
                            <Link to={`/cookmates`}>See All {">"}</Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Profile;
