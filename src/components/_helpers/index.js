import history from "./history";
import convert from "./time_convert";
import { clean_event_type } from "./event_type_handlers"

export const event_colour = { "workshop" : "purple", "activity" : "green", "tech_talk" : "orange" };

export {
    history,
    convert,
    clean_event_type,
};