import React, { useState, useEffect } from "react"
import { history } from "../_helpers";

const NavItems = [ // these are constant - dark/light mode label updates based on the mode, and sign in/out updates based of of that particular state
    { label: "EVENTS", link: "/" },
    { label: "WRITE-UP", link: "/writeup"}
]

const Navigation = () => {
    const stored_dark_mode = localStorage.getItem("DARK_MODE"); // persisting dark mode
    const [darkMode, setDarkMode] = useState(stored_dark_mode == "true");

    const toggleDarkMode = () => setDarkMode(!darkMode);

    let signed_in = localStorage.getItem("SIGNED_IN"); // check if the user is signed in

    // handles the click on the sign in/out button - log out if the user is signed in and redirect to the login page regardless
    const handleClick = () => {
        if (signed_in) {
            localStorage.removeItem("SIGNED_IN");
        }
        history.push("/login");
    }

    // toggle dark mode
    useEffect(() => {
        const arr = [document.getElementById("App"), document.getElementsByTagName("body")[0], document.getElementsByTagName("html")[0]];
        for (let elem of arr) {
            if (darkMode) {
                elem.classList.add("dark");
                elem.classList.remove("light");
            } else {
                elem.classList.remove("dark");
                elem.classList.add("light");
            }
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