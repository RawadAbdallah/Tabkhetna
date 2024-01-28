import { Link, useNavigate } from "react-router-dom";

import Search from "@components/search";
import Icon from "@components/icon";
import message_icon from "@images/message_icon.svg";
import default_profile_pic from "@images/default_profile_pic.png";
import home_icon from "@images/home_icon.svg";
import question_icon from "@images/question_icon.svg";
import book_icon from "@images/book_icon.svg";
import cookmates_icon from "@images/cookmates_icon.svg";
import challenge_icon from "@images/challenge_icon.svg";
import "./header.css";
import { useEffect, useState } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { serverURL } from "@/services/request";

type SidebarPropType = {
    current_page?: string;
};

const Header: React.FC<SidebarPropType> = ({ current_page }) => {
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
        localStorage.removeItem("tabkhetna_user");
        navigate("/auth");
    };
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
            <div
                className={`mobile-header-menu ${
                    isMenuClicked ? "show-menu" : ""
                }`}
            >
                <ul>
                    <li
                        className={`sidebar-item ${
                            current_page && current_page === "home"
                                ? "active"
                                : ""
                        }`}
                    >
                        <Link to="/" className="sidebar-link">
                            <Icon img={home_icon} alt="home" />
                            Home
                        </Link>
                    </li>
                    <li
                        className={`sidebar-item ${
                            current_page && current_page === "cookmates"
                                ? "active"
                                : ""
                        }`}
                    >
                        <Link to="/cookmates" className="sidebar-link">
                            <Icon img={cookmates_icon} alt="cookmates" />
                            Cookmates
                        </Link>
                    </li>
                    <li className={`sidebar-item`}>
                        <Link to="/messages" className="sidebar-link">
                            <Icon img={message_icon} alt="messages" />
                            Messages
                        </Link>
                    </li>
                    <li
                        className={`sidebar-item ${
                            current_page && current_page === "savedRecipes"
                                ? "active"
                                : ""
                        }`}
                    >
                        <Link to="/savedRecipes" className="sidebar-link">
                            <Icon img={book_icon} alt="recipes" />
                            Saved Recipes
                        </Link>
                    </li>
                    <li
                        className={`sidebar-item ${
                            current_page && current_page === "profile"
                                ? "active"
                                : ""
                        }`}
                    >
                        <Link
                            to={`/profile/${user.id}`}
                            className="sidebar-link"
                        >
                            <Icon
                                img={`${serverURL}uploads/images/${user.profile_pic}`}
                                alt="profile"
                            />
                            Profile
                        </Link>
                    </li>
                    <li
                        className={`sidebar-item ${
                            current_page && current_page === "challenges"
                                ? "active"
                                : ""
                        }`}
                    >
                        <Link to="/challenges" className="sidebar-link">
                            <Icon img={challenge_icon} alt="challenges" />
                            Challenges
                        </Link>
                    </li>

                    <div className="line-seperator"></div>

                    <li
                        className={`sidebar-item ${
                            current_page && current_page === "support"
                                ? "active"
                                : ""
                        }`}
                    >
                        <Link to="/support" className="sidebar-link">
                            <Icon img={question_icon} alt="?" />
                            Support
                        </Link>
                    </li>
                    <li>
                        {" "}
                        <p>
                            Copyrights &copy; 2024 All rights reserved by
                            Tabkhetna
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
