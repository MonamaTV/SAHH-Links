import React from 'react';
import './Popup.css';

const Popup = ({children, closePopup, title}) => {

    return (
        <div className="popup__container">
            <div className="popup__header">
                <h3 className="heading">
                    {title}
                </h3>
                <button 
                    onClick={closePopup}
                    className="close__popup">
                </button>   
            </div>
            <div className="popup__content">
                {children}
            </div>
        </div>
    );
}

export default Popup;