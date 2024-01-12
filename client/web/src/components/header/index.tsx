import { Link } from "react-router-dom";

import Search from "../search";
import Icon from "../icon";
import bell_icon from "../../assets/images/bell_icon.svg";
import message_icon from "../../assets/images/message_icon.svg";
import default_profile_pic from "../../assets/images/default_profile_pic.png";
import "./header.css";

const Header: React.FC = () => {
    return (
        <div className="header-wrapper">
            <div className="logo-wrapper">
                <img src="logo.png" alt="Tabkhetna" />
            </div>

            <div className="search-wrapper">
                <Search />
            </div>

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
        </div>
    );
};

export default Header;
