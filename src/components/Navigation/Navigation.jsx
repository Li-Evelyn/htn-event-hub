import React, { useState, useEffect } from "react"
import { history } from "../_helpers";
import axios from "axios";
import { Nav } from "react-bootstrap";

const NavItems = [
    { label: "EVENTS", link: "/" },
    { label: "WRITE-UP", link: "/writeup"},
    { label: "SIGN IN", link: "/login"}
]

const Navigation = (props) => {
    const [darkMode, setDarkMode] = useState(false); // hehexd

    const toggleDarkMode = () => setDarkMode(!darkMode);

    useEffect(() => {
        const app = document.getElementById("App");
        if (darkMode) {
        app.classList.add("dark");
        app.classList.remove("light");
        } else {
        app.classList.remove("dark");
        app.classList.add("light");
        }
    }, [darkMode]);

    return (
        <div className="nav justify-content-end" activeKey="/">
            <div className="nav-item">
                <div onClick={toggleDarkMode} className="nav-text">{darkMode ? "LIGHT" : "DARK"} MODE</div>
            </div>
            {
                Object.keys(NavItems).map((key, value) => {
                    return (
                        <div className="nav-item">
                            <a className="nav-text" href={NavItems[key].link}>{NavItems[key].label}</a>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Navigation;