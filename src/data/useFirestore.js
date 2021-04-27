import { useState, useEffect } from 'react';
import firebase from './firebase';

const useFirestore = (collection, uid) => {
    const [documents, setDocuments] = useState([]);
    const firestoreRef = firebase.firestore().collection(collection);

    useEffect(() => {
        firestoreRef
        .where("userID", "==", uid)
        .orderBy("date", "desc")
        .onSnapshot((snap) => {
            let dbCollection = [];
            snap.forEach(doc => {
                dbCollection.push({...doc.data(), id: doc.id})
            })
            setDocuments(dbCollection);
        });

        return () => firestoreRef;
    },[collection , uid, firestoreRef]);
    

    return { documents };
}
export default useFirestore;