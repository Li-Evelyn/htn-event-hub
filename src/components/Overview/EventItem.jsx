import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { convert, clean_event_type, history, event_colour, event_icon} from "../_helpers";

export const EventItem = ({
    id,
    title,
    event_type,
    description,
    start_time,
    end_time,
}) => {

    return (
        <Card body id={`event-card${id}`} className="col-10 left selection" onClick={() => history.push(`/event/${id}`)}>
            <div className="card-container">
                <div className="col-10 card-title">{title}</div>
                <div className={`col-2 card-etype right ${event_colour[event_type]}`}>{clean_event_type(event_type)}</div>
            </div>
            <div className="card-time col-12">{convert(start_time)} to {convert(end_time)}</div>
            <div className="card-container">
                <div className="col-10">{description}</div>
                <div className="col-1"/>
                {
                    event_icon(110)[event_type]
                }
            </div>
        </Card>
        
    );
};

export default EventItem;