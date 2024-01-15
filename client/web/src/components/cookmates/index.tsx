import "./cookmates.css";
import Search from "../search";

const cookmates = [
    {
        profile_pic: "/src/assets/images/default_profile_pic.png",
        firstname: "Ali",
        lastname: "Abdallah",
        is_online: true,
        last_online: "",
    },

    {
        profile_pic: "/src/assets/images/default_profile_pic.png",
        firstname: "Mo",
        lastname: "Salah",
        is_online: false,
        last_online: "10 min",
    },

    {
        profile_pic: "/src/assets/images/default_profile_pic.png",
        firstname: "Ammar",
        lastname: "Zo",
        is_online: true,
    },

    {
        profile_pic: "/src/assets/images/default_profile_pic.png",
        firstname: "Khaled",
        lastname: "Chadad",
        is_online: false,
        last_online: "1 day",
    },
    {
        profile_pic: "/src/assets/images/default_profile_pic.png",
        firstname: "Mo",
        lastname: "Salah",
        is_online: false,
        last_online: "10 min",
    },

    {
        profile_pic: "/src/assets/images/default_profile_pic.png",
        firstname: "Ammar",
        lastname: "Zo",
        is_online: true,
    },

    {
        profile_pic: "/src/assets/images/default_profile_pic.png",
        firstname: "Khaled",
        lastname: "Chadad",
        is_online: false,
        last_online: "1 day",
    },
];

const Cookmates: React.FC = () => {
    return (
        <div className="cookmates flex flex-column">
            <Search />
            <h2>Cookmates</h2>
            {cookmates &&
                cookmates.map((cookmate) => {
                    const username =
                        cookmate.firstname + " " + cookmate.lastname;
                    return (
                        <div className="cookmate flex align-center gap-5">
                            <img
                                src={cookmate.profile_pic}
                                alt={username + "'s pic"}
                            />
                            <p>{username}</p>
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

export default Cookmates;
