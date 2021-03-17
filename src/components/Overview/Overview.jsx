import React, { useEffect, useState } from "react"
import axios from "axios";
import { EventList } from "./EventList";
import { Accordion, Card, ListGroup, Form } from "react-bootstrap";
import { ChevronUp, ChevronDown } from "react-bootstrap-icons";

const Overview = (props) => {
    let [events, setEvents] = useState([]);
    let [currentSort, setCurrentSort] = useState(localStorage.getItem("EVENT_SORT") ? localStorage.getItem("EVENT_SORT") : 0);
    let [activeKey, setActiveKey] = useState("-1");
    let [currentFilters, setCurrentFilters] = useState([]);

    // types of sorts
    const sorts = [
        { label: "Start time", fcn: (a, b) => a.start_time - b.start_time},
        { label: "Duration", fcn: (a, b) => (a.end_time - a.start_time) - (b.end_time - b.start_time)},
        { label: "Name", fcn: (a, b) => a.name.localeCompare(b.name)},
    ]

    // types of filters
    const filters = [
        { label: "Workshop", cmp: "workshop"},
        { label: "Tech Talk", cmp: "tech_talk"},
        { label: "Activity", cmp: "activity"},    
    ]

    // fetch the events and filter based on the currently-selected filters
    let fetchEvents = () => {
        axios.get(`https://api.hackthenorth.com/v3/graphql?query={ events { id name event_type permission start_time end_time description } }`)
        .then((res) => res.data)
        .then((data) => {
            data = data["data"]["events"];
            if (!localStorage.getItem("SIGNED_IN")) { // if the user is not signed in, filter out all private events
                data = data.filter((key) => key["permission"] === "public")
            }
            if (currentFilters.length) { // if filters are selected, filter accordingly (do not filter anything if no filters are selected)
                data = data.filter((key) => currentFilters.indexOf(key["event_type"]) > -1);
            }
            setEvents(data);
            console.log(data);
        })
        .catch((err) => console.error(`Error: ${err.message}`))
    }

    // update the events list whenever the page is navigated to or the sort/filter(s) have been changed
    useEffect(() => {
        fetchEvents();
    }, [window.location.pathname, currentSort, currentFilters]);

    // change the sort based off of the current sort - the items in the dropdown should always appear in the same 
    // order as that of their array placement or as close as possible (i.e. 012, 102, 201)
    let changeSort = (sort) => {
        let newSort = 0;
        if (sort == 1) {
            if (currentSort == 1) {
                newSort = 0;
            } else {
                newSort = (currentSort + 1) % 3;
            }  
        } else {
            if (currentSort == 1) {
                newSort = 2;
            } else {
                newSort = (currentSort + 2) % 3;
            }
        }
        localStorage.setItem("EVENT_SORT", newSort); // persist the sort type across refreshes
        setCurrentSort(newSort);
    }

    // add or remove filters depending on which boxes have been checked
    let handleFilter = (e) => {
        if (e.target.checked) {
            setCurrentFilters([...currentFilters, e.target.id]);
        } else {
            setCurrentFilters(currentFilters.filter((item) => item !== e.target.id));
        }
    }

    return (
        <>
            <div className="title-box">
                <div className="title">Events</div>
                <div className="title-sub">Click on an event to learn more about it!</div>
            </div>
            <div className="list">
                {/* event list */}
                <EventList events={events.sort(sorts[currentSort]["fcn"])}/>

                {/* sorting/filtering */}
                <div className="col-3 filter">
                    {/* sorting */}
                    <div className="">
                        <div className="card-title filter-title">Sort by...</div>
                        <Accordion activeKey={activeKey} onSelect={(e) => setActiveKey(e)}>
                            <Accordion.Toggle as={Card.Header} eventKey="0" className="filter-option selection">
                                {sorts[currentSort]["label"]}
                                { activeKey == "0" 
                                    ? <ChevronUp className="float-right" size={20}/> 
                                    : <ChevronDown className="float-right" size={20}/>
                                }
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <ListGroup>
                                    <ListGroup.Item className="filter-option selection" onClick={() => changeSort(1)}>{sorts[currentSort == 1 ? 0 : ((currentSort + 1) % 3)]["label"]}</ListGroup.Item>
                                    <ListGroup.Item className="filter-option selection" onClick={() => changeSort(2)}>{sorts[currentSort == 1 ? 2 : ((currentSort + 2) % 3)]["label"]}</ListGroup.Item>
                                </ListGroup>
                            </Accordion.Collapse>
                        </Accordion>
                    </div>
                    <br/>
                   
                    {/* filtering */}
                    <div>
                        <div className="card-title filter-title">Filter by...</div>
                        <Form className="" onChange={handleFilter}>
                            {filters.map((filter) => (
                                <div key={filter} className="filter-check">
                                    <Form.Check custom type="checkbox" id={filter["cmp"]} label={filter["label"]}/>
                                </div>
                            ))}
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Overview;