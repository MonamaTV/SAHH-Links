import { useState, useEffect } from 'react';
import firebase from './firebase';

const useStorage = (image, links ) => {
    const [loadingState, setloadingState] = useState(0);
    const [url, setUrl] = useState(null);
    const [docId, setDocId] = useState(null);
    const [error, setError] = useState(null); 

    
    useEffect(() => {
        const storageRef = firebase.storage().ref(image.name);
        const linksRef = firebase.firestore().collection('links');

        storageRef.put(image).on("state_changed", (snap) => {
            const loading = parseInt((snap.bytesTransferred / snap.totalBytes) * 100);
            setloadingState(loading);
        },
        (error) => {
            setError(error);
        },
        async () => {
            const url = await storageRef.getDownloadURL();
            setUrl(url);
            linksRef.add({
                links
            })
            .then((doc) => {
                setDocId(doc.id);
            })
            .catch((error) => {
                setError(error);
            })  
        });

    }, [image, links]);

    return { docId, loadingState, error, url }

}
export default useStorage;