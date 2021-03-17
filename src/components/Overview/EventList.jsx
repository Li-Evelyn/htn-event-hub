import React from "react";
import { EventItem } from "./EventItem";

export const EventList = ({ events}) => {
    return (
        <div>
            { events.length ? // check if the events array is nonempty - if so, return a list of interactable event cards
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
                }) // if not, display a message
                : <div className="couldntfetch col-12 left">Sorry! We couldn't fetch any events with those criteria 😔 Try signing in or changing your filters!</div>
            }
        </div>
    );
};

export default EventList;