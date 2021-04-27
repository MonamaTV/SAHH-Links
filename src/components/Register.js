import React, { useState, useContext } from 'react';
import './Forms.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import firebase from '../data/firebase';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../auth/Auth';
import Loading from './Loading';
import firebase_ from 'firebase';

function Register()  {

    const history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [matchingPassword, setMatchingPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Error handling messages
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
   
    const registerGoogleAcc = (e)  => {
        
        const provider = new firebase_.auth.GoogleAuthProvider();
        const signInRef = firebase.auth();

        signInRef.signInWithPopup(provider)
        .then(() => {
            history.push("/profile");
        })
        .catch((error) => {
           setError(error.message);
        });
    }

    function validateEmail(email) {
        const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email.match(mailformat)) {
            return true;
        }
        else return false;
    }

  

    const comparePasswords = (e) => {
        let password1 = e ? e.target.value :  null;
        if(password !== password1) {
            setMatchingPassword(true);
        }
        else {
            setPasswordErrorMessage("");
            setMatchingPassword(false); 
        }
    }

    const addDisplayName = () => {
        setLoading(true);
        const user = firebase.auth().currentUser;
        try {
            user.updateProfile({
                displayName: name
            })
        } catch (error) {
            setErrorMessage(error.code);
            setLoading(false);
        }
    }
    const validateUserInputs = () => {

        if(name === "") {
            setNameErrorMessage("Your name cannot be empty");
            return false;
        }
        else setNameErrorMessage("");

        if(!validateEmail(email)) {
            setEmailErrorMessage("Enter a valid email");
            return false;
        }
        else setEmailErrorMessage("");

        if(password === "") {
            setPasswordErrorMessage("Your password cannot be empty");
            return false;
        }
        else setPasswordErrorMessage("");
      

        if(password !== confirmPassword) {
            setPasswordErrorMessage("Your passwords have to match");
            return false;
        }
        else setPasswordErrorMessage("");
        
        return true;
    }
    const onSubmit = e => {

        e.preventDefault();
        if(!validateUserInputs()) {
            return;
        }

        setLoading(true);
        firebase
            .auth()
            .createUserWithEmailAndPassword (email, password)
            .then(() => {
                addDisplayName();
                history.push("/profile");
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            })
        
    }

    const { currentUser } = useContext(AuthContext);
    if(currentUser) {
        history.push("/profile");
    }
    return (
        !loading ? <div className="form-container my-margin">
            <form autoComplete="off" >
                <h3>LET'S GET STARTED</h3>
                <small>Provide us with these details, and we'll be set. </small>
                {error && <div className="bg-danger my-3 text-center rounded text-white">{error}</div>}

                <div className="form-floating mb-3">
                    <input 
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value) }
                        type="text" 
                        className="form-control" 
                        placeholder="name@example.com"
                        required 
                        />
                    <label 
                        htmlFor="floatingInput">Stage name
                    </label>
                    { nameErrorMessage && <small className="text-danger">{nameErrorMessage}</small>}
                </div>
                <div className="form-floating mb-3">
                    <input 
                        onChange={ (e) => setEmail(e.target.value)  }
                        value={email}
                        name="email"
                        type="email" 
                        className="form-control" 
                        placeholder="name@example.com"
                        required />
                        
                    <label 
                        htmlFor="floatingInput">Email address
                    </label>
                    { emailErrorMessage && <small className="text-danger">{emailErrorMessage}</small> }
                </div>
                <div className="form-floating mb-3">
                    <input 
                        name="password"
                        value={password}
                        onChange={ (e) => setPassword(e.target.value)  }
                        type="password" 
                        className="form-control" 
                        placeholder="Passsword"
                        required />
                    <label htmlFor="floatingPassword">Password</label>
                    { passwordErrorMessage && <small className="text-danger">{passwordErrorMessage}</small>}
                </div>
                <div className="form-floating mb-3">
                    <input 
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={ (e) => {comparePasswords(e); setConfirmPassword(e.target.value)} }
                        type="password" 
                        className="form-control" 
                        placeholder="Passsword"
                        required />
                    <label htmlFor="floatingPassword">Confirm Password</label>
                    { matchingPassword && <small className="text-danger">Passwords do not match...</small>}
                </div>
                <div className="form-button mb-3">
                    <button onClick={onSubmit}>
                        Register Account
                    </button>
                    <Link to="/login">
                        <small>Have account? Login</small>
                    </Link>
                </div>
                <div className="form-sign">
                    <button type="button" onClick={registerGoogleAcc}>
                        <FontAwesomeIcon 
                            icon={faGoogle}
                            className="google-icon"   
                            />
                            Register using Google
                    </button>
                </div>
            </form>
        </div> : <Loading />
    )
}

export default Register;