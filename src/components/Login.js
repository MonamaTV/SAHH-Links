import React, { useContext, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
 import firebase from '../data/firebase'
import './Forms.css'
import { Link, withRouter, useHistory } from 'react-router-dom';
import { AuthContext } from '../auth/Auth';
import Loading from './Loading';
import firebase_ from 'firebase';

function Login() {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);

    const printErrorMessage = (code) => {
        switch(code) {
            case "auth/wrong-password": {
                setErrorMessage("Your password is incorrect");
                break;
            }
            case "auth/user-not-found": {
                setErrorMessage("Account does not exist");
                break;
            }
            case "auth/operation-not-alloweed": {
                setErrorMessage("You are not permitted for this action");
                break;
            }
            case "auth/network-request-failed": {
                setErrorMessage("Check your internet connection");
                break;
            }
            default: {
                setErrorMessage("😥Please try again. Something happened...");
                break;
            }
        }
    }


    const handleSignIn = e => {
        e.preventDefault();
        setLoading(true);
        
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                history.push("/profile");
                setLoading(false);
            })
            .catch((error) => {
                printErrorMessage(error.code);
                setLoading(false);
            })        
    }
    //Uses Google authentication
    const googleSignAuth = (e) => {
        
        const provider = new firebase_.auth.GoogleAuthProvider();
        const signInRef = firebase.auth();

        signInRef.signInWithPopup(provider)
        .then(() => {
            history.push("/profile");
        })
        .catch((error) => {
           printErrorMessage(error.code);
        });
    }
    
    const { currentUser } = useContext(AuthContext);
    if(currentUser) {
        history.push("/profile");
    }

    return (
            !loading ? <div className="form-container my-margin">
                <form autoComplete="off" >
                    <h3>WELCOME BACK</h3>
                    <small>A click away from a convinient way of sharing links</small>
                    <div className="form-floating mb-4">
                        <input 
                            value={email}
                            type="email" 
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control" 
                            placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input 
                            value={password}
                            type="password" 
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control" 
                            placeholder="Passsword" />
                        <label htmlFor="floatingPassword">Password</label>
                        <small><a href="/changepassword">Forgot Password?</a></small>
                    </div>
                    <div className="form-button mb-3">
                        <button onClick={handleSignIn}>
                            Login                       
                        </button>
                        {
                            errorMessage && <small className="text-danger">{errorMessage}<br /></small>
                        }
                        <Link to="/register">
                            <small>New here? Register</small>
                        </Link>
                    </div>
                    <div className="form-sign">
                        <button type="button" onClick={googleSignAuth}>
                            <FontAwesomeIcon 
                                icon={faGoogle}
                                className="google-icon"
                            />
                            Login using Google
                        </button>
                    </div>
                </form>
            </div> : <Loading />
    )
}

export default withRouter(Login);