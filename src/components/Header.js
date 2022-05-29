import React, { useState, useEffect, useContext} from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes} from '@fortawesome/free-solid-svg-icons';
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

    const [menu, setMenu] = useState(false);
    const toggleMenu = () => {
        setMenu(!menu);
    }

    return (
        <nav className={`nav-bar ${showBackground && 'navback'} ` }>
            <div className="container-nav">
                <div className="toggler-menu">
                    <button
                        onClick={toggleMenu} 
                        className="menu"
                        >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <NavLink 
                        className="navbar-brand" 
                        to="/"><span>Shrt</span> Link
                    </NavLink>
                </div>
                <div className={`navbars ${menu && `visible-menu`}`}>
                    <button 
                        onClick={toggleMenu}
                        className="close-menu"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>   
                    <NavLink 
                        to="/" 
                        className="nav-link" 
                        exact={true}
                        activeClassName="active-link">Home
                    </NavLink> 
                    <NavLink 
                        to="/about" 
                        className="nav-link" 
                        activeClassName="active-link">About
                    </NavLink> 
                    <NavLink 
                        to="/faq" 
                        className="nav-link" 
                        activeClassName="active-link">FAQs
                    </NavLink> 
                               
                    {
                        currentUser? 
                            <NavLink 
                                to="/dashboard" 
                                className="nav-link mr-auto" 
                                activeClassName="active-link">Dashboard
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
        </nav>
    )
}
export default Header;  