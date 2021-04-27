import React from 'react'
import Link from './Link';
function Links({links, onDelete}) {
    return (
        <div> 
            {//Rendering the links added to the list before they get upload to the database
                links.map((link) => (
                    <Link link={link} key={link.id} onDelete={onDelete} />
                ))
            }
        </div>
    )
}
export default Links;
