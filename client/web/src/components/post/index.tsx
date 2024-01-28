import React, { useEffect, useState } from "react";
import PostType from "@/types/post";
import HeartIconFilled from "@images/heart_icon.svg";
import HeartIconTransparent from "@images/heart_icon_transparent.svg";
import CommentIcon from "@images/comment_icon.svg";
import BookmarkIcon from "@images/bookmark_icon.svg";
import { request, serverURL } from "@/services/request";

import "./post.css";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CommentType from "@/types/comment";
import UserDetailsType from "@/types/userDetailsType";

import PostItemList from "../postItemList";
import Loader from "../loader";

import default_profile_pic from "@images/default_profile_pic.png";
import { Link } from "react-router-dom";
import { getTimeDifference } from "@/utils/helpers";

const Post: React.FC<PostType> = ({
    _id,
    uploader,
    posted_by,
    profile_pic,
    createdAt,
    title,
    ingredients: ingredientList,
    instructions: instructionsList,
    comments: initialComments,
    likes,
    saves,
    media,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [ingredients, setIngredients] = useState(ingredientList);
    const [instructions, setInstructions] = useState(instructionsList);
    const [userDetails, setUserDetails] = useState<UserDetailsType[]>([]);
    const [comment, setComment] = useState<string>("");
    const [comments, setComments] = useState<CommentType[]>(initialComments);
    const [commentError, setCommentError] = useState<string>("");
    const [likeCounter, setLikeCounter] = useState<number>(likes?.length || 0);
    const [saveCounter, setSaveCounter] = useState<number>(0);
    const user = useSelector((state: RootState) => state.user);
    const [isLiked, setIsLiked] = useState(false);

    const checkCommentKeyStrokes = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
            handleCommentSubmit();
        }
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };
    const handleCommentSubmit = async () => {
        if (!comment) {
            setCommentError("Comment cannot be empty");
        } else {
            try {
                const response = await request({
                    route: "/post/add-comment",
                    method: "POST",
                    body: { comment, _id },
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (response && response.status === 200) {
                    // Set comments directly without relying on the previous state
                    setComments([...comments, response.data.comment]);
                } else if (response && response.status === 400) {
                    setCommentError(`Error: ${response?.data.error}`);
                } else {
                    setCommentError("An unexpected error occurred");
                }
            } catch (e) {
                console.error("An unexpected error occurred:", e);
                setCommentError("An unexpected error occurred");
            }

            setComment("");
        }
    };

    const getUserInfo = async (userId: string) => {
        try {
            const response = await request({
                route: `/profile/basicInfo/${userId}`,
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            return response?.data || null;
        } catch (e) {
            console.error("Error fetching user info:", e);
            return null;
        }
    };

    const fetchUserDetails = async (comments: CommentType[]) => {
        if (!comments) {
            return [];
        }

        const userDetailsArray = await Promise.all(
            comments.map(async (comment) => {
                if (comment.user) {
                    const userCommentDetails = await getUserInfo(comment.user);
                    return userCommentDetails;
                }
            })
        );
        return userDetailsArray.filter(Boolean);
    };

    const isImage = (mediaItem: string): boolean => {
        const imageExtensions = ["jpg", "jpeg", "png", "gif"];
        const fileExtension = mediaItem.split(".").pop();
        if (fileExtension)
            return imageExtensions.includes(fileExtension.toLowerCase());
        return false;
    };

    const handleLike = async () => {
        try {
            const response = await request({
                route: `/post/like/${_id}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if (response && response.status === 200) {
                setLikeCounter((prev) => prev + 1);
                setIsLiked(true);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleSave = async () => {
        try {
            const response = await request({
                route: `/post/save/${_id}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if (response && response.status === 200) {
                setSaveCounter((prev) => prev + 1);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const fetchUserDetailsForComments = async () => {
            const details = await fetchUserDetails(comments);
            setUserDetails(details);
        };

        const getLikes = async () => {
            try {
                const response = await request({
                    route: `/post/like/get/${_id}`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                if (response && response.status === 200)
                    setLikeCounter(response.data);
                else setLikeCounter(likes?.length || 0);
            } catch (e) {
                console.log(e);
            }
        };

        const getSaves = async () => {
            try {
                const response = await request({
                    route: `/post/save/get/${_id}`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                if (response && response.status === 200)
                    setSaveCounter(response.data);
                else setSaveCounter(saves?.length || 0);
            } catch (e) {
                console.log(e);
            }
        };

        getLikes();
        getSaves();
        fetchUserDetailsForComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [likeCounter, saveCounter, user, _id, comments, comment, likes, saves]);

    const generateMissingInfo = async () => {
        const missing = instructions ? "ingredients" : "instructions";
        const listOfCurrentInfo = instructions ? instructions : ingredients;
        console.log("The missing info is: ", missing);
        console.log("The list you have provided is: ", listOfCurrentInfo);
        try {
            setIsLoading(true);
            const response = await request({
                route: "/ai/generateRecipeMissingInfo",
                body: { missing, listOfCurrentInfo, title },
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if (response && response.status === 200) {
                if (!instructions) setInstructions(response.data.text);
                else setIngredients(response.data.text);
            }
            console.log(response?.data.text);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="post flex flex-column gap-5">
            {isLoading && <Loader />}
            <Link
                to={`/profile/${posted_by}`}
                className="post-header flex align-center gap-5"
            >
                <img
                    src={`${serverURL}uploads/images/${profile_pic}`}
                    onError={(e) => {
                        const imgElement = e.target as HTMLImageElement;
                        if (imgElement) {
                            imgElement.onerror = null;
                            imgElement.src = default_profile_pic;
                        }
                    }}
                    alt={`${uploader}'s profile`}
                    className="profile-pic"
                />
                <div className="uploader-info">
                    <p>{uploader}</p>
                    <p>{getTimeDifference(createdAt)}</p>
                </div>
            </Link>
            <div className="post-content">
                <h2>{title}</h2>
                <div className="media-container">
                    {media &&
                        media.map((mediaItem) => (
                            <div key={mediaItem} className="media-item">
                                {isImage(mediaItem) ? (
                                    <img
                                        src={`${serverURL}${mediaItem.replace(
                                            "storage/",
                                            ""
                                        )}`}
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
                <div className="post-description flex justify-between">
                    <div className="flex flex-column align-center gap-5">
                        {ingredients ? (
                            <div className="ingredients">
                                <p>Ingredients </p>
                                <PostItemList inputString={ingredients} />
                            </div>
                        ) : (
                            <div className="no-post-info">
                                <p>Ingredients not posted?</p>
                                <button
                                    className="generate-btn"
                                    onClick={generateMissingInfo}
                                >
                                    Generate it!
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-column align-center gap-5">
                        {instructions ? (
                            <div className="instructions">
                                <p>Instructions </p>
                                <PostItemList inputString={instructions} />
                            </div>
                        ) : (
                            <div className="no-post-info">
                                <p>Instructions not posted?</p>
                                <button
                                    className="generate-btn"
                                    onClick={generateMissingInfo}
                                >
                                    Generate it!
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="post-footer">
                <div className="post-actions-wrapper flex align-center justify-between">
                    <div className="post-actions flex gap-5">
                        <button
                            className="flex gap-3 align-center post-action-btn"
                            onClick={handleLike}
                        >
                            {isLiked ? (
                                <img src={HeartIconFilled} alt="Liked" />
                            ) : (
                                <img
                                    src={HeartIconTransparent}
                                    alt="Not Liked"
                                />
                            )}
                            {likeCounter}
                        </button>
                        <button className="flex gap-3 align-center post-action-btn">
                            <img src={CommentIcon} />{" "}
                            {comments && comments.length}
                        </button>
                        <button
                            className="flex gap-3 align-center post-action-btn"
                            onClick={handleSave}
                        >
                            <img src={BookmarkIcon} /> {saveCounter}
                        </button>
                    </div>
                </div>
                <div className="comments">
                    {comments &&
                        comments.length > 0 &&
                        comments.map((comment, index) => {
                            const userCommentDetails = userDetails[index];
                            if (userCommentDetails) {
                                return (
                                    <div
                                        key={index}
                                        className="comment flex gap-4"
                                    >
                                        <img
                                            src={`${serverURL}uploads/images/${userCommentDetails.profile_pic}`}
                                            onError={(e) => {
                                                const imgElement =
                                                    e.target as HTMLImageElement;
                                                if (imgElement) {
                                                    imgElement.onerror = null;
                                                    imgElement.src =
                                                        default_profile_pic;
                                                }
                                            }}
                                            alt={`${userCommentDetails.firstname}'s profile`}
                                            className="comment-pic"
                                        />
                                        <div className="comment-info flex flex-column gap-2">
                                            <p>
                                                {userCommentDetails.firstname}{" "}
                                                {userCommentDetails.lastname}
                                            </p>
                                            <p>{comment.comment}</p>
                                        </div>
                                    </div>
                                );
                            }

                            return null;
                        })}
                </div>
                <div className="post-add-comment flex flex-column align-center">
                    {commentError && (
                        <p className="comment-error">Comment can't be empty!</p>
                    )}
                    <input
                        type="text"
                        name="new-comment"
                        id="new-comment"
                        placeholder="Write a comment"
                        onChange={handleCommentChange}
                        onKeyDown={checkCommentKeyStrokes}
                    />
                </div>
            </div>
        </div>
    );
};

export default Post;
