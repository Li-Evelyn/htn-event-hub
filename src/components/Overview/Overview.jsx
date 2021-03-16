import React, { useEffect, useState } from "react"
import axios from "axios";
import { EventList } from "./EventList";
import { Accordion } from "react-bootstrap";
import { ChevronUp, ChevronDown } from "react-bootstrap-icons";

const Overview = (props) => {
    let [events, setEvents] = useState([]);
    let [currentFilters, setCurrentFilter] = useState();
    let [currentSort, setCurrentSort] = useState(2);
    let [filtersExpanded, setFiltersExpanded] = useState(false);
    let [activeKey, setActiveKey] = useState("-1");

    const sorts = [
        { label: "Start time", fcn: (a, b) => a.start_time - b.start_time},
        { label: "Duration", fcn: (a, b) => (a.end_time - a.start_time) - (b.end_time - b.start_time)},
        { label: "Name", fcn: (a, b) => a.name.localeCompare(b.name)}
    ]

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
    }, [window.location.pathname, currentFilters, currentSort]);

    return (
        <>
            <div className="title-box">
                <div className="title">Events</div>
                <div className="title-sub">Click on an event to learn more about it!</div>
            </div>
            <div className="list">
                <EventList events={events.sort(sorts[currentSort]["fcn"])}/>
                <div className="col-2 filter">
                    {/* <Accordion>
                        <Accordion.Toggle>
                            <div>Filters</div>
                            { filtersExpanded ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                        </Accordion.Toggle>
                        <Accordion.Collapse>

                        </Accordion.Collapse>
                    </Accordion> */}
                </div>
            </div>
        </>
    )
}

export default Overview;