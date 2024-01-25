import "./pendingCookmates.css";

import Sidebar from "@components/sidebar";
import Header from "@components/header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { request, serverURL } from "@services/request";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import default_profile_pic from "@/assets/images/default_profile_pic.png";
import Loader from "@/components/loader";
import CookmateType from "@/types/cookmate";

const PendingCookmates: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [cookmates, setCookmates] = useState<CookmateType[]>([]);
    const user = useSelector((state: RootState) => {
        return state.user;
    });
    // get user cookmates
    useEffect(() => {
        const getPendingCookmates = async () => {
            try {
                if (user && user.token) {
                    setIsLoading(true);
                    const { token } = user;
                    const result = await request({
                        route: "/cookmates/pending",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });
                    console.log(result?.data);
                    // Update state with cookmates
                    setCookmates(result?.data || []);
                    setIsLoading(false);
                }
            } catch (e) {
                console.log(e);
            }
        };

        getPendingCookmates();
    }, [user]);

    const acceptCookmate = async (cookmateId:string) => {
        try {
            const response = await request({
                route: `/cookmates/accept/${cookmateId}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log(response)

        } catch (e) {}
    };

    return (
        <div className="cookmates-page">
            {isLoading && <Loader />}
            <Header />
            <div className="home-main flex">
                <Sidebar current_page={""} />
                <section className="main-section flex flex-column gap-5">
                    <div className="posts-container flex flex-column gap-5">
                        <h1>Cookmates Pending Requests</h1>
                        <div className="cookmates-wrapper">
                            <ul className="flex flex-wrap gap-5">
                                {cookmates && cookmates.length > 0 ? (
                                    cookmates.map((cookmate) => {
                                        return (
                                            <li key={cookmate._id}>
                                                <div className="user-card">
                                                    <img
                                                        src={
                                                            `${serverURL}uploads/images/${cookmate.profile_pic}` ||
                                                            default_profile_pic
                                                        }
                                                        alt={
                                                            cookmate.firstname +
                                                            "'s profile pic"
                                                        }
                                                    />
                                                    <h2>
                                                        {cookmate.firstname}{" "}
                                                        {cookmate.lastname}
                                                    </h2>
                                                    <div className="cookmate-request-buttons flex gap-5">
                                                        <button
                                                            onClick={() =>
                                                                acceptCookmate(
                                                                    cookmate._id
                                                                )
                                                            }
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                rejectCookmate(
                                                                    cookmate._id
                                                                )
                                                            }
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                    <Link
                                                        to={`/profile/${cookmate._id}`}
                                                        className={
                                                            "cookmate-link"
                                                        }
                                                    >
                                                        view profile
                                                    </Link>
                                                </div>
                                            </li>
                                        );
                                    })
                                ) : (
                                    <div className="no-cookmates">
                                        <h1>
                                            You have no pending cookmate
                                            requests
                                        </h1>
                                    </div>
                                )}
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PendingCookmates;
