import "./cookmates-sidebar.css";
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

const CookmatesSidebar: React.FC = () => {
    return (
        <div className="cookmates-sidebar">
            <Search />
            <h2>Cookmates</h2>
            {cookmates &&
                cookmates.map((cookmate, index) => {
                    const username =
                        cookmate.firstname + " " + cookmate.lastname;
                    return (
                        <div
                            className="cookmate flex align-center justify-between gap-5"
                            key={index}
                        >
                            <Link to={`/profile/${cookmate.id}`}>
                                <div className="flex align-center gap-5">
                                    <img
                                        src={cookmate.profile_pic}
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
