import firebase from 'firebase/app';

import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyCmlvVT9tinw8a2D_5n3C785gFQNM9x_Ng",
    authDomain: "sahhlinks-9edd5.firebaseapp.com",
    projectId: "sahhlinks-9edd5",
    storageBucket: "sahhlinks-9edd5.appspot.com",
    messagingSenderId: "1098033128528",
    appId: "1:1098033128528:web:ecf19c86a6b4875f709d55",
    measurementId: "G-F2CNN8PJZR"
});

export default app;

