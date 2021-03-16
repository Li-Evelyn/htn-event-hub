import history from "./history";
import convert from "./time_convert";
import { clean_event_type } from "./event_type_handlers"
import { PeopleFill, ChatQuoteFill, Hammer} from "react-bootstrap-icons";

export const event_colour = { "workshop" : "purple", "activity" : "green", "tech_talk" : "orange" };
export const event_icon = (size) => { return { "workshop": <Hammer size={size} className="purple"/>, 
                                               "activity": <PeopleFill size={size} className="green"/>,
                                               "tech_talk": <ChatQuoteFill size={size} className="orange"/>} }

export {
    history,
    convert,
    clean_event_type,
};