import "./cookmates.css";

import Sidebar from "@components/sidebar";
import Header from "@components/header";
import Search from "@components/search";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { request, serverURL } from "@services/request";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import default_profile_pic from "@/assets/images/default_profile_pic.png";
import Loader from "@/components/loader";
import CookmateType from "@/types/cookmate";

const Cookmates: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [cookmates, setCookmates] = useState<CookmateType[]>([]);
    const user = useSelector((state: RootState) => {
        return state.user;
    });

    // get user cookmates
    useEffect(() => {
        const getCookmates = async () => {
            try {
                if (user && user.token) {
                    setIsLoading(true)
                    const { token } = user;
                    const result = await request({
                        route: "/cookmates",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });
                    console.log(result?.data.cookmates);
                    // Update state with cookmates
                    setCookmates(result?.data.cookmates || []);
                    setIsLoading(false)
                }
            } catch (e) {
                console.log(e);
            }
        };

        getCookmates();
    }, [user]);

    return (
        <div className="cookmates-page">
            {isLoading && <Loader /> }
            <Header />
            <div className="home-main flex">
                <Sidebar current_page={"cookmates"} />
                <section className="main-section flex flex-column gap-5">
                    <div className="posts-container flex flex-column gap-5">
                        <h1>Cook Mates</h1>
                        <div className="flex gap-5 align-center justify-between">
                            <Search />
                            <Link
                                to="/pending-cookmates"
                               className="pending-cookmates-link"
                            >
                                Pending cookmates requests
                            </Link>
                        </div>
                        <div className="cookmates-wrapper">
                            <ul className="flex flex-wrap justify-center">
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
                                        <h1>You have no cookmates YET!</h1>
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

export default Cookmates;
