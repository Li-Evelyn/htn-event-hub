import React, { useEffect, useState } from "react"
import { history } from "../_helpers";
import axios from "axios";
import { EventList } from "./EventList";

const Overview = (props) => {
    let [events, setEvents] = useState([]);
    let [filter, setFilter] = useState();

    let fetchEvents = () => {
        axios.get(`https://api.hackthenorth.com/v3/graphql?query={ events { id name event_type permission start_time end_time description } }`)
        .then((res) => res.data)
        .then((data) => {
            data = data["data"]["events"];
            if (!localStorage.getItem("SIGNED_IN")) {
                data = data.filter((key) => key["permission"] === "public")
            }
            setEvents(data);
            console.log(data);
        })
        .catch((err) => console.error(`Error: ${err.message}`))
    }

    useEffect(() => {
        fetchEvents();
    }, [window.location.pathname, filter]);

    return (
        <>
            <div className="title-box">
                <div className="title">Events</div>
                <div className="title-sub">Click an event to learn more about it!</div>
            </div>
            <div className="list">
                <EventList events={events.sort((a, b) => a.start_time - b.start_time)}/>
                <div className="col-2 filter">FILTER ELEMENT</div>
            </div>
        </>
    )
}

export default Overview;