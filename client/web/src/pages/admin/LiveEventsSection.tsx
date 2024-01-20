import React, { useEffect, useState } from "react";

const mockLiveEvents = [
    {
        id: "1",
        firstname: "Chef Ramzi",
        lastname: "Ridwan",
        title: "Livestream Event One",
        startTime: new Date("2021-08-30T15:47:06.921Z"),
        endTime: new Date("2021-08-30T17:00:00.000Z"),
        pending: true,
    },
    {
        id: "2",
        firstname: "Ali",
        lastname: "Ali",
        title: "Shawarma Event",
        startTime: new Date("2021-08-30T15:47:06.921Z"),
        endTime: new Date("2021-08-30T17:00:00.000Z"),
        pending: true,
    },

    {
        id: "3",
        firstname: "Luka",
        lastname: "Modric",
        title: "Just Chatting",
        startTime: new Date("2021-08-30T15:47:06.921Z"),
        endTime: new Date("2021-08-30T17:00:00.000Z"),
        pending: false,
    },
];

interface LiveEvent {
    id: string;
    firstname: string;
    lastname: string;
    title: string;
    startTime?: Date;
    endTime?: Date;
    pending?: boolean;
}

const LiveEventsSection: React.FC = () => {
    const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);

    useEffect(() => {
        setLiveEvents(mockLiveEvents);
    }, []);

    const handleRequestAccept = (id: string) => {
        setLiveEvents((events) => {
            return events.map((event) => {
                if (event.id === id && event.pending === true) {
                    return { ...event, pending: false };
                }
                return event;
            });
        });
    };

    const handleEventStop = (id: string) => {
      setLiveEvents((events) => {
        return events.filter((event) => event.id !== id);
      })
    }

    return (
        <div className="events-section flex flex-column gap-5">
            <h2>Live Events Section</h2>
            <h3>Requests</h3>
            {liveEvents.map((event, index) => {
                if (event.pending) {
                    return (
                        <div className={"flex align-center gap-5"} key={index}>
                            <p>{`${event.firstname} has requested to go live for ${event.title}`}</p>
                            <button
                                onClick={() => handleRequestAccept(event.id)}
                                className="accept-btn"
                            >
                                Accept
                            </button>
                        </div>
                    );
                }
                return;
            })}

            <h3>Current Ongoing Live Events</h3>
            {liveEvents.map((event, index) => {
                if (!event.pending) {
                    return (
                        <div className={"flex align-center gap-5"} key={index}>
                            <p>{`${event.firstname} ${event.lastname} is live. Title: ${event.title}`}</p>
                            <button
                                onClick={() => handleEventStop(event.id)}
                                className="stop-btn"
                            >
                                Stop Event
                            </button>
                        </div>
                    );
                }
                return;
            })}
        </div>
    );
};

export default LiveEventsSection;
