import { Link, useNavigate } from "react-router-dom";

import Search from "@components/search";
import Icon from "@components/icon";
import bell_icon from "@images/bell_icon.svg";
import message_icon from "@images/message_icon.svg";
import default_profile_pic from "@images/default_profile_pic.png";
import "./header.css";
import { useEffect, useState } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { serverURL } from "@/services/request";

const Header: React.FC = () => {
    const [isMenuClicked, setIsMenuClicked] = useState<boolean>(false);
    const [showCard, setShowCard] = useState(false);
    const navigate = useNavigate();
    const handleMouseEnter = () => {
        setShowCard(true);
    };

    const handleMouseLeave = () => {
        setShowCard(false);
    };
    const user = useSelector((state: RootState) => {
        return state.user;
    });

    const handleLogout = () => {
        localStorage.removeItem("tabkhetna_user")
        navigate('/auth')
    }
    const showMenu = () => {
        setIsMenuClicked(!isMenuClicked);
    };

    useEffect(() => {}, [user]);
    return (
        <div className="header-wrapper">
            <Link to={"/"} className="logo-wrapper">
                <div>
                    <img src="/logo.png" alt="Tabkhetna" />
                </div>
            </Link>

            <Search placeholder="Search for recipes, cookmates and cuisines" />

            <div className="icons-wrapper flex gap-5">
                <Link to={"/"}>
                    <Icon img={bell_icon} alt={"notifications"} />
                </Link>
                <Link to={"/messages"}>
                    <Icon img={message_icon} alt={"messages"} />
                </Link>
                <div
                    className="profile-icon-container"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <Link to={`/profile/${user.id}`}>
                        <img
                            className="icon"
                            src={`${serverURL}uploads/images/${user.profile_pic}`}
                            onError={(e) => {
                                const imgElement = e.target as HTMLImageElement;
                                if (imgElement) {
                                    imgElement.onerror = null;
                                    imgElement.src = default_profile_pic;
                                }
                            }}
                            alt="profile"
                        />
                    </Link>
                    {showCard && (
                        <div className="profile-card">
                            <button
                                onClick={() => {
                                    navigate(`/profile/${user.id}`);
                                }}
                            >
                                View Profile
                            </button>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>

            <div
                className={`hamburger-menu ${isMenuClicked ? "clicked" : ""}`}
                onClick={showMenu}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default Header;
