export function convert(timestamp) {
    var months = ["January", "February", "March", "April", "May", "June", 
                "July", "August", "September", "October", "November", "December"];
    
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    return `${month} ${day}, ${year} @ ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
}

export default convert;