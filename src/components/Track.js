import React from 'react';
import './Track.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, 
         faTwitter, 
         faWhatsapp,
        } 
from '@fortawesome/free-brands-svg-icons';

import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import firebase from "firebase";
function Track({doc}) {

    const deleteMusic = (id, linksID, imgURL) => {
        if(!window.confirm("Are you sure you want to delete this item? \n Note: This is permanent!"))
            return;

        // Need to delete two documents related to each in different collections
        const musicRef = firebase.firestore().collection("musicinfo").doc(id);
        const linkRef = firebase.firestore().collection("links").doc(linksID);
        const storageRef = firebase.storage();
        

        //Deletes track info
        musicRef.delete().then((doc) => {
            console.log("deleted info");
        })
        .catch((error) => {
            console.error(error);
        })

        //deleting image from storage
        storageRef.refFromURL(imgURL).delete().then(() => {
            console.log("Deleted image");
        }).catch(error => console.log(error));

        //Deletes links
        linkRef.delete().then(() => {
            console.log("deleted links");
        })
        .catch((error) => {
            console.error(error);
        })
    }
    return (
        <div className="track-card">
            <div className="track-image">
                <div className="delete-icon">
                    <FontAwesomeIcon  
                        icon={faTrash}
                        onClick={() => deleteMusic(doc.id, doc.linksID, doc.imgURL)} 
                        className="icons " 
                        alt="Delete icon"/>
                </div>
                <img src={doc?.imgURL} alt="Cover art" />
            </div>
            <Link to={`/link/${doc?.linksID}`} className="track-bio">
                <h5 className="music-name">{doc?.name}</h5>
                <small>{doc?.description}</small>
                <div className="media-links mt-1">
                    {/* <p>Share</p>  */}
                    <FontAwesomeIcon  
                        icon={faWhatsapp} 
                        className="icons whatsapp" 
                        alt="WhatsApp icon"/>
                    <FontAwesomeIcon  
                        icon={faFacebook} 
                        className="icons facebook" 
                        alt="Facebook icon"/>
                    <FontAwesomeIcon  
                        icon={faTwitter} 
                        className="icons twitter" 
                        alt="Twitter icon" />
                </div>
            </Link>
           
        </div>
    )
}

export default Track
