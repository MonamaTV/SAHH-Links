import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes} from '@fortawesome/free-solid-svg-icons';
import './Upload.css';
function Link({link, onDelete}) {
    const platform = Object.keys(link)[1];
    
    return (
        <div className="card-music">
            <a
                target="_blank"
                rel="noreferrer"
                href={link[platform]}> 
                {platform}
            </a>
            <FontAwesomeIcon 
                className="times" 
                icon={faTimes} 
                onClick={() => onDelete(link.id)}/>
        </div>
    )
}

export default Link;
