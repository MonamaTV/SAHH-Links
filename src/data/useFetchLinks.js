import { useState, useEffect } from 'react';
import firebase from './firebase';

const useFetchLinks = (collection, uid) => {
    const [documents, setDocuments] = useState([]);
    const firestoreRef = firebase.firestore().collection(collection);

    useEffect(() => {
        firestoreRef
        .where("userID", "==", uid)
        .orderBy("date", "desc")
        .get()
        .then(data => {
            let dbCollections = [];
            data.forEach(item => {
                dbCollections.push(item.data());
            });
            setDocuments(dbCollections);
        })
        return () => firestoreRef;
    },[collection , uid, firestoreRef]);
    
    return { documents };
}
export default useFetchLinks;