import React from 'react';
function AddLinks({platforms, onSetLink, onSelectPlatform, platform, onAddLink, errorMessage}) {

    const clearInputs = () => {
        document.querySelector('.my-select-input').selectedIndex = 0;
        document.querySelector('.my-control-input').value = '';
    }
    return (
        <div className="">
            <div className="counter">
                
            </div>
                <h3>Add Links</h3>
                <small>Paste the links that direct to your tract or project</small>
                <div className="input-group mb-1">
                    <select className="my-select-input" onChange={(e) => onSelectPlatform(e)}>
                        <option value="">Choose </option>
                        {
                            platforms.map((plat) => (
                                <option key={plat.id} value={plat.platform} >{plat.platform}</option>
                            ))
                        }  
                    </select>
                    <input 
                        onChange={(e) => onSetLink(e)}
                        type="text" 
                        className="my-control-input" 
                        placeholder={`Paste ${platform} Link`} 
                    />
                </div>
                
                <div className="form-button mb-3">
                    <button 
                        onClick={(e) => {
                            onAddLink(e);
                            clearInputs();
                        }}>
                        Add Link
                    </button>    
                </div>
        </div>    
    )
}

export default AddLinks;
