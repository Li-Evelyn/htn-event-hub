import React, { useState, useEffect, Component } from "react"
import { history, event_colour, clean_event_type, convert } from "../_helpers";
import { Card, ListGroup } from "react-bootstrap";
import axios from "axios";

const EventPage = ({ match, location }) => {
    const { params: { id }} = match;
    const [ event, setEvent ] = useState(null);
    const [ numREs, setNumREs ] = useState(0);
    const [ init, setInit ] = useState(false);
    const [ relatedEvents, setRelatedEvents ] = useState([]);
    let fetch_event = () => {
        let promises = [];
        let items = [];
        let pre_items = [];
        let num_rel_events = 0;
        promises.push(axios.get(`https://api.hackthenorth.com/v3/graphql?query={ event(id: ${id}) { id name event_type permission start_time end_time description speakers { name profile_pic } public_url private_url related_events } }`)
        .then((res) => res.data["data"]["event"])
        .then((data) => {
            setEvent(data);
            console.log(event);
            num_rel_events = data["related_events"].length;
            setNumREs(data["related_events"].length)
            pre_items = data["related_events"];
            console.log(pre_items);
        })
        .catch((err) => console.error(`Error message: ${err}`)))
        for (let i = 0; i < num_rel_events; i++) {
            promises.push(
                axios.get(`https://api.hackthenorth.com/v3/graphql?query={ event(id: ${pre_items[i]}) { id name permission } }`)
                .then((res) => res.data["data"]["event"])
                .then((data) => {
                    items.push(data);
                    console.log(data);
                })
                .catch((err) => console.error(`Error message: ${err}`))
            )
        }
        Promise.all(promises).then(() => setRelatedEvents(items)).then(setInit(true))
    };

    // let fetch_related_event_titles = () => {
    //     let promises = [];
    //     let items = [];
    //     for (let i = 0; i < numREs; i++) {
    //         promises.push(
    //             axios.get(`https://api.hackthenorth.com/v3/graphql?query={ event(id: ${event["related_events"][i]}) { id name permission } }`)
    //             .then((res) => res.data["data"]["event"])
    //             .then((data) => {
    //                 items.push(data);
    //             })
    //             .catch((err) => console.error(`Error message: ${err}`))
    //         )
    //     }
    //     Promise.all(promises).then(() => setRelatedEvents(items))
    // }

    useEffect(() => {
        fetch_event();
    }, []);

    // useEffect(() => {
    //     fetch_related_event_titles();
    // }, [event]);

    return (
        <>
            { event &&
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
                        <div className={`${numREs > 0 ? "left col-8" : ""}`}>
                            <div>{event["description"]}</div>
                            { event["speakers"].length != 0 &&
                                <div>
                                    <div>Speakers</div>
                                    {
                                        event["speakers"].map((speaker) => { // name + image
                                            return <div>{speaker["name"]}{speaker["profile_pic"] ? speaker["profile_pic"] : " no pic here"}</div>
                                        })
                                    }
                                </div>
                            }
                        </div>
                        { numREs > 0 &&
                            <div className="right col-3">
                                <div className="">Related Events</div>
                                <ListGroup>
                                    {
                                        relatedEvents.map((event) => {
                                            console.log(numREs);
                                            return <a href={`/event/${event["id"]}`}><ListGroup.Item >{event["name"]}</ListGroup.Item></a> // check for permissions here
                                        })
                                    }
                                </ListGroup>
                            </div>
                        }
                    </div>
                </div>   
            }
        </>
    )
}

export default EventPage;