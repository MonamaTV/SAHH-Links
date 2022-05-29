import React, { useState, useContext, useEffect } from 'react';
import './UserDetails.css';
import Bio from './Bio';
import { AuthContext } from '../auth/Auth';
import firebase from 'firebase';
import { Helmet } from 'react-helmet';
import contentImage from '../assets/img/mainpicture.svg';
import User from './User';
import Loading from './Loading';
import Popup from './Popup';

function UserDetails() {
    const { currentUser } = useContext(AuthContext);
   
    const updateArtistName = (id) => {  
        // const updateRef = firebase.firestore().collection("musicinfo");
        // updateRef.where("userID", "==", id)
        // .onSnapshot((snap) => {
        //     snap.forEach((doc) =>{
        //         doc.ref.update({artist: name});
        //     }); 
        // });
    }

    const [img, setImg] = useState(null);

    const [userDetails, setUserDetails] = useState({
        name: "",
        file: null,
        email: "",
        description: ""
    });

    const fetchUserDescription = () => {
        const firestoreRef = firebase.firestore().collection("user");
        firestoreRef.doc(currentUser.uid).get().then(data => {
            if(data.exists) {
                setUserDetails({...userDetails, description: data.data()?.description});
            }
        });
    }

    useEffect(() => {
        if(currentUser) {
            setUserDetails({
                ...userDetails,
                name: currentUser?.displayName ?? "",
                email: currentUser?.email,
                file: currentUser?.photoURL,
                description: currentUser?.description
            });
            // fetchUserDescription();
        }
    }, [currentUser]);

    const handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserDetails({...userDetails, [name]: value});
    }

    const [photoUrl, setPhotoUrl] = useState("");
    const [doneUploading, setDoneUploading] = useState(false);

    //Upload user photo
    const uploadUserPhoto = async (file) => {
        const storageRef = firebase.storage().ref("profilepictures/" + file.name);
        storageRef.put(file).on("state_changed", state => {
            //While the total is < 100, then it's not done uploading, the loading component remains on the screen
            const total = (state.bytesTransferred  / state.totalBytes) * 100;
            total !== 100 ? setDoneUploading(true) : setDoneUploading(false);       
        }, error => {
            if(error)  {
                setPhotoUrl(null);
            }
        }, async () => {
            let url = await storageRef.getDownloadURL(); 
            setPhotoUrl(url);
        });
    }

    const uploadUserDetails = async () => {
        const user = firebase.auth().currentUser;
        //Get the user collection to update its description property
        const userInfo = firebase.firestore().collection("users");
        //Update the user
        await Promise.all([
            userInfo.doc(user?.uid).set({
                description: userDetails?.description
            }),
            user.updateProfile({
                displayName: userDetails.name ?? user?.displayName,
                photoURL: photoUrl ? photoUrl : user?.photoURL
            })
        ]);
    }

    useEffect(() => {
        //We wait for the photoUrl to change then we understand that there has been changes to the profile details
        const updateUser = async () => {
            try {
                if(photoUrl) {
                    // Get the user to update
                    uploadUserDetails();
                }
            } catch (error) {
                console.log(error);
            }
        }
        updateUser();
        return () => updateUser;
    }, [photoUrl]);
    
    const handleChangeUserDetails = async (e) =>  {
        e.preventDefault();
        try {
            //Assing a new url if there is a image selected 
            if(img) { await uploadUserPhoto(img);}
            else {
                uploadUserDetails();
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setImg(file);
            const imgUrl = URL.createObjectURL(file);
            setUserDetails({...userDetails, file: imgUrl});
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
                        <Bio/>
                    </div>
                    <div className="col-lg-1"></div>
                    <div className="col-lg-8 my-5 px-4 background">
                        <h4>Personal Information</h4>
                        <small>NB: Your email will not be visible to the public, only your stage name and description</small>
                        <User
                            user={userDetails}
                            handleChange={handleUserInput}
                            handleSubmit={handleChangeUserDetails}
                            handleImage={handleImageChange}
                        />
                    </div>
                </div>
            </div>
           <div className="popups">
               {
                   <Popup title={"Upload new profile picture"} >
                    <h1>New information </h1>
                    </Popup>
               }
           </div>
        </div>
    )
}
export default UserDetails;
