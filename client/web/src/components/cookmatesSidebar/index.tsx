import { request, serverURL } from "@/services/request";
import "./cookmatesSidebar.css";
import Search from "@components/search";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CookmateType from "@/types/cookmate";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import default_profile_pic from "@images/default_profile_pic.png"

const CookmatesSidebar: React.FC = () => {
    const [topCookmates, setTopCookmates] = useState<CookmateType[]>([]);
    const user = useSelector((state: RootState) => {
        return state.user;
    });
    const getTopCookmates = async () => {
        try {
            if (user && user.token) {
                const { token } = user;
                const result = await request({
                    route: `/cookmates/top/${user.id}`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                });
                setTopCookmates(result?.data.cookmates);
            }
        } catch (e) {
            console.log(e);
        }
    };
    // get user cookmates
    useEffect(() => {
        getTopCookmates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <div className="cookmates-sidebar">
            <Search />
            <h2>Cookmates</h2>
            {topCookmates &&
                topCookmates.map((cookmate, index) => {
                    const username =
                        cookmate.firstname + " " + cookmate.lastname;
                    return (
                        <div
                            className="cookmate flex align-center justify-between gap-5"
                            key={index}
                        >
                            <Link to={`/profile/${cookmate._id}`}>
                                <div className="flex align-center gap-5">
                                    <img
                                        src={`${serverURL}uploads/images/${cookmate.profile_pic}`}
                                        onError={(e) => {
                                            const imgElement =
                                                e.target as HTMLImageElement;
                                            if (imgElement) {
                                                imgElement.onerror = null;
                                                imgElement.src =
                                                    default_profile_pic;
                                            }
                                        }}
                                        alt={username + "'s pic"}
                                    />
                                    <p>{username}</p>
                                </div>
                            </Link>
                            <div className="online-status">
                                {cookmate.is_online ? (
                                    <div className="online-circle"></div>
                                ) : (
                                    <p>{cookmate.last_online}</p>
                                )}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default CookmatesSidebar;
