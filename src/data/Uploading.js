import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import useStorage from './useStorage';
import firebase from 'firebase';

function Uploading({file, name, description, links, uid, verified, artist}) {
    
    const history = useHistory();
    const { docId, loadingState, error, url } = useStorage(file, links);
    

    useEffect(() => {
        const uploader = () => {
            if(loadingState >= 100 && docId != null && url != null) {

                const firestoreRef = firebase.firestore().collection('musicinfo');
                firestoreRef.add({
                    artist,
                    name,
                    description,
                    imgURL: url,
                    userID: uid,
                    verify: verified, 
                    linksID: docId,
                    date: firebase.firestore.Timestamp.now()
        
                }).then(() => {
                    history.push(`/link/${docId}`);  
                })
                .catch(() => {
                    history.push(`/upload`);
                });
            }
        }
        uploader();
    }, [loadingState, docId, error, url]);
    
    return (
        <div>
            <h5 className="text-center">{loadingState}%</h5>
            {error && <small>{error}</small>}
        </div>
    )
}

export default Uploading
