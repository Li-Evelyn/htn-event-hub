import React from "react";
import { EventItem } from "./EventItem";

export const EventList = ({ events, ...props}) => {

    return (
        <div>
            { events &&
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
                })}
        </div>
    );
};

export default EventList;