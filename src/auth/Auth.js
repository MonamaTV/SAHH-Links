import React, { useState, useEffect } from "react";
import firebase from '../data/firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => setCurrentUser(user));
        
        const fetchData = () => {
            if(currentUser) {
                const firestoreRef = firebase.firestore().collection("users");
                firestoreRef.doc(currentUser.uid).get().then(data => {
                if(data.exists) {
                    const userDetails = data.data();
                        setCurrentUser({
                            ...currentUser, 
                            description: userDetails?.description,
                        });
                    }
                });
            }
        }
        //Call the function
        fetchData();
    }, [firebase]);

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );
};