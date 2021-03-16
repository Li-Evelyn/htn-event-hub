import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { history } from "../_helpers";
import axios from "axios";

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);

    if (localStorage.getItem("SIGNED_IN")) {
        history.push("/");
    }

    let handleSubmit = () => {
        if (username === "typhlosion" && password === "baddinos") {
            localStorage.setItem("SIGNED_IN", true);
            console.log(localStorage.getItem("SIGNED_IN"));

        } else {
            setErrorVisible(true);
        }
    }

    return (
        <div className="login-container">
            <div className="title-box">
                <div className="title">Log In</div>
                <div className="">Sample (correct) credentials</div>
                <div className="title-sub">Username: "typhlosion"</div>
                <div className="title-sub">Password: "baddinos"</div>
            </div>
            <form className="login-form">
                <input className="login-input" placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input className="login-input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                {errorVisible && <div className="login-error">Incorrect credentials 😔</div>}
                <Button type="button" className="login-button" onClick={handleSubmit}>Submit</Button>
            </form>
        </div>
    )
}

export default Login;