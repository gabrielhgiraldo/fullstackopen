import React from 'react';
import { Card } from 'semantic-ui-react';
import { Entry } from '../types';
import EntryDetails from './EntryDetails';

const Entries = ({ entries }: { entries: Entry[] }): JSX.Element => {
    if (!entries.length) {
        return <></>;
    }
    return (
        <>
        <h2>entries</h2>
        <Card.Group>
            {entries.map(entry => 
                <EntryDetails entry={entry} key={entry.id}/>
            )}
        </Card.Group>
        </>
    );
};

export default Entries;