import React, { useState, useEffect } from 'react';
import firebase from './firebase';

const useFetchUserDetails = () => {

    const [user, setUser] = useState({
        name: "",
        displayPhoto: "",
        description: "",
        email: ""
    });

    useEffect(() => {
        const currentUser = firebase.auth().currentUser;
        // Fetch user details
        const firestoreRef = firebase.firestore().collection("users");
        firestoreRef.doc(currentUser.uid).get().then(data => {
            if(data.exists) {
                const userDetails = data.data();
                setUser({
                    ...user, 
                    name: currentUser?.displayName,
                    email: currentUser?.email,
                    description: userDetails?.description,
                    displayPhoto: currentUser?.photoURL
                });
            }
        })
    }, []);

    return user;
};

export default useFetchUserDetails;