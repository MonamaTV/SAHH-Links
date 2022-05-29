import React, { useContext, useState } from 'react';
import './Bio.css';
import img from '../assets/img/20210130_215400.jpg';
import home from '../assets/img/home.png';
import user from '../assets/img/user.png';
import tag from '../assets/img/tag.png';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase';
import AccountVerification from '../AccountVerification';
import { AuthContext } from '../auth/Auth';

function Bio() {

    const [verification, setVerification] = useState(false);

    const { currentUser } = useContext(AuthContext);

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

    // if(verification) {
    //     return (
    //         <AccountVerification email={currentUser.email} />
    //     )
    // }

    return (
        <div className="bio-card my-margin">
            <div className="bio-text mt-3 mx-4">
                {/* <button onClick={handleLogout}className="logout">Logout<FontAwesomeIcon icon={faSignOutAlt}/></button>  */}
                <form autoComplete="off">
                    <div className="user-profile-img">
                        <img src={currentUser?.photoURL} />
                    </div>
                    <div className="form-floating mb-3">
                        <p>@{currentUser?.displayName}</p> 
                    </div>
                    <div className="bio-descri">
                        <p>{currentUser?.description}</p> 
                    </div>
                    <div>
                        <Link to="/upload" className="create-link-btn">Create Link</Link>
                        <ul className="user-links">
                            <li>
                                <Link to="/dashboard"><img src={home} /> Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/profile"><img src={user} /> Profile</Link>
                            </li>
                            <li>
                                <Link to="/socials"><img src={tag} /> Socials</Link>
                            </li>
                        </ul>
                    </div>
                    {/* <div className="form-floating mb-3">
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                       {message && <small className="text-success">{message}</small>}
                    </div> */}
                    
                    {/* <div className="form-button mb-3 new-btn"> */}
                        {/* <button onClick={onSave}>
                            Save Changes
                            { code && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}               
                        </button> */}
                        {/* { currentUser &&  currentUser.emailVerified? '' :<p className="underline onclick-verification my-2 underline" onClick={(e) => handleVerification(e)}>Verify account</p> } */}
                    {/* </div> */}
                </form>
            </div>         
        </div>
    )
}
export default Bio;
