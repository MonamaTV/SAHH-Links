import React, { useState, useEffect, useContext} from 'react';
import './Header.css';

import { NavLink } from 'react-router-dom';
import { AuthContext } from '../auth/Auth';

function Header() {
    const { currentUser } = useContext(AuthContext);

    const [showBackground, setShowBackground] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10)
                setShowBackground(true) 
            else 
                setShowBackground(false);
        });
        return () => {
            window.removeEventListener("scroll", this);
        };
    }, []);

    return (
        <nav className={`navbar navbar-expand ${showBackground && 'navback'} ` }>
            <div className="container-fluid">
                <NavLink 
                    className="navbar-brand" 
                    to="/"><span>SAHH</span> Links
                </NavLink>
                <div className="collapse navbar-collapse" id="sahhLinks">
                <div className="navbar-nav p-5">
                    <NavLink 
                        to="/faq" 
                        className="nav-link" 
                        activeClassName="active-link">FAQs
                    </NavLink> 
                               
                    {
                        currentUser? 
                            <NavLink 
                                to="/profile" 
                                className="nav-link mr-auto" 
                                activeClassName="active-link">Profile
                            </NavLink>
                        :
                            <NavLink 
                                to="/login" 
                                className="nav-link mr-auto" 
                                activeClassName="active-link">Login
                            </NavLink>
                    }
                </div> 
                </div>
            </div>
        </nav>
    )
}
export default Header;  