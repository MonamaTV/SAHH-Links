import React from 'react';

const TableHead = ({headers}) => {
    return (
        <tr>
            { headers && headers.map((th, index) => <th key={index}>{th}</th>)}
        </tr>
    )
}

export default TableHead;
