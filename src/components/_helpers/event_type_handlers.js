export function clean_event_type(event_type) {
    return event_type.replace("_", " ").toUpperCase();
}

export default clean_event_type;