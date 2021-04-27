import React, { useEffect, useState } from 'react';
import './CustomLink.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWhatsapp, 
        faFacebook, 
        faTwitter}
from '@fortawesome/free-brands-svg-icons';
import DisplayLinks from './DisplayLinks';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import Loading from './Loading';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Helmet } from 'react-helmet';
import sadImage from '../assets/img/sad.svg';
import check from '../assets/img/check.svg';

function CustomLink() {

    const { docId } = useParams();
    const [info, setInfo] = useState(null);
    const [track, setTrack] = useState(true);
    const [links, setLinks] = useState(null);
    const [copyAlert, setCopyAlert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState(window.location.href);
    
    useEffect(() => {
        setLoading(true);
        const collectMusicInfo = () => {
            const firestoreRef = firebase.firestore().collection("links").doc(docId);

            const musicInfoRef = firebase.firestore().collection("musicinfo")
                                                    .where("linksID", "==", docId);
            firestoreRef.get()
            .then((docs) => {
                setLinks(docs.data())
            }).catch((error) => {
               setTrack(false);
            }).finally(() => {
               if(!links) {
                   setTrack(false)
               }
            })

            musicInfoRef.get()
            .then((docs) => {
               docs.forEach((doc) => {
                   let document = doc.data();
                    setInfo(document);
               })
            })
        };
        document.title = `${info?.artist || 'unknown'} - ${info?.name || 'unknown'}`;
        collectMusicInfo();
        setLoading(false);
    }, [docId, info?.name, info?.artist, info?.imgURL])

    const formatLink = () => {
        let trackInfo = `Check out new music by ${info?.artist} titled ${info?.name} 
        Link: ${getURL()}`;
        return trackInfo;
    }

    const getURL = () => window.location.href;
   
    if(track == false && !links) {
        return (
            <div className="link-section my-margin my-5">
                <div className="card px-3 py-5 lead text-center">
                    <img className="card-img-top" src={sadImage} alt="Link is broken"/>
                    <h3>It seems like the artsit may have deleted the link...</h3> 
                    <p className="text-info ">Please refresh the page if you think this is a mistake.</p>
                </div>
            </div>
        )
    }
    
    return (
        <>
            <Helmet>
                
                <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
                <meta name="description" content="All the links you have published"/>
                <meta name="keywords" content="Music, Links, SAHHLinks"/>
                
                {/* Twitter card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@SA_HipHop_ZA" />
                <meta name="twitter:title" content={`Check out new music by ${info?.artist} titled ${info?.name}`}  />
                <meta name="twitter:description" content={info?.description}/>
                <meta name="twitter:image" content={info?.imgURL} />
            </Helmet>

            {(!loading && info) ? (<div className="link-section my-margin my-5">
                <div className="card">
                    <img className="card-img-top" src={info?.imgURL} alt="artist cover art"/>

                    <div className="card-body">
                        <h5 className="music-info">
                            {info?.name} <span>by </span> 
                            <span className="artist-name">{info?.artist} 
                            {info?.verify? <img className="check-badge" src={check} alt="verification badge" /> : ''}
                            </span>
                        </h5>
                        
                        <p>{info?.description}</p> {/** To insert description of the track */}
                        <div className="media-links">
                            <p>Share Link With</p>
                            <small className="fb-share-button" data-href={`${getURL()}`} data-layout="button" data-size="small"><a target="_blank" rel="noreferrer" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"><FontAwesomeIcon  icon={faFacebook} className="icons facebook" alt="Facebook icon"/></a></small>
                            <a href={`https://wa.me/?text=${formatLink()}`} rel="noreferrer" target="_blank"><FontAwesomeIcon  icon={faWhatsapp} className="icons whatsapp" alt="WhatsApp icon"/></a>
                            <a href={`https://twitter.com/intent/tweet?text=${formatLink()}`} rel="noreferrer"target="_blank"><FontAwesomeIcon  icon={faTwitter} className="icons twitter" alt="Twitter icon" /></a>
                            
                            <CopyToClipboard 
                                onCopy={() => {
                                    setCopyAlert("Copied...")
                                    setUrl(window.location.href);
                                    setTimeout(() => setCopyAlert(null), 3000);
                                }} 
                                text={url}>
                                <span className="text-info"><FontAwesomeIcon  
                                icon={faClipboard} 
                                className="icons clipboard" 
                                alt="Clipboard icon" />{copyAlert}</span>
                            </CopyToClipboard>
                            
                        </div>
                    </div>
                </div>
                
                <div className="media-content">
                    <p>Listen</p>
                    {links && <DisplayLinks links={links}/>}
                </div>
            </div>) : <Loading />}
        </>
    )
}

export default CustomLink;
