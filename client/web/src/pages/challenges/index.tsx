import Header from "@/components/header";
import "./challenges.css";
import Sidebar from "@/components/sidebar";
import CookmatesSidebar from "@/components/cookmatesSidebar";
import { serverURL } from "@/services/request";
import { Link } from "react-router-dom";
import { useState } from "react";
import Challenge from "@/types/challenge";

const data = [
    {
        title: "Shawarma Challenge",
        challengeImg: "shawarma.jpg",
        description:
            "In this challenge you have to: - make the most traditional shawarma (don't use extra non-nessecary stuff) - Make the best Garlic(Toum) sauce - Make sure to add sidings to the plate (bonus).",
        challenger: {
            _id: "65a846b494edcc7e41b73882",
            firstname: "Rawad",
            lastname: "Abdallah",
            email: "rawad3@gmail.com",
            country: "Lebanon",
            cookmates: ["65acfca124878fe79a6e376d"],
            pending_cookmates: [],
            posts: [],
            role: 1,
            is_online: true,
            profile_pic: "84904014.jpg",
            __v: 0,
            achievements: [""],
        },
        isActive: true,
        _id: "65ad9b0860225a1f2db286c0",
        participants: [],
        __v: 0,
    },
    {
        title: "Cake Challenge",
        challengeImg: "cake.jpg",
        description:
            "In this challenge you have to: - make the most beautiful looking cake, good luck.",
        challenger: {
            _id: "65a846b494edcc7e41b73882",
            firstname: "Ali",
            lastname: "Modric",
            email: "rawad3@gmail.com",
            country: "Lebanon",
            cookmates: ["65acfca124878fe79a6e376d"],
            pending_cookmates: [],
            posts: [],
            role: 1,
            is_online: true,
            profile_pic: "modric.jpg",
            __v: 0,
            achievements: [""],
        },
        isActive: true,
        _id: "65ad9b0860225a1f2db286c0",
        participants: [],
        __v: 0,
    },
];

const Challenges = () => {
    const [challengeDetails, setChallengeDetails] = useState<Challenge | object>({});
    const showChallengeDetails = (challenge:Challenge) => {
        setChallengeDetails(() => {
            return { ...challenge };
        });
    };
    const hideChallengeDetails = () => {
        setChallengeDetails({});
    };

    return (
        <div className="challenges-page">
            {Object.keys(challengeDetails).length > 0 && (
                <div className="challenge-details flex align-center justify-center">
                    <div className="challenge-details-container">
                        <button
                            className="close-button"
                            onClick={hideChallengeDetails}
                        >
                            <span></span>
                            <span></span>
                        </button>
                        <img
                            className="challenge-details-img"
                            src={`${serverURL}uploads/images/${challengeDetails.challengeImg}`}
                            alt="challenge image"
                        />
                        <div className="challenge-info">
                            <h1 className="title">
                                {challengeDetails.title}'s Details
                            </h1>
                            <p className="description-title">Description:</p>
                            <ul className="desc-list">
                                {challengeDetails.description
                                    .split("- ")
                                    .slice(1)
                                    .map((desc, index) => (
                                        <li
                                            key={index}
                                            className="description-item"
                                        >
                                            {desc} <br />
                                        </li>
                                    ))}
                            </ul>

                            <div className="more-details-footer flex align-center justify-between">
                                <div className="posted-by flex flex-column gap-3">
                                    <div className="flex gap-5 align-center">
                                        <img
                                            src={`${serverURL}uploads/images/${challengeDetails.challenger.profile_pic}`}
                                        />
                                        {challengeDetails.challenger.firstname +
                                            " " +
                                            challengeDetails.challenger
                                                .lastname}
                                    </div>
                                </div>
                                <div className="participate">
                                    <button className="participate-btn">
                                        participate
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Header />
            <main className="main-challenges flex">
                <Sidebar current_page="challenges" />
                <div className="main-challenges-section">
                    <h1>Challenges</h1>
                    <section className="main-section flex flex-column gap-5">
                        <div className="challenges-container flex flex-column gap-5">
                            {data && data.length > 0 ? (
                                <>
                                    {data.map((challenge) => {
                                        return (
                                            <div className="challenge flex align-center gap-5">
                                                <img
                                                    className={"challenge-img"}
                                                    src={`${serverURL}uploads/images/${challenge.challengeImg}`}
                                                    alt="challenge image"
                                                />
                                                <div className="challenge-info flex flex-column gap-4">
                                                    <h3>{challenge.title}</h3>
                                                    <button
                                                        className="more-details-btn"
                                                        onClick={() =>
                                                            showChallengeDetails(
                                                                challenge
                                                            )
                                                        }
                                                    >
                                                        More details
                                                    </button>
                                                </div>
                                                <div className="challenger flex flex-column align-center justify-between">
                                                    <p>
                                                        Challenger: <br />
                                                        {challenge.challenger
                                                            .firstname +
                                                            " " +
                                                            challenge.challenger
                                                                .lastname}
                                                    </p>
                                                    <Link
                                                        to={`/profile/${challenge.challenger._id}`}
                                                    >
                                                        <img
                                                            className="challenger-img"
                                                            src={`${serverURL}uploads/images/${challenge.challenger.profile_pic}`}
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </>
                            ) : (
                                "No Challenges at the moment"
                            )}
                        </div>
                    </section>
                </div>
                <CookmatesSidebar />
            </main>
        </div>
    );
};

export default Challenges;
