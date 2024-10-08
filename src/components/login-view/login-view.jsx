import React from "react";
import { useState } from "react";
import PropTypes from 'prop-types';

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        fetch("https://moo-movies-10a7ea08abc9.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
        .then((data) => {
            console.log("login response: ", data);
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
            } else {
                alert("no such user!")
            }
        })
        .catch((e) => {
            alert("something went wrong");
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
            </label>
            <label>
                Password:
                <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required
                />
            </label>
            <button type="submit">submit</button>
        </form>
    );
};

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};
