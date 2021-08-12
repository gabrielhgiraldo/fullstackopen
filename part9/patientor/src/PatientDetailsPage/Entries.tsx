import React from 'react';
import { Entry } from '../types';

export const Entries = ({ entries }: { entries: Entry[] }): JSX.Element => {
    if (!entries.length) {
        return <></>;
    }
    return (
        <>
        <h2>entries</h2>
        {entries.map(entry => 
            <div key={entry.id}>
                {entry.date} <i>{entry.description}</i>
                <ul>
                    {entry.diagnosisCodes && entry.diagnosisCodes.map(code => 
                        <li key={code}>{code}</li>
                    )}
                </ul>
            </div>
        )}
        </>
    );
};

export default Entries;