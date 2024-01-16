import "./cookmates.css";

import Sidebar from "@components/sidebar";
import Header from "@components/header";
import Search from "@components/search";
import { Link } from "react-router-dom";

const cookmates = [
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
];

const Cookmates: React.FC = () => {
    return (
        <div className="cookmates-page">
            <Header />
            <div className="home-main flex">
                <Sidebar current_page={"cookmates"} />
                <section className="main-section flex flex-column gap-5">
                    <div className="posts-container flex flex-column gap-5">
                        <h1>Cook Mates</h1>
                        <Search />
                        <div className="cookmates-wrapper">
                            <ul className="flex flex-wrap justify-center">
                                {cookmates.length > 0 ? (
                                    cookmates.map((cookmate) => {
                                        return (
                                            <li key={cookmate.id}>
                                                <div className="user-card">
                                                    <img
                                                        src={
                                                            cookmate.profile_pic
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
                                                        to={`/profile/${cookmate.id}`}
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
