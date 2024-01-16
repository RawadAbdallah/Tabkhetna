import { Link } from "react-router-dom";

import Icon from "@components/icon";
import home_icon from "@images/home_icon.svg";
import question_icon from "@images/question_icon.svg";
import book_icon from "@images/book_icon.svg";
import cookmates_icon from "@images/cookmates_icon.svg";
import challenge_icon from "@images/challenge_icon.svg";
import calendar_icon from "@images/calendar_icon.svg";

import "./sidebar.css";

type SidebarPropType = {
    current_page?: string,
}

const Sidebar: React.FC<SidebarPropType> = ({current_page}) => {
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
                <li className={`sidebar-item ${current_page && current_page === "recipes" ? "active" : ""}`}>
                    <Link to="/recipes/saved" className="sidebar-link">
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
                <li className={`sidebar-item ${!current_page && current_page === "events" ? "active" : ""}`}>
                    <Link to="/profile" className="sidebar-link">
                        <Icon img={calendar_icon} alt="events" />
                        Events
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
