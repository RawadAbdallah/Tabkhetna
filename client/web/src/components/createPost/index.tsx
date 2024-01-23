import Icon from "../icon";

import "./createPost.css";
import default_profile_pic from "@images/default_profile_pic.png";
import book_icon from "@images/book_dark_icon.svg";
import camera_icon from "@images/camera_icon.svg";
import video_icon from "@images/video_icon.svg";
import challenge_icon from "@images/challenge_dark_icon.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { request, serverURL } from "@/services/request";
import { useState } from "react";

const NewPostForm = () => {
    const user = useSelector((state: RootState) => state.user);
    const [postDetails, setPostDetails] = useState<object>({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        cuisine: "",
        media: [],
    });
    const [showPreview, setShowPreview] = useState(false);

    const handleNextClick = () => {
        setShowPreview(true);
    };

    const handleBackClick = () => {
        setShowPreview(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPostDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const filesArray = Array.from(files);
            setPostDetails((prev) => {
                return {
                    ...prev,
                    media: filesArray.slice(0, 2),
                };
            });
        }
    };

    const handleSubmit = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        const formData = new FormData();

        Object.entries(postDetails).forEach(([key, value]) => {
            if (key === "media") {
                value.forEach((file) => {
                    formData.append(`media`, file);
                });
            } else {
                formData.append(key, value);
            }
        });

        try {
            await request({
                route: "/post/add",
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <form className="new-post-form" onSubmit={handleSubmit}>
            {showPreview ? (
                <div className="post-preview">
                    <h2>Preview</h2>
                    <h3>{postDetails.title}</h3>
                    <p>{postDetails.description}</p>
                    <p>{postDetails.cuisine} cuisine</p>
                    <div className="file-preview">
                        {postDetails.media.slice(0, 2).map((file, index) => (
                            <div key={index} className="file-preview-item">
                                {file.type.startsWith("image") ? (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Preview ${index + 1}`}
                                    />
                                ) : (
                                    <video controls>
                                        <source
                                            src={URL.createObjectURL(file)}
                                            type={file.type}
                                        />
                                        Your browser does not support the video
                                        tag.
                                    </video>
                                )}
                            </div>
                        ))}
                        <div className="recipe-helper-preview flex justify-between">
                            <div> 
                                <p>Ingredients: </p>
                                {postDetails.ingredients}
                            </div>
                            <div>
                                <p>Instructions</p>
                                {postDetails.instructions}
                            </div>
                        </div>
                    </div>
                    {/* End of Post Preview */}
                    <div className="preview-buttons">
                        <button type="button" onClick={handleBackClick}>
                            Back
                        </button>
                        <button type="submit">Post</button>
                    </div>
                </div>
            ) : (
                <div className="post-edit">
                    <input
                        type="text"
                        name="title"
                        id="new-post-title"
                        placeholder="Title"
                        value={postDetails.title}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        id="new-post-description"
                        value={postDetails.description}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Instructions List"
                        name="instructions"
                        id="new-post-instructions"
                        value={postDetails.instructions}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Ingredients List"
                        name="ingredients"
                        id="new-post-ingredients"
                        value={postDetails.ingredients}
                        onChange={handleInputChange}
                    />

                    <select
                        name="cuisine"
                        id="new-post-cuisine"
                        value={postDetails.cuisine}
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>
                            Select cuisine
                        </option>
                        <option value="italian">Italian</option>
                        <option value="mexican">Mexican</option>
                        <option value="indian">Indian</option>
                        <option value="chinese">Chinese</option>
                        <option value="japanese">Japanese</option>
                        <option value="lebanese">Lebanese</option>
                        <option value="iraqi">Iraqi</option>
                        <option value="french">French</option>
                        <option value="saudi arabian">Saudi Arabian</option>
                        <option value="american">American</option>
                        <option value="other">Other</option>
                    </select>
                    <div className="new-file-input-wrapper">
                        <label
                            htmlFor="new-post-media"
                            className="file-input-label"
                        >
                            <span className="file-input-icon">&#128206;</span>
                            Choose File
                        </label>
                        <input
                            type="file"
                            name="media"
                            id="new-post-media"
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                            multiple
                        />
                        {postDetails.media && postDetails.media.length > 0 && (
                            <div className="file-preview">
                                {postDetails.media
                                    .slice(0, 2)
                                    .map((file, index) => (
                                        <div
                                            key={index}
                                            className="file-preview-item"
                                        >
                                            {file.type.startsWith("image/") ? (
                                                <img
                                                    src={URL.createObjectURL(
                                                        file
                                                    )}
                                                    alt={`Preview ${index + 1}`}
                                                />
                                            ) : file.type.startsWith(
                                                  "video/"
                                              ) ? (
                                                <video>
                                                    <source
                                                        src={URL.createObjectURL(
                                                            file
                                                        )}
                                                        type={file.type}
                                                    />
                                                    Your browser does not
                                                    support the video tag.
                                                </video>
                                            ) : null}
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                    {/* End of Edit Post Details */}
                    <button type="button" onClick={handleNextClick}>
                        Next
                    </button>
                </div>
            )}
        </form>
    );
};

const CreatePost: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);

    const [newPostData, setNewPostData] = useState<object>({});
    const [showPostForm, setShowPostForm] = useState(false);

    const togglePostForm = () => {
        setShowPostForm(!showPostForm);
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
                    <li className="flex align-center gap-1">
                        <Icon
                            img={video_icon}
                            alt="video icon"
                            noBackground={true}
                        />
                        Video
                    </li>
                    <li className="flex align-center gap-1">
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
