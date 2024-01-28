import { Link } from "react-router-dom";

import Icon from "@components/icon";
import home_icon from "@images/home_icon.svg";
import question_icon from "@images/question_icon.svg";
import book_icon from "@images/book_icon.svg";
import cookmates_icon from "@images/cookmates_icon.svg";
import challenge_icon from "@images/challenge_icon.svg";
import calendar_icon from "@images/calendar_icon.svg";
import { useSelector } from "react-redux";
import "./sidebar.css";
import { RootState } from "@/store";
import { serverURL } from "@/services/request";

type SidebarPropType = {
    current_page?: string,
}

const Sidebar: React.FC<SidebarPropType> = ({current_page}) => {
    const user = useSelector((state:RootState) => state.user)
    return (
        <div className="sidebar">
            <ul className="sidebar-items">
                <li className={`sidebar-item ${current_page && current_page === "home" ? "active" : ""}`}>
                    <Link to="/" className="sidebar-link">
                        <Icon img={home_icon} alt="home" />
                        Home
                    </Link>
                </li>
                <li className={`sidebar-item ${current_page && current_page === "cookmates" ? "active" : ""}`}>
                    <Link to="/cookmates" className="sidebar-link">
                        <Icon img={cookmates_icon} alt="cookmates" />
                        Cookmates
                    </Link>
                </li>
                <li className={`sidebar-item ${current_page && current_page === "savedRecipes" ? "active" : ""}`}>
                    <Link to="/savedRecipes" className="sidebar-link">
                        <Icon img={book_icon} alt="recipes" />
                        Saved Recipes
                    </Link>
                </li>
                <li className={`sidebar-item ${current_page && current_page === "challenges" ? "active" : ""}`}>
                    <Link to="/challenges" className="sidebar-link">
                        <Icon img={challenge_icon} alt="challenges" />
                        Challenges
                    </Link>
                </li>
                <li className={`sidebar-item ${current_page && current_page === "profile" ? "active" : ""}`}>
                    <Link to={`/profile/${user.id}`} className="sidebar-link">
                        <Icon img={`${serverURL}uploads/images/${user.profile_pic}`} alt="profile" />
                        Profile
                    </Link>
                </li>

                <div className="line-seperator"></div>

                <li className={`sidebar-item ${current_page && current_page === "support" ? "active" : ""}`}>
                    <Link to="/support" className="sidebar-link">
                        <Icon img={question_icon} alt="?" />
                        Support
                    </Link>
                </li>

            <div className="sidebar-footer">
              <p>
              Copyrights &copy; 2024 All rights reserved by Tabkhetna
              </p>
            </div>
            </ul>
        </div>
    );
};

export default Sidebar;
