import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { convert, clean_event_type, history, event_colour} from "../_helpers";
import { PeopleFill, ChatQuote, Hammer} from "react-bootstrap-icons";

const IconPicker = (event_type) => {
    const size = 110;
    if (event_type == "workshop") {
        return <Hammer size={size} color="#B785D5" className="icon"/>
    } else if (event_type == "activity") {
        return <PeopleFill size={size} color="#B6D35F" className="icon" />
    } else if (event_type == "tech_talk") {
        return <ChatQuote size={size} color="#FF7F5C" className="icon" />
    }
}

export const EventItem = ({
    id,
    title,
    event_type,
    permission,
    description,
    start_time,
    end_time,
}) => {

    return (
        <Card body id={`event-card${id}`} className={"card col-10 left selection"} onClick={() => history.push(`/event/${id}`)}>
            <div className="card-container">
                <div className="col-10 card-title">{title} ({permission})</div>
                <div className={`col-2 card-etype right ${event_colour[event_type]}`}>{clean_event_type(event_type)}</div>
            </div>
            <div className="card-time col-12">{convert(start_time)} to {convert(end_time)}</div>
            <div className="card-container">
                <div className="col-10">{description}</div>
                <div className="col-1"/>
                {
                    IconPicker(event_type)
                }
            </div>
        </Card>
        
    );
};

export default EventItem;