import React from 'react';

function AccountVerification({email}) {
    return (
        <div className="form-container my-margin">           
            <h3>Account Verification Email has been sent to you...</h3>
            <small>Follow the instructions on the email sent to verify your account</small>
            <div className="form-floating mb-2">
                <p>Check your account: ({email})</p>
                <br/>
                <p>Go back to profile: <a href="/profile">Profile</a></p>
            </div>   
        </div>
    )
}

export default AccountVerification;
