import React from 'react';
import './Track.css';

import firebase from "firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faLink } from '@fortawesome/free-solid-svg-icons';
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
    // c    onsole.log(doc);
   
    return (
        <tr className="track-information">
            <td>
                <img src={doc?.imgURL} alt={doc?.description} />
            </td>
            <td className="music-name">{doc?.name}</td>
            <td className="music-description">{doc?.description.slice(0, 50)}</td>
            <td>{"20 July"}</td>
            <td className="link-actions">
                <a target="_blank" href={`/link/${doc?.linksID}`}><FontAwesomeIcon className="view" icon={faLink} /></a>
                <FontAwesomeIcon className="delete" icon={faTrash} />
            </td>
        </tr>
    )
}

export default Track
