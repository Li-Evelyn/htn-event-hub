import React, { useState, useEffect } from "react"
import { history, event_colour, clean_event_type, convert } from "../_helpers";
import { Card } from "react-bootstrap";
import placeholder from '../../assets/placeholder.png';
import axios from "axios";

const EventPage = ({ match, location }) => {
    const { params: { id }} = match;
    const [ event, setEvent ] = useState(null);
    const [ relatedEvents, setRelatedEvents ] = useState([]);

    let fetch_event = () => {
        let promises = [];
        let items = [];
        axios.get(`https://api.hackthenorth.com/v3/graphql?query={ event(id: ${id}) { id name event_type permission start_time end_time description speakers { name profile_pic } public_url private_url related_events } }`)
        .then((res) => res.data["data"]["event"])
        .then((data) => {
            if (data["permission"] == "private" && !localStorage.getItem("SIGNED_IN")) {
                history.push("/");
            }
            setEvent(data);
            for (let eve of data["related_events"]) {
                promises.push(
                    axios.get(`https://api.hackthenorth.com/v3/graphql?query={ event(id: ${eve}) { id name permission } }`)
                    .then((res) => res.data["data"]["event"])
                    .then((data) => {
                        items.push(data);
                    })    
                )
            }
            Promise.all(promises).then(() => setRelatedEvents(items)).catch((err) => console.error("Error message: ", err))
        })
    }

    useEffect(() => {
        fetch_event();
    }, []);

    return (
        <>
            { event && relatedEvents &&
                <div className="event">
                    <div className="title-box">
                        <div className="title">{event["name"]}</div>
                        <div className="title-sub-box">
                            <div className={`title-sub ${event_colour[event["event_type"]]} col-2 left`}>{clean_event_type(event["event_type"])}</div>
                            <div className="title-sub right">{convert(event["start_time"])} to {convert(event["end_time"])}</div>
                        </div>
                        <div className="title-sub-box-v">
                            { event["public_url"] && <div className="title-sub">Watch: <a className="url" href={`${event["public_url"]}`}>{event["public_url"]}</a></div>}
                            { event["private_url"] && <div className="title-sub">Join: <a className="url" href={`${event["private_url"]}`}>{event["private_url"]}</a></div>}
                        </div>
                    </div>
                    <div className="event-body">
                        <div className={`${relatedEvents.length > 0 ? "left col-8" : ""}`}>
                            <div className="event-section">
                                <div className="event-heading">About</div>
                                <div>{event["description"]}</div>
                            </div>
                            <div className="event-section">
                                { event["speakers"].length != 0 &&
                                    <div>
                                        <div className="event-heading">Speakers</div>
                                        {
                                            event["speakers"].map((speaker) => {
                                                return (
                                                    <Card>
                                                        <Card.Img variant="top" src={`${speaker["profile_pic"] ? speaker["profile_pic"] : placeholder}`} />
                                                        <Card.Body>
                                                            <Card.Title>{speaker["name"]}</Card.Title>
                                                        </Card.Body>
                                                    </Card>
                                                )
                                            })
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                            { relatedEvents.length > 0 &&
                                <div className="right col-4">
                                    <div className="event-heading">Related Events</div>
                                        {
                                            relatedEvents.map((event) => { //persmissions
                                                return <a className="card rel selection" href={`/event/${event["id"]}`}>{event["name"]}</a>
                                            })
                                        }
                                </div>
                            }
                        
                    </div>
                </div>   
            }
        </>
    )
}

export default EventPage;