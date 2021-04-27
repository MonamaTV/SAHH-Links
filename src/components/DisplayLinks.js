import React from 'react'
import './CustomLink.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faItunes, 
        faYoutube, 
        faSpotify, 
        faApple, 
        faDeezer,
        faSoundcloud} from '@fortawesome/free-brands-svg-icons';


//Logos that are  not included in the fontawesome package
import slikour from '../assets/img/slikour.webp';
import audiomack from '../assets/img/audiomack.png';
import tidal from '../assets/img/tidal.png';

function DisplayLinks({links}) {
    
    const newLinks = [...links.links];
    
    return (
        <div>
            {
                newLinks.map((link) => {            
                    return (
                        <div key={link.id}>
                            {link.SlikourOnLife && <a target="_blank" rel="noreferrer" href={link.SlikourOnLife}><img src={slikour} className="icons slikour" alt="slikourOnLife logo"/>SlikourOnLife </a>}
                            {link.YouTube && <a target="_blank" rel="noreferrer"  href={link.YouTube}><FontAwesomeIcon icon={faYoutube} className="icons youtube"/>YouTube </a>}
                            {link.Spotify && <a target="_blank" rel="noreferrer" href={link.Spotify}><FontAwesomeIcon icon={faSpotify} className="icons spotify"/>Spotify </a>}
                            {link.iTunes && <a target="_blank" rel="noreferrer" href={link.iTunes}><FontAwesomeIcon icon={faItunes} className="icons itunes"/>iTunes </a> }
                            {link.Soundcloud && <a target="_blank" rel="noreferrer" href={link.Soundcloud}><FontAwesomeIcon icon={faSoundcloud} className="icons soundcloud"/>SoundCloud </a>}
                            {link.AppleMusic && <a target="_blank" rel="noreferrer" href={link.AppleMusic}><FontAwesomeIcon icon={faApple} className="icons applemusic"/>Apple Music </a>}
                            {link.Audiomark && <a target="_blank" rel="noreferrer" href={link.Audiomark}><img src={audiomack} className="icons slikour" alt="Audiomack logo"/>Audiomack </a>}
                            {link.Deezer && <a target="_blank" rel="noreferrer" href={link.Deezer}><FontAwesomeIcon icon={faDeezer} className="icons deezer"/>Deezer </a>}
                            {link.Tidal && <a target="_blank" rel="noreferrer" href={link.Tidal}><img src={tidal} className="icons slikour" alt="Tidal logo"/>Tidal </a>}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DisplayLinks
