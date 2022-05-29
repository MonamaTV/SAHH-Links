import React, { useState, useContext, useEffect } from 'react';
import Bio from './Bio';
import { AuthContext } from '../auth/Auth';
import firebase from 'firebase';
import { Helmet } from 'react-helmet';
import contentImage from '../assets/img/mainpicture.svg';
import './Socials.css';
import SocialHandles from './SocialHandles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTiktok, faTwitch, faTwitter } from '@fortawesome/free-brands-svg-icons';

function Socials() {
    const { currentUser } = useContext(AuthContext);


    // const [loading, setLoading] = useState(false);
    const [code, setCode] = useState(null);
    const [name, setName] = useState(currentUser.displayName || '');
   
    const updateArtistName = (id) => {
        const updateRef = firebase.firestore().collection("musicinfo");
        updateRef.where("userID", "==", id)
        .onSnapshot((snap) => {
            snap.forEach((doc) =>{
                doc.ref.update({artist: name});
            }); 
        });
    }

   


    const onSave = (e) => {
        e.preventDefault();
        //Check if the display name has changed
        if(currentUser.displayName !== name) {
            const user = firebase.auth().currentUser;
            try {
                user.updateProfile({
                    displayName: name
                })
                .then(() => {
                    setCode("Your name has been changed");
                })
                .catch(() => {
                    setCode("Failed to change your name"); //Failure
                })
                .finally(() => {
                    updateArtistName( currentUser.uid);
                    setTimeout(() => { 
                        setCode(null);
                    }, 3000);
                })
            } catch (error) {
                setCode("Error: please try again");
                setTimeout(() => { 
                    setCode(null);
                }, 3000);
            }

        }
        
    }

    return (
        <div className="profile my-margin">
            <Helmet>
                <title>Personal Information</title>
                <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
                <meta name="description" content="All the links you have published"/>
                <meta name="keywords" content="Music, Links, SAHHLinks"/>
                {/* Twitter card */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@SA_HipHop_ZA" />
                <meta name="twitter:title" content="Your SAHHLinks Profile" />
                <meta name="twitter:description" content="All the links you have published"/>
                <meta name="twitter:image" content={contentImage} />
            </Helmet>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <Bio 
                            setName={setName}
                            email={currentUser.email}
                            name={name}
                            onSave={onSave}
                            code={code}
                        />
                    </div>
                    <div className="col-lg-1"></div>
                    <div className="col-lg-8 px-4 my-5 background">
                        <h4>Social Handles</h4>
                        <small>Make it easier for audience that visits your SAHHLinks profile to find you on your favorite social media</small>
                        <div className="supported">
                            <FontAwesomeIcon icon={faTiktok} className="tiktok"/>
                            <FontAwesomeIcon icon={faFacebook} className="facebook" />
                            <FontAwesomeIcon icon={faTwitter} className="twitter" />
                            <FontAwesomeIcon icon={faInstagram} className="instagram" />
                        </div>
                        <p>Paste the links of your accounts</p>
                        <SocialHandles />
                    </div>
                </div>
            </div>
          
        </div>
    )
}
export default Socials;
