import { Link } from "react-router-dom";

import Search from "@components/search";
import Icon from "@components/icon";
import bell_icon from "@images/bell_icon.svg";
import message_icon from "@images/message_icon.svg";
import default_profile_pic from "@images/default_profile_pic.png";
import "./header.css";
import { useState } from "react";

const Header: React.FC = () => {
    const [isMenuClicked, setIsMenuClicked] = useState<boolean>(true)

    const showMenu = () => {
        setIsMenuClicked(!isMenuClicked)
    }

    return (
        <div className="header-wrapper">
            <div className="logo-wrapper">
                <img src="/logo.png" alt="Tabkhetna" />
            </div>

            <Search placeholder="Search for recipes, cookmates and cuisines" />

            <div className="icons-wrapper flex gap-5">
                <Link to={"/"}>
                    <Icon img={bell_icon} alt={"notifications"} />
                </Link>
                <Link to={"/"}>
                    <Icon img={message_icon} alt={"messages"} />
                </Link>
                <Link to={"/"}>
                    <img
                        className="icon"
                        src={default_profile_pic}
                        alt="profile"
                    />
                </Link>
            </div>

            <div className={`hamburger-menu ${isMenuClicked ? "clicked":""}`} onClick={showMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default Header;
