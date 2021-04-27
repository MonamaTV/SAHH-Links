import React from 'react';
import './Loading.css';
function Loading({translateValue}) {
    return (
        <div className="loading-screen" style={{transform: `translateY(${translateValue}px)`}}>
            
            <div className="navbar-brand border-anim" >
                
            </div>
         
        </div>
    )
}
export default Loading;
