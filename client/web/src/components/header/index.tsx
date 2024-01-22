import { Link } from "react-router-dom";

import Search from "@components/search";
import Icon from "@components/icon";
import bell_icon from "@images/bell_icon.svg";
import message_icon from "@images/message_icon.svg";
import default_profile_pic from "@images/default_profile_pic.png";
import "./header.css";
import { useState } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { serverURL } from "@/services/request";

const Header: React.FC = () => {
    const [isMenuClicked, setIsMenuClicked] = useState<boolean>(false);
    const user = useSelector((state: RootState) => {
        return state.user;
    });
    const showMenu = () => {
        setIsMenuClicked(!isMenuClicked);
    };

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
                <Link to={"/"}>
                    <Icon img={message_icon} alt={"messages"} />
                </Link>
                <Link to={`/profile/${user.id}`}>
                    <img
                        className="icon"
                        src={`${serverURL}uploads/images/${user.profile_pic}` || default_profile_pic}
                        alt="profile"
                    />
                </Link>
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
