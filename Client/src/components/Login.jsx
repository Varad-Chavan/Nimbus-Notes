import React, { useState,useContext } from 'react';
import './static/Login.css'; // Importing the CSS file
import { useNavigate } from "react-router-dom";

const Login = ({ writeAlert }) => {
    const navigate = useNavigate(); 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const host = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();

        localStorage.clear();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate('/');
            writeAlert("Logged in Successfully!", "success");
        } else {
            writeAlert("Kya kar raha LALA?", "danger");
        }
    };

    return (
        <div className={`login-container `}>
            <h2 className={``}>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <input
                        type="text"
                        id="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required minLength={8}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
