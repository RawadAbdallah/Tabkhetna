import Header from "@/components/header";
import "./challenges.css";
import Sidebar from "@/components/sidebar";
import CookmatesSidebar from "@/components/cookmatesSidebar";
import { request, serverURL } from "@/services/request";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Challenge from "@/types/challenge";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Challenges = () => {
    const user = useSelector((state: RootState) => state.user);
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [isChallengeDetailsVisible, setIsChallengeDetailsVisible] =
        useState<boolean>(false);
    const [challengeDetails, setChallengeDetails] = useState<Challenge>({
        title: "",
        description: "",
        _id: "",
        challengeImg: "",
        challenger: null,
    });

    const showChallengeDetails = (challenge: Challenge) => {
        setChallengeDetails(() => {
            return { ...challenge };
        });
        setIsChallengeDetailsVisible(true);
    };
    const hideChallengeDetails = () => {
        setIsChallengeDetailsVisible(false);
    };

    useEffect(() => {
        const getChallenges = async () => {
            try {
                const response = await request({
                    route: "/challenges",
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (response && response.status === 200) {
                    setChallenges(response.data.challenges as Challenge[]);
                }
            } catch (e) {
                return null;
            }
        };
        if (user.token) {
            getChallenges();
        }
    }, [user]);

    return (
        <div className="challenges-page">
            {isChallengeDetailsVisible &&
                challengeDetails.challenger !== null && (
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
                                src={`${serverURL}${challengeDetails.challengeImg}`}
                                alt="challenge image"
                            />
                            <div className="challenge-info">
                                <h1 className="title">
                                    {challengeDetails.title}'s Details
                                </h1>
                                <p className="description-title">
                                    Description:
                                </p>
                                <ul className="desc-list">
                                    {challengeDetails.description
                                        .split("-")
                                        .slice(0)
                                        .map((desc, index) => {
                                            if (desc.length > 0)
                                                return (
                                                    <li
                                                        key={index}
                                                        className="description-item"
                                                    >
                                                        {desc.trim()}
                                                    </li>
                                                );
                                        })}
                                </ul>

                                <div className="more-details-footer flex align-center justify-between">
                                    <div className="posted-by flex flex-column gap-3">
                                        <div className="flex gap-5 align-center">
                                            <img
                                                src={`${serverURL}uploads/images/${challengeDetails.challenger.profile_pic}`}
                                            />
                                            {challengeDetails.challenger
                                                .firstname +
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
                    {challenges && challenges.length > 0 ? (
                        <section className="main-section flex flex-column gap-5">
                            <h1>Challenges</h1>
                            <div className="challenges-container flex flex-column gap-5">
                                {challenges.map((challenge, index) => {
                                    return (
                                        <div
                                            className="challenge flex align-center gap-5"
                                            key={challenge.title + index}
                                        >
                                            <img
                                                className={"challenge-img"}
                                                src={`${serverURL}${challenge.challengeImg}`}
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
                                                    {challenge?.challenger
                                                        ?.firstname +
                                                        " " +
                                                        challenge?.challenger
                                                            ?.lastname}
                                                </p>
                                                <Link
                                                    to={`/profile/${challenge?.challenger?._id}`}
                                                >
                                                    <img
                                                        className="challenger-img"
                                                        src={`${serverURL}uploads/images/${challenge?.challenger?.profile_pic}`}
                                                    />
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    ) : (
                        <div className="no-challenges">
                            No Challenges posted yet.
                        </div>
                    )}
                </div>
                <CookmatesSidebar />
            </main>
        </div>
    );
};

export default Challenges;
