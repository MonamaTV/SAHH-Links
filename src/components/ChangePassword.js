import React, { useState } from 'react';
import firebase from '../data/firebase';

import "./Forms.css";
function ChangePassword() {

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const printErrorMessage = (code) => {
        switch(code) {
            case "auth/wrong-password": {
                setMessage("Your password is incorrect");
                break;
            }
            case "auth/user-not-found": {
                setMessage("Account does not exist");
                break;
            }
            case "auth/operation-not-alloweed": {
                setMessage("You are not permitted for this action");
                break;
            }
            case "auth/network-request-failed": {
                setMessage("Check your internet connection");
                break;
            }
            default: {
                setMessage("😥Please try again. Something happened...");
                break;
            }
        }
    }
   

    const handlePasswordChange = (e) => {
        e.preventDefault();

        if(email === "") {
            setMessage("Enter a valid email address");
            return;
        }
        setMessage("");

        const updatePasswordRef = firebase.auth();
        updatePasswordRef.sendPasswordResetEmail(email).then(() => {
            setStep(step + 1);
        })
        .catch((error) => {
           printErrorMessage(error.code)
        })

    }

    switch(step)
    {
        case 1: {
            return (
                <div className="form-container my-margin">
                    <form autoComplete="off" >
                        <h3>CHANGE PASSWORD</h3>
                        <p>Enter your registered email</p>
                        <div className="form-floating mb-2">
                            <input 
                                value={email}
                                type="email" 
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control" 
                                placeholder="name@example.com" />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        {
                            message && <small className="text-danger">{message}<br /></small>
                        }
                        <div className="form-button">
                            <button onClick={handlePasswordChange}>
                                Next                         
                            </button>
                        </div>
                    </form>
                </div>
            )    
        }
        case 2: {
            return (
                <div className="form-container my-margin">
                    <form autoComplete="off" >
                        <h3>Sent Password Reset Email</h3>
                        <small>Follow proper guidelines for passwords</small>
                        <div className="form-floating mb-2">
                            <p>An email has been sent to your email address ({email}). Please follow the link and reset your password</p>
                            <br/>
                            <p>Once you are done: <a href="/login">Login</a></p>
                        </div>
                    </form>
                </div>
            )
        }
        default: {
            <div className="form-container my-margin">
                   <h3>Restart The Process</h3> 
                   <div className="form-button">
                        <button onClick={() => setStep(1)}>Go Back</button>
                   </div>
            </div>
            break;
        }
    }
}

export default ChangePassword;
