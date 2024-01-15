import React from "react";
import PostType from "../../types/post";
import "./post.css";

const Post: React.FC<PostType> = ({
    uploader,
    profile_pic,
    created_at,
    title,
    recipe,
    instructions,
    comments,
    likes,
    saves,
    media,
    comments_count,
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
                <p>{recipe}</p>
                <p>{instructions}</p>
            </div>
            <div className="post-footer">
                <div className="post-actions flex gap-5">
                    <button className="flex gap-3 align-center"><img src={"src/assets/images/heart_icon.svg"} /> {saves}</button>
                    <button className="flex gap-3 align-center"><img src={"src/assets/images/heart_icon.svg"} /> {likes}</button>
                    <button className="flex gap-3 align-center"><img src={"src/assets/images/heart_icon.svg"} /> {comments_count}</button>
                </div>
                <div className="comments">
                    {comments &&
                        comments.map((comment, index) => (
                            <div key={index} className="comment">
                                <img
                                    src={comment.profile_pic}
                                    alt={`${comment.username}'s profile`}
                                    className="comment-pic"
                                />
                                <p>
                                    <strong>{comment.username}</strong>:{" "}
                                    {comment.comment}
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Post;
