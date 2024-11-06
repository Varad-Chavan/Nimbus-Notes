import React, {  } from 'react';
import './static/Navbar.css';
import { Link, useLocation } from 'react-router-dom';


function Navbar({ writeAlert }) {

    const token = localStorage.getItem('token');
    const isLoggedIn = token !== null;
    let location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        writeAlert("Logged Out Successfully", "success");
    };

    // Helper function to determine if the link is active
    const isActive = (path) => location.pathname === path ? "active" : "";

    return (
        <div className={`topnav light`}> {/* Apply theme class */}
            < Link className='Title' to="/">Nimbus Notes</Link>
            <Link className={isActive('/')} to="/">Home</Link>
            <Link className={isActive('/mynotes')} to="/mynotes">My Notes</Link>
            <Link className={isActive('/about')} to="/about">About</Link>

            <div className='Login'>
                
                {isLoggedIn ? (
                    <Link className={isActive('/login')} to='/login' onClick={handleLogout}>
                        Logout
                    </Link>
                ) : (
                    <Link className={isActive('/login')} to="/login">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Navbar;