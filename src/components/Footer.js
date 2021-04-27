import React from 'react';
import  "./Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, 
         faTwitter, 
         faInstagram} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';

function Footer() {
    return (
        <div className="my-footer my-3 text-enter">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="footer-card">
                            <h4 className="my-3">SAHHLInks</h4>
                            <p>This platform was created for our fans/artists to have an easy way of sharing links. You no longer have to share tons of links to your stans. ONLY one then leave the rest to us...</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="footer-card">
                            <h4 className="my-3">Useful Links</h4>
                            <ul className="list">
                                <li><a href="/login" className="link">Login</a></li>
                                <li><a href="/register" className="link">Register</a></li>
                                <li><a href="/faq" className="link">FAQ</a></li>
                                <li><a href="register" className="link">Get Started</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="footer-card">
                            <h4 className="my-2">Contact Us</h4>
                            <div className="contacts ">
                                <div className="contact mb-2">
                                    <a href="mailto:@zahiphopinfo@gmail.com"><FontAwesomeIcon icon={faEnvelope} />Email: zahiphopinfo@gmail.com</a>
                                </div>
                                <div className="follow-up text-center my-2">
                                    <a href="https://www.facebook.com/SAhiphop.ZA" target="_blank"  rel="noreferrer" > <FontAwesomeIcon icon={faFacebook}  className="icons facebook"/> </a>
                                    <a href="https://twitter.com/SA_HipHop_ZA" target="_blank"  rel="noreferrer" > <FontAwesomeIcon icon={faTwitter}  className="icons twitter"/> </a>
                                    <a href="https://instagram.com/zahip_hop" target="_blank"  rel="noreferrer" > <FontAwesomeIcon icon={faInstagram}  className="icons instagram"/> </a>
                                </div>
                                <p className="text-center m-5">made with ❤ by the Coolest Admins in Africa</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
