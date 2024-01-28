// Messages.tsx

import React, { useState, useEffect, useRef } from "react";
import "./messages.css";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Loader from "@/components/loader";
import { request, serverURL } from "@/services/request";
import default_profile_pic from "@images/default_profile_pic.png";
import arrow_back from "@images/arrow_back.svg";
import send_icon from "@images/send_icon.png";
import Header from "@/components/header";
import CookmateType from "@/types/cookmate";
import { io, Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { getTimeDifference } from "@/utils/helpers";
import Sidebar from "@/components/sidebar";

interface Message {
    id: string;
    sender: string;
    message: string;
    createdAt: Date;
}

const Messages: React.FC = () => {
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);

    const [cookmates, setCookmates] = useState<CookmateType[]>([]);
    const [selectedCookmate, setSelectedCookmate] =
        useState<CookmateType | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [tipMessage, setTipMessage] = useState<string | null>(
        "Select a cookmate to start messaging."
    );
    const [animationDirection, setAnimationDirection] = useState<string>("");
    const user = useSelector((state: RootState) => state.user);
    const [socket, setSocket] = useState<Socket | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const getCookmates = async () => {
            if (messagesContainerRef.current) {
                messagesContainerRef.current.scrollTop =
                    messagesContainerRef.current.scrollHeight;
            }
            try {
                if (user && user.token) {
                    setIsLoading(true);
                    const { token } = user;
                    const result = await request({
                        route: "/cookmates",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });
                    setCookmates(result?.data.cookmates || []);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        if (!socket) {
            console.log("Setting socket current");
            const newSocket = io("http://localhost:80");
            console.log(newSocket);

            newSocket.on("connect", () => {
                console.log("Connected to server");
            });

            newSocket.on("disconnect", () => {
                console.log("Disconnected from server");
            });

            newSocket.on("newMessage", (newMessage: Message) => {
                console.log("Received new message:", newMessage);
            });

            newSocket.on("error", (error) => {
                console.error("Socket error:", error);
            });

            newSocket.on("connect_error", (error) => {
                console.error("Socket connection error:", error);
            });

            setSocket(newSocket);
        }
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }

        getCookmates();

        return () => {
            socket?.disconnect(); // Disconnect the socket when the component is unmounted
        };
    }, [user, selectedCookmate, socket, messagesContainerRef]);

    const fetchMessages = async (selectedCookmateId: string) => {
        try {
            if (user && user.token) {
                setIsLoading(true);
                const { token } = user;

                const result = await request({
                    route: `/messages/${selectedCookmateId}`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                setMessages(result?.data || []);
                setIsLoading(false);
                setAnimationDirection("left");
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const handleSelectCookmate = (cookmate: CookmateType) => {
        setSelectedCookmate(cookmate);
        setTipMessage(null);

        if (cookmate._id) {
            // Disconnect existing socket if needed
            socket && socket.disconnect();

            // Create a new socket connection
            const newSocket = io("http://localhost:80");
            setSocket(newSocket);

            // Add event listeners to the new socket
            newSocket.on("connect", () => {
                console.log("Connected to server");
            });

            newSocket.on("disconnect", () => {
                console.log("Disconnected from server");
            });

            newSocket.on("newMessage", (newMessage: Message) => {
                console.log("Received new message:", newMessage);
            });

            newSocket.on("error", (error) => {
                console.error("Socket error:", error);
            });

            newSocket.on("connect_error", (error) => {
                console.error("Socket connection error:", error);
            });

            // Fetch messages or perform other actions as needed
            fetchMessages(cookmate._id);
        }
    };

    const handleSendMessage = (message: string) => {
        if (selectedCookmate && user && socket) {
            const newMessage = {
                id: Date.now().toString(),
                sender: user.id,
                message,
            };

            socket.emit("newMessage", {
                sender: user.id,
                receiver: selectedCookmate._id,
                message,
            });

            setMessages((prevMessages) => {
                const uniqueMessages = new Set([...prevMessages, newMessage]);
                return [...uniqueMessages] as Message[];
            });
        }
        setAnimationDirection("right");
    };

    return (
        <div className="messages-page">
            {isLoading && <Loader />}
            <Header />
            <div className={`content ${selectedCookmate ? "chat-open" : ""}`}>
                <Sidebar />
                <div className="chat-ui">
                    {selectedCookmate && (
                        <div className="user-details">
                            <button
                                className="back-button"
                                onClick={() => setSelectedCookmate(null)}
                            >
                                <img src={arrow_back} alt="Go Back" />
                            </button>
                            <img
                                src={
                                    `${serverURL}uploads/images/${selectedCookmate.profile_pic}` ||
                                    default_profile_pic
                                }
                                onError={(e) => {
                                    const imgElement =
                                        e.target as HTMLImageElement;
                                    if (imgElement) {
                                        imgElement.onerror = null;
                                        imgElement.src = default_profile_pic;
                                    }
                                }}
                                alt={
                                    selectedCookmate.firstname +
                                    "'s profile pic"
                                }
                                className="profile-pic"
                                onClick={() =>
                                    navigate(`/profile/${selectedCookmate._id}`)
                                }
                            />
                            <div
                                onClick={() =>
                                    navigate(`profile/${selectedCookmate._id}`)
                                }
                            >
                                {selectedCookmate.firstname}{" "}
                                {selectedCookmate.lastname}
                            </div>
                        </div>
                    )}
                    {selectedCookmate ? (
                        <div className="messages" ref={messagesContainerRef}>
                            {messages.map((message, index) => {
                                if (message)
                                    return (
                                        <div
                                            key={index}
                                            className={`message ${
                                                message.sender ===
                                                selectedCookmate?._id
                                                    ? "received"
                                                    : "sent"
                                            } ${animationDirection}`}
                                            onAnimationEnd={() =>
                                                setAnimationDirection("")
                                            }
                                        >
                                            <div className="message-date">
                                                {message.createdAt
                                                    ? getTimeDifference(
                                                          message.createdAt.toString()
                                                      )
                                                    : "just now"}
                                            </div>
                                            {message.message}
                                        </div>
                                    );
                            })}
                        </div>
                    ) : (
                        <div className="tip-message">{tipMessage}</div>
                    )}
                    {!tipMessage && selectedCookmate && (
                        <form
                            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                                e.preventDefault();
                                const messageInput =
                                    e.currentTarget.elements.namedItem(
                                        "message"
                                    ) as HTMLInputElement;
                                handleSendMessage(messageInput.value);
                                messageInput.value = "";
                            }}
                        >
                            <input
                                type="text"
                                name="message"
                                placeholder="Type a message..."
                            />
                            <button
                                type="submit"
                                className="flex align-center justify-center"
                            >
                                <img src={send_icon} alt="Send" />
                            </button>
                        </form>
                    )}
                </div>
                <div className="cookmates-list">
                    <h2>Cookmates</h2>
                    <ul>
                        {cookmates.map((cookmate, index) => (
                            <li
                                key={(cookmate._id, index)}
                                onClick={() => handleSelectCookmate(cookmate)}
                                className={
                                    selectedCookmate?._id === cookmate._id
                                        ? "selected"
                                        : ""
                                }
                            >
                                <div>
                                    <img
                                        src={
                                            `${serverURL}uploads/images/${cookmate.profile_pic}` ||
                                            default_profile_pic
                                        }
                                        onError={(e) => {
                                            const imgElement =
                                                e.target as HTMLImageElement;
                                            if (imgElement) {
                                                imgElement.onerror = null;
                                                imgElement.src =
                                                    default_profile_pic;
                                            }
                                        }}
                                        alt={
                                            cookmate.firstname +
                                            "'s profile pic"
                                        }
                                        onClick={() =>
                                            navigate(
                                                `/profile/${selectedCookmate?._id}`
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    {cookmate.firstname} {cookmate.lastname}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Messages;
