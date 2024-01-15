import React from "react";
import PostType from "../../types/post";
import "./post.css";

const Post: React.FC<PostType> = ({
    uploader,
    profile_pic,
    created_at,
    title,
    ingredients,
    instructions,
    comments,
    likes,
    saves,
    media,
}) => {
    return (
        <div className="post flex flex-column gap-5">
            <div className="post-header flex align-center gap-5">
                <img
                    src={profile_pic}
                    alt={`${uploader}'s profile`}
                    className="profile-pic"
                />
                <div className="uploader-info">
                    <p>{uploader}</p>
                    <p>{created_at}</p>
                </div>
            </div>
            <div className="post-content">
                <h2>{title}</h2>
                <div className="media-container">
                    {media &&
                        media.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Post media ${index}`}
                                className="post-media"
                            />
                        ))}
                </div>
                <div className="post-description flex align-center justify-between">
                    <div className="flex flex-column align-center gap-5">
                        {
                            ingredients ? <p>{ingredients}</p> : <>
                            <p>Ingredients not posted?</p>
                            <button>Generate it!</button>
                            </>
                        }
                    </div>
                    <div className="flex flex-column align-center gap-5">
                    {
                            instructions ? <p>{instructions}</p> : <>
                            <p>Instructions not posted?</p>
                            <button>Generate it!</button>
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className="post-footer">
                <div className="post-actions-wrapper flex align-center justify-between">
                    <div className="post-actions flex gap-5">
                        <button className="flex gap-3 align-center">
                            <img src={"src/assets/images/heart_icon.svg"} />{" "}
                            {likes}
                        </button>
                        <button className="flex gap-3 align-center">
                            <img src={"src/assets/images/comment_icon.svg"} />{" "}
                            {comments.length}
                        </button>
                        <button className="flex gap-3 align-center">
                            <img src={"src/assets/images/bookmark_icon.svg"} />{" "}
                            {saves}
                        </button>
                    </div>
                    <div className="post-add-comment">
                        <input
                            type="text"
                            name="new-comment"
                            id="new-comment"
                            placeholder="Write a comment"
                        />
                    </div>
                </div>
                <div className="comments">
                    {comments &&
                        comments.map((comment, index) => (
                            <div key={index} className="comment flex gap-4">
                                <img
                                    src={comment.profile_pic}
                                    alt={`${comment.username}'s profile`}
                                    className="comment-pic"
                                />
                                <div className="comment-info flex flex-column gap-2">
                                    <p>{comment.username}</p>
                                    <p>{comment.comment} </p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Post;
