import React, { useState } from 'react';
import './Bio.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import AccountVerification from '../AccountVerification';

function Bio({ setName, name, email, onSave, code}) {

    const [message, setMessage] = useState(code);
    const currentUser = firebase.auth().currentUser;
    const [verification, setVerification] = useState(false);

    const history = useHistory();
    //Sign out
    const handleLogout = () => {
        firebase.auth().signOut();
        history.push("/login");
    }
    const handleVerification = e => {
        e.preventDefault();
        //Send the verification email to the user to verify their account and get a badge
        currentUser.sendEmailVerification()
        .then(() => {
            setVerification(true);
        }).catch((error) => {
            console.log(error.code);
        });
    }
    if(verification) {
        return (
            <AccountVerification email={currentUser.email} />
        )
    }
    return (
        <div className="bio-card my-margin">
            <div className="bio-text mt-3 mx-4">
                <button onClick={handleLogout}className="logout">Logout<FontAwesomeIcon icon={faSignOutAlt}/></button> 
                <h3 className="lead">Your Profile</h3>
                <form autoComplete="off">
                    <div className="form-floating mb-3">
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                       {message && <small className="text-success">{message}</small>}
                    </div>
                    <div className="form-floating mb-3">
                        <input 
                            type="email" 
                            value={email}
                            readOnly
                        /> 
                    </div>
                    <div className="form-button mb-3 new-btn">
                        <button onClick={onSave}>
                            Save Changes
                            { code && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}               
                        </button>
                        { currentUser &&  currentUser.emailVerified? '' :<p className="underline my-2 underline" onClick={(e) => handleVerification(e)}>Verify account</p> }
                    </div>
                </form>
            </div>         
        </div>
    )
}
export default Bio;
