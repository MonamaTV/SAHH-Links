import React, { useContext, useState} from 'react';
import './Upload.css';
import './Forms.css';
import Links from './Links';
import AddLinks from './AddLinks';
import { AuthContext } from '../auth/Auth';
import Uploading from '../data/Uploading';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { Helmet } from 'react-helmet';

function Upload() {
    const {currentUser} = useContext(AuthContext);
    const [links, setLinks] = useState([]);//An empty list of platforms

    const [platforms, setPlatforms] = useState([
        {id: 1, platform: "YouTube"},
        {id: 2, platform: "Spotify"},
        {id: 3, platform: "AppleMusic"},
        {id: 4, platform: "Tidal"},
        {id: 5, platform: "SlikourOnLife"},
        {id: 6, platform: "Deezer"},
        {id: 7, platform: "Audiomark"},
        {id: 8, platform: "SoundCloud"},
        {id: 9, platform: "iTunes"}
    ])
    //
    const [link, setLink] = useState('');
    const [platform, setPlatform] = useState('');
    //Checks your step in the form submission
    const [step, setStep] = useState(1);
    // Music details; name and descripion the track and the cover art;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false)
    // To display the selected image before the upload
    const [imgURL, setImgURL] = useState(null);

    //Check error message
    const [imageError, setImageError] = useState(null);
    const [nameError, setNameError] = useState(null);
    const [descriptionError, setDescriptionError] = useState(null)

    const onAddLink = (e) => {
        if(link === "" || platform === ""){
            e.preventDefault();
            return;
        }
 
        const newLink = { 
            id: Math.random(), //Install
            [platform]: link,
        };

        //You cannot add the same platforms twice, so we remove it from the dropdown menu
        setPlatforms(platforms.filter(plat => plat.platform !== platform));
        
        setLinks([newLink, ...links]);
        
        setLink("");
        setPlatform("");
        e.preventDefault();
    }
    
    const onSelectPlatform = (e) => {
        setPlatform(e.target.value);
    }
    const onSetLink = (e) => {
        setLink(e.target.value);       
    }
    const onDelete = (id) => {
        //Return the platform to the array 
        const plat = links.find(link => link.id === id);
        const platname = Object.keys(plat)[1];

        let newElem = {id, platform: platname };

        if( window.confirm("Are you sure you want to delete this link?")) {
            setLinks(links.filter((link) => link.id !== id));
            setPlatforms([newElem, ...platforms]);
        }
            
    }
    const saveContinue = e => {

        if(!file) {
            setImageError("Insert your cover art");
            e.preventDefault();
            return;
        }else setImageError(null);

        if(name.length < 2)
        {
            setNameError("Name must at least have 2 characters");
            e.preventDefault();
            return;
        }
        else setNameError("");

        if(description.length < 3) {
            setDescriptionError("Description must at least have 3 characters");
            e.preventDefault();
            return;
        }
        else setDescriptionError(null);
        
        //Then move to the next screen
        setStep(step + 1);
        e.preventDefault();
    }

    const handleImage = (e) => {
        const types = ["image/png", "image/jpeg"];
        let selected = e.target.files[0];
        if(!selected) {
            setImageError("Please select correct image");
            return;
        }
       
        if(selected.size >= 3145728) //3mb
        {
            setImageError("Image too big, must be less than 3MB");
            e.target.files = null;
            return;
        }


        setImageError(null);
        let url = URL.createObjectURL(selected);
        if(!types.includes(selected.type))
            return;

          
        setImgURL(url);
        setFile(selected);
    }

 
    switch(step) {
        
        case 1: {
            return (
                <div className="upload-content form-container my-margin">
                    <Helmet>
                        <title>Upload Your Music</title>
                        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
                        <meta name="description" content="Upload your music"/>
                        <meta name="keywords" content="Music, Links, SAHHLinks"/>
                        {/* Twitter card */}
                        <meta name="twitter:card" content="summary" />
                        <meta name="twitter:site" content="@SA_HipHop_ZA" />
                        <meta name="twitter:title" content={`Upload your music`}  />
                        <meta name="twitter:description" content={`Upload your music`}/>
                    </Helmet>

                    <form autoComplete="off">
                        <h3>Upload Details</h3>
                        <div className="form-floating mb-2">
                           
                            <input 
                                onChange={handleImage}
                                type="file" 
                                accept="image/*" 
                                placeholder="cover art"/> 
                        </div>
                        {
                            imageError && <small className="text-danger">{imageError}</small>
                        }
                        <div className="img-review">
                            { imgURL && <img src={imgURL} alt=""/>}
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                                value={name}
                                type="text" 
                                className="form-control" 
                                placeholder="Track name"
                                onChange={(e) => setName(e.target.value)} />
                                
                            <label htmlFor="floatingPassword">Track name</label>
                            {
                                nameError && <small className="text-danger">{nameError}</small>
                            }
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                                value={description}
                                type="text" 
                                className="form-control"
                                placeholder="Description"
                                onChange={(e) => setDescription(e.target.value)} />
                               
                            <label htmlFor="floatingPassword">Track description</label>
                            {
                                descriptionError && <small className="text-danger">{descriptionError}</small>
                            }
                        </div>
                        
                        <div className="form-button mb-3">
                            <button onClick={(e) => saveContinue(e)}>
                                Save & Continue
                            </button>    
                        </div>
                    </form> 
                </div>
            )
        }
        case 2: {
            return (
               
               !uploading ? (<div className="upload-content form-container my-margin">
                    <small
                        onClick={() => setStep(step -1)} 
                        style={{cursor: 'pointer', textDecoration: 'underline'}}>
                        Go Back
                    </small>

                    <AddLinks
                        onAddLink={onAddLink}
                        platform={platform}
                        platforms={platforms} 
                        onSetLink={onSetLink} 
                        onSelectPlatform={onSelectPlatform}
                    /> 

                    <p 
                        onClick={() => {
                            if(links.length < 1) {
                                alert("You cannot publish empty links. Add at least 1");
                                return;
                            } else setUploading(true);
                        }}
                        style={{cursor: 'pointer', textDecoration: 'underline'}}
                        >
                        Click here to publish link(s)</p>
                    <div style={{width: '150px'}}>
                        <Links links={links} onDelete={onDelete} />
                    </div> 
                </div>) : (
                        <>
                            <Loading /> 
                            <Uploading 
                                file={file} 
                                name={name} 
                                description={description} 
                                links={links} 
                                uid={currentUser.uid} 
                                verified={currentUser.emailVerified}
                                artist={currentUser.displayName} />
                        </>
                    )
            ) 
        }
        default:
            return (<h1 className="my-margin">Something happened <Link to="/profile">Go back</Link></h1>) /** Do better error handling */
    }

    
}
export default Upload;
