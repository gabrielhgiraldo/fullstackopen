import React from 'react';
import { useStateValue } from '../state';
import { Entry } from '../types';

const Entries = ({ entries }: { entries: Entry[] }): JSX.Element => {
    const [{ diagnoses },] = useStateValue();

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
                        <li key={code}>{code} <i>{diagnoses[code].name}</i></li>
                    )}
                </ul>
            </div>
        )}
        </>
    );
};

export default Entries;