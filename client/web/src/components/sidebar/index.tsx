import { Link } from "react-router-dom";

import Icon from "../../components/icon";
import home_icon from "../../assets/images/home_icon.svg";
import question_icon from "../../assets/images/question_icon.svg";
import book_icon from "../../assets/images/book_icon.svg";
import cookmates_icon from "../../assets/images/cookmates_icon.svg";
import challenge_icon from "../../assets/images/challenge_icon.svg";
import calendar_icon from "../../assets/images/calendar_icon.svg";

import "./sidebar.css";


const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <ul className="sidebar-items">
                <li className="sidebar-item active">
                    <Link to="/" className="sidebar-link">
                        <Icon img={home_icon} alt="home" />
                        Home
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/cookmates" className="sidebar-link">
                        <Icon img={cookmates_icon} alt="cookmates" />
                        Cookmates
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/recipes/saved" className="sidebar-link">
                        <Icon img={book_icon} alt="recipes" />
                        Saved Recipes
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/challenges" className="sidebar-link">
                        <Icon img={challenge_icon} alt="challenges" />
                        Challenges
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/profile" className="sidebar-link">
                        <Icon img={calendar_icon} alt="events" />
                        Events
                    </Link>
                </li>

                <div className="line-seperator"></div>

                <li className="sidebar-item">
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
