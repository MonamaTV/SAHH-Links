import React from 'react'

const SocialHandles = () => {
    return (
        <form className="social-media">
            <div className="form-floating mb-3">
                <input 
                    type="text" 
                    className="form-control"
                    name="name"
                    placeholder="Facebook" />
                <label htmlFor="floatingPassword">Facebook</label>
            </div>  
            <div className="form-floating mb-3">
                <input 
                    type="email"
                    name="email"
                    className="form-control" 
                    placeholder="Twitter" />
                <label htmlFor="floatingPassword">Twitter</label>
            </div>  
            <div className="form-floating mb-3">
                <input 
                    type="email"
                    name="email"
                    className="form-control" 
                    placeholder="Instagram" />
                <label htmlFor="floatingPassword">Instagram</label>
            </div>  
            <div className="form-floating mb-3">
                <input 
                    type="email"
                    name="email"
                    className="form-control" 
                    placeholder="Tiktok" />
                <label htmlFor="floatingPassword">TikTok</label>
            </div>  
            <div className="form-floating mb-3">
                <button
                    >Save Changes
                </button>
            </div>  
        </form>
    )
}

export default SocialHandles
