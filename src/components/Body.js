import React from 'react';
import './Body.css';
import img1 from '../assets/img/preview.png';
import img2 from '../assets/img/img2.png';
import { 
    faItunes, 
    faYoutube, 
    faSpotify, 
    faApple, 
    faDeezer,
    faSoundcloud}
from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Body() {
    return (
        <div className="main-body">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="img-container">
                            <img src={img1} alt="preview"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card-container">
                            <h2>IT IS EASY TO USE - BUILD FOR EVERYONE</h2>
                            <h4>Free To Use</h4>
                            <p>You do not need financial backing for you to share your music with the rest of the world. All you need is to have an account with us...</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card-container">
                            <h3>IT IS MADE FOR EVERY ARTIST</h3>
                            <h6>WE SUPPORT MOST POPULAR STREAMING PLATFORMS</h6>
                            <p>We provide you with over a dozen of platforms to choose from when building your SAHHLink to share with your stans, below are some of the platforms we support.</p>
                            <ul className="brands">
                                <li><FontAwesomeIcon icon={faItunes} /> <span>Itunes</span> </li>
                                <li><FontAwesomeIcon icon={faDeezer} /> <span>Deezer</span> </li>
                                <li><FontAwesomeIcon icon={faApple} /> <span>Apple Music</span> </li>
                                <li><FontAwesomeIcon icon={faSpotify} /> <span>Spotify</span></li>
                                <li><FontAwesomeIcon icon={faYoutube} /> <span>YouTube</span> </li>
                                <li><FontAwesomeIcon icon={faSoundcloud} /> <span>SoundCloud</span> </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="img-container mobile__image">
                            <img src={img2} alt="preview"/>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Body
