import Icon from "../icon";

import "./createPost.css";
import default_profile_pic from "@images/default_profile_pic.png";
import book_icon from "@images/book_dark_icon.svg";
import camera_icon from "@images/camera_icon.svg";
import video_icon from "@images/video_icon.svg";
import challenge_icon from "@images/challenge_dark_icon.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { serverURL } from "@/services/request";
import { useState } from "react";
import NewPostForm from "../newPostForm";
import NewChallengeForm from "../newChallengeForm";
const CreatePost: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const [showPostForm, setShowPostForm] = useState(false);
    const [showChallengeForm, setShowChallengeForm] = useState(false)
    const togglePostForm = () => {
        setShowChallengeForm(false);
        setShowPostForm(!showPostForm);
    };  
    const toggleChallengeForm = () => {
        setShowPostForm(false);
        setShowChallengeForm(!showChallengeForm);
    };

    return (
        <div className="create-post-container flex flex-column gap-5">
            <div className="flex gap-3">
                <img
                    src={`${serverURL}uploads/images/${user.profile_pic}`}
                    onError={(e) => {
                        const imgElement = e.target as HTMLImageElement;
                        if (imgElement) {
                            imgElement.onerror = null;
                            imgElement.src = default_profile_pic;
                        }
                    }}
                />
                <div className="new-post" onClick={togglePostForm}>
                    <p>What are we cooking today?</p>
                </div>
            </div>

            {showPostForm && <NewPostForm />}
            {showChallengeForm && <NewChallengeForm />}

            <div className="create-post-types-container">
                <ul className="post-types flex justify-between">
                    <li className="flex align-center gap-1">
                        <Icon
                            img={camera_icon}
                            alt="camera icon"
                            noBackground={true}
                        />
                        Go Live
                    </li>
                    <li
                        className="flex align-center gap-1"
                        onClick={togglePostForm}
                    >
                        <Icon
                            img={book_icon}
                            alt="book icon"
                            noBackground={true}
                        />
                        Recipe
                    </li>
                    <li
                        className="flex align-center gap-1"
                        onClick={togglePostForm}
                    >
                        <Icon
                            img={video_icon}
                            alt="video icon"
                            noBackground={true}
                        />
                        Video
                    </li>
                    <li className="flex align-center gap-1" onClick={toggleChallengeForm}>
                        <Icon
                            img={challenge_icon}
                            alt="challenge icon"
                            noBackground={true}
                        />
                        Challenge
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CreatePost;
