import React from "react";
import PostType from "@/types/post";
import HeartIcon from "@images/heart_icon.svg";
import CommentIcon from "@images/comment_icon.svg";
import BookmarkIcon from "@images/bookmark_icon.svg";
import { serverURL } from "@/services/request";

import "./post.css";

const Post: React.FC<PostType> = ({
    uploader,
    profile_pic,
    updatedAt,
    title,
    ingredients,
    instructions,
    comments,
    likes,
    saves,
    media,
}) => {
    const getTimeDifference = (updatedAt: string): string => {
        const now = new Date();
        const postDate = new Date(updatedAt);

        const timeDifferenceInSeconds = Math.floor(
            (now.getTime() - postDate.getTime()) / 1000
        );

        if (timeDifferenceInSeconds <= 60) {
            return "just now";
        } else if (timeDifferenceInSeconds < 3600) {
            const minutes = Math.floor(timeDifferenceInSeconds / 60);
            return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
        } else if (timeDifferenceInSeconds < 86400) {
            const hours = Math.floor(timeDifferenceInSeconds / 3600);
            return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
        } else if (timeDifferenceInSeconds < 2592000) {
            const days = Math.floor(timeDifferenceInSeconds / 86400);
            return `${days} ${days === 1 ? "day" : "days"} ago`;
        } else if (timeDifferenceInSeconds < 31536000) {
            const months = Math.floor(timeDifferenceInSeconds / 2592000);
            return `${months} ${months === 1 ? "month" : "months"} ago`;
        } else {
            const years = Math.floor(timeDifferenceInSeconds / 31536000);
            return `${years} ${years === 1 ? "year" : "years"} ago`;
        }
    };

    const isImage = (mediaItem: string): boolean => {
        const imageExtensions = ["jpg", "jpeg", "png", "gif"];
        const fileExtension = mediaItem.split(".").pop();
        if (fileExtension)
            return imageExtensions.includes(fileExtension.toLowerCase());
        return false
    };

    return (
        <div className="post flex flex-column gap-5">
            <div className="post-header flex align-center gap-5">
                <img
                    src={`${serverURL}uploads/images/${profile_pic}`}
                    alt={`${uploader}'s profile`}
                    className="profile-pic"
                />
                <div className="uploader-info">
                    <p>{uploader}</p>
                    <p>{getTimeDifference(updatedAt)}</p>
                </div>
            </div>
            <div className="post-content">
                <h2>{title}</h2>
                <div className="media-container">
                    {media &&
                        media.map((mediaItem, index) => (
                            <div key={mediaItem + index}>
                                {isImage(mediaItem) ? (
                                    <img
                                        src={`${serverURL}${mediaItem}`}
                                        alt={`Recipe Image: ${title}`}
                                        className="post-media"
                                    />
                                ) : (
                                    <video controls className="post-media">
                                        <source
                                            src={`${serverURL}${mediaItem}`}
                                            type="video/mp4"
                                        />
                                        Your browser does not support the video
                                        tag.
                                    </video>
                                )}
                            </div>
                        ))}
                </div>
                <div className="post-description flex align-center justify-between">
                    <div className="flex flex-column align-center gap-5">
                        {ingredients ? (
                            <p>{ingredients}</p>
                        ) : (
                            <>
                                <p>Ingredients not posted?</p>
                                <button className="generate-btn">
                                    Generate it!
                                </button>
                            </>
                        )}
                    </div>
                    <div className="flex flex-column align-center gap-5">
                        {instructions ? (
                            <p>{instructions}</p>
                        ) : (
                            <>
                                <p>Instructions not posted?</p>
                                <button className="generate-btn">
                                    Generate it!
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="post-footer">
                <div className="post-actions-wrapper flex align-center justify-between">
                    <div className="post-actions flex gap-5">
                        <button className="flex gap-3 align-center">
                            <img src={HeartIcon} /> {likes.length}
                        </button>
                        <button className="flex gap-3 align-center">
                            <img src={CommentIcon} /> {comments.length}
                        </button>
                        <button className="flex gap-3 align-center">
                            <img src={BookmarkIcon} /> {saves}
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
                                    alt={`${comment.firstname}'s profile`}
                                    className="comment-pic"
                                />
                                <div className="comment-info flex flex-column gap-2">
                                    <p>
                                        {comment.firstname} {comment.lastname}
                                    </p>
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
