import React from 'react';
import mainImage from '../assets/img/test.svg';
import './Showcase.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Showcase() {
    return (
        <div className="showcase my-margin mb-5">
             <Helmet>
                <title>SAHHLinks - share your music links in the most convienient way. Sign up for free!</title>
                <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
                <meta name="description" content="All the links you have published"/>
                <meta name="keywords" content="Music, Links, SAHHLinks"/>
                {/* Twitter card */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@SA_HipHop_ZA" />
                <meta name="twitter:title" content={`SAHHLinks - share your music links in the most convienient way. Sign up for free!`}  />
                <meta name="twitter:description" content={`All the links you have published`}/>
                <meta name="twitter:image" content={mainImage} />
            </Helmet>

            <div className="container-fluid">
                <div className="row">
                   <div className="col-md-7 my-5">
                        <img src={mainImage} width="100%" height="100%" alt="showcase "/>
                    </div>
                    <div className="col-md-5">
                       <div className="showcase-content my-2">    
                           <h1>Create a <span className="heading-stand">SAHHLink</span> and share it with the world</h1>
                           <p>SAHHLinks makes it easier for you to share links in the most convinient way. Sign up for free!         
                           </p>
                           <Link className="get-started-button" to="/register">Get Started</Link>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Showcase;

