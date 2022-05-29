import React from 'react';
import './Table.css';
import TableHead from './TableHead';

const Table = ({headers, children}) => {
    return (
        <table>
            <thead>
                <TableHead headers={headers} />
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    )
}

export default Table;
