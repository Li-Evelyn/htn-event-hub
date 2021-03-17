import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { history } from "../_helpers";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);

    const correct_username = "test";
    const correct_password = "1234";

    if (localStorage.getItem("SIGNED_IN")) {
        history.push("/");
    }

    let handleSubmit = () => {
        if (username === correct_username && password === correct_password) {
            localStorage.setItem("SIGNED_IN", true);
            console.log(localStorage.getItem("SIGNED_IN"));
            history.push("/");
        } else {
            setErrorVisible(true);
            setPassword("");
        }
    }

    return (
        <div className="login-container">
            <div className="title-box">
                <div className="title">Log In</div>
                <div className="">Sample (correct) credentials</div>
                <div className="title-sub">Username: {correct_username}</div>
                <div className="title-sub">Password: {correct_password}</div>
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