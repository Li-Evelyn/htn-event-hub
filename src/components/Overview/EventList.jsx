import React from "react";
import { EventItem } from "./EventItem";

export const EventList = ({ events, ...props}) => {

    return (
        <div>
            { events.length ?
                events.map((event) => {
                    return (
                        <EventItem
                            id={event["id"]}
                            title={event["name"]}
                            event_type={event["event_type"]}
                            description={event["description"]}
                            start_time={event["start_time"]}
                            end_time={event["end_time"]}
                        />
                    );
                })
                : <div className="couldntfetch col-12 left">Sorry! We couldn't fetch any events with those criteria 😔 Try signing in or changing your filters!</div>
            }
        </div>
    );
};

export default EventList;