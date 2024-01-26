import React, { useEffect, useState } from "react";
import PostType from "@/types/post";
import HeartIcon from "@images/heart_icon.svg";
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


    useEffect(() => {
      const fetchUserDetailsForComments = async () => {
          const details = await fetchUserDetails(comments);
          setUserDetails(details);
      };
      getLikes();
      getSaves();
      fetchUserDetailsForComments();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments, likeCounter, saveCounter, instructions, ingredients]);

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

    const checkCommentKeyStrokes = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.code === "Enter" || e.keyCode === 13) {
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
                if (response && response.status === 200){

                  console.log(response.data.comment)
                  setComments(prev => {
                    return [...prev, response.data.comment];
                  })
                }
                if (response && response.status === 400)
                    setCommentError(`Error: ${response?.data.error}`);
            } catch (e) {
                setCommentError(`Error: ${e}`);
            }

            setComment("");
            window.location.reload()
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
            if (response) return response.data;
            if (!response) return [];
        } catch (e) {
            console.log(e);
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
    const getTimeDifference = (createdAt: string): string => {
        const now = new Date();
        const postDate = new Date(createdAt);
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
                            <div
                                key={mediaItem}
                                className="media-item"
                            >
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
                <div className="post-description flex align-center justify-between">
                    <div className="flex flex-column align-center gap-5">
                        {ingredients ? (
                            <div className="ingredients">
                                <p>Ingredients </p>
                                <PostItemList inputString={ingredients} />
                            </div>
                        ) : (
                            <>
                                <p>Ingredients not posted?</p>
                                <button
                                    className="generate-btn"
                                    onClick={generateMissingInfo}
                                >
                                    Generate it!
                                </button>
                            </>
                        )}
                    </div>
                    <div className="flex flex-column align-center gap-5">
                        {instructions ? (
                            <div className="instructions">
                                <p>Instructions </p>
                                <PostItemList inputString={instructions} />
                            </div>
                        ) : (
                            <>
                                <p>Instructions not posted?</p>
                                <button
                                    className="generate-btn"
                                    onClick={generateMissingInfo}
                                >
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
                        <button
                            className="flex gap-3 align-center"
                            onClick={handleLike}
                        >
                            <img src={HeartIcon} /> {likeCounter}
                        </button>
                        <button className="flex gap-3 align-center">
                            <img src={CommentIcon} />{" "}
                            {comments && comments.length}
                        </button>
                        <button
                            className="flex gap-3 align-center"
                            onClick={handleSave}
                        >
                            <img src={BookmarkIcon} /> {saveCounter}
                        </button>
                    </div>
                    <div className="post-add-comment flex flex-column align-center">
                        {commentError && (
                            <p className="comment-error">
                                Comment can't be empty!
                            </p>
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
                <div className="comments">
                    {comments.length > 0 &&
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
            </div>
        </div>
    );
};

export default Post;
