import React, { useState, useEffect } from "react"
import { history } from "../_helpers";
import axios from "axios";
import { Nav } from "react-bootstrap";

const NavItems = [
    { label: "EVENTS", link: "/" },
    { label: "WRITE-UP", link: "/writeup"}
]

const Navigation = (props) => {
    const stored_dark_mode = localStorage.getItem("DARK_MODE");
    const [darkMode, setDarkMode] = useState(stored_dark_mode == "true");

    const toggleDarkMode = () => setDarkMode(!darkMode);

    let signed_in = localStorage.getItem("SIGNED_IN");

    const handleClick = () => {
        if (signed_in) {
            localStorage.removeItem("SIGNED_IN");
        }
        history.push("/login");
    }

    useEffect(() => {
        const app = document.getElementById("App");
        if (darkMode) {
        app.classList.add("dark");
        app.classList.remove("light");
        } else {
        app.classList.remove("dark");
        app.classList.add("light");
        }
        localStorage.setItem("DARK_MODE", darkMode);
    }, [darkMode]);

    return (
        <div className="nav justify-content-end" activeKey="/">
            <div className="nav-item selection">
                <div onClick={toggleDarkMode} className="nav-text">{darkMode ? "LIGHT" : "DARK"} MODE</div>
            </div>
            {
                Object.keys(NavItems).map((key, value) => {
                    return (
                        <div className="nav-item selection">
                            <a className="nav-text" href={NavItems[key].link}>{NavItems[key].label}</a>
                        </div>
                    )
                })
            }
            <div className="nav-item selection">
                <div onClick={handleClick} className="nav-text">{signed_in ? "SIGN OUT" : "SIGN IN"}</div>
            </div>
        </div>
    )
}

export default Navigation;