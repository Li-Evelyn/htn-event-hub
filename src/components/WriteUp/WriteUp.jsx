import React, { useState } from "react";
import text from "../../assets/writeup.txt";


const WriteUp = () => {
    const [writeup, setWriteup] = useState("");
    fetch(text).then(t => t.text()).then((text) => setWriteup(text)); // grab the text from the asset file
    return (
        <div>
            <div className="title-box">
                <div className="title">Write Up</div>
            </div>
            <div className="writeup">
                {writeup}
            </div>
        </div>
    )
}

export default WriteUp;