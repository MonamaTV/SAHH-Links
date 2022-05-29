import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './UserDetails.css';
import './Forms.css';

const User = ({user, handleChange, handleSubmit, handleImage}) => {
    const { name, file, email, description } = user;
    return (
        <form className="user-details">
            <div className="form-floating user-img-floating mb-3">
                <img src={file} />
                <input 
                    name="photo" 
                    type="file" 
                    accept="" 
                    id="userImage"
                    onChange={handleImage} 
                />
               
                <label htmlFor="userImage"><FontAwesomeIcon icon={faCamera} /></label>
            </div>  
            <div className="form-floating mb-3">
                <input 
                    type="text" 
                    className="form-control"
                    value={name}
                    onChange={handleChange}
                    name="name"
                    placeholder="Name" />
                <label htmlFor="floatingPassword">Stage name</label>
            </div>  
            <div className="form-floating mb-3">
                <input 
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={email} 
                    className="form-control" 
                    placeholder="Email" />
                <label htmlFor="floatingPassword">Email</label>
            </div>  
            <div className="form-floating mb-3">
                <textarea 
                    value={description}
                    rows="100"
                    name="description"
                    onChange={handleChange}
                    className="form-control" 
                    placeholder="Description" >
                </textarea>
                <label htmlFor="floatingPassword">Description</label>
            </div>  
            <div className="form-floating mb-3">
                <button
                    onClick={handleSubmit}
                    >Save Changes
                </button>
            </div>  
        </form>
    )
}

export default User;
