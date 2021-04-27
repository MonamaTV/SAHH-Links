import React from 'react'
//importing assets
import './Howitworks.css';
import accountImage from '../assets/img/account.svg'
import worldImage from '../assets/img/aroundtheworld.svg'
import playerImage from '../assets/img/player.svg'
import mediaPlayerImage from '../assets/img/mediaplayer.svg'
import metricsImage from '../assets/img/metrics.svg'

export default function HowitWorks() {
    return (
        <div className="how-it-works">
            <div className="container">
                <div className="section-heading">
                    <h1>How it works</h1>
                    <small>With these simple steps, you will then share a link customised for your single or project</small>
                </div>
                <div className="row">
                    <div className="col-md-4">
                       <div className="section-card">
                            <img src={accountImage} alt="profile account" />
                            <div>
                                <h4>Setup Your Account</h4>
                                <p>You only need an email and you are set to go! That easy?</p>
                            </div>
                       </div>
                    </div>
                    <div className="col-md-4">
                        <div className="section-card">
                            <img src={worldImage} alt="profile account" />
                            <div>
                                <h4>Join Other Artists</h4>
                                <p>After the registering, you'd have joined other artists that chose SAHHLinks.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="section-card">
                            <img src={playerImage} alt="profile account" />
                            <div>
                                <h4>Start Uploading</h4>
                                <p>Upload all your music (links) before you could share them with the world.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="section-card">
                            <img src={mediaPlayerImage} alt="profile account" />
                            <div>
                                <h4>Share Your Links/Music</h4>
                                <p>The option to share your links has been easier.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="section-card">
                            <img src={metricsImage} alt="profile account" />
                            <div>
                                <h4>Visualise Your Audience*</h4>
                                <p>See which platform your audience prefers and make the right marketing decisions.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="section-card">
                            <img src={accountImage} alt="profile account" />
                            <div>
                                <h4>Start Sharing Your SAHHLinks now</h4>
                                <p>Also to put something here just tot to</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
