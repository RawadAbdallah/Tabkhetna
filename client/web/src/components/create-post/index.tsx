import Icon from "../icon";

import "./create-post.css";

import default_profile_pic from "@images/default_profile_pic.png";
import book_icon from "@images/book_dark_icon.svg";
import camera_icon from "@images/camera_icon.svg";
import video_icon from "@images/video_icon.svg";
import challenge_icon from "@images/challenge_dark_icon.svg";

const CreatePost: React.FC = () => {
    return (
        <div className="create-post-container flex flex-column gap-5">
            <div className="flex gap-3">
                <img src={default_profile_pic} alt="Profile Pic" />
                <input
                    type="text"
                    placeholder="What are we cooking today?"
                    id="new-post"
                    name="new-post"
                />
            </div>

            <div className="create-post-types-container">
                <ul className="post-types flex justify-between">
                    <li className="flex align-center gap-3">
                        <Icon
                            img={camera_icon}
                            alt="camera"
                            noBackground={true}
                        />
                        Go Live
                    </li>
                    <li className="flex align-center gap-3">
                        <Icon img={book_icon} alt="book" noBackground={true} />
                        Recipe
                    </li>
                    <li className="flex align-center gap-3">
                        <Icon
                            img={video_icon}
                            alt="video"
                            noBackground={true}
                        />
                        Video
                    </li>
                    <li className="flex align-center gap-3">
                        <Icon
                            img={challenge_icon}
                            alt="challenges"
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
