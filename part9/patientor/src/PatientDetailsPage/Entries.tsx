import React from 'react';
import { Card } from 'semantic-ui-react';
import { Entry } from '../types';
import EntryDetails from './EntryDetails';
import AddEntryForm, { EntryFormValues } from './AddEntryForm';


const Entries = ({ entries, onSubmit }: { entries: Entry[], onSubmit: (values: EntryFormValues) => void }): JSX.Element => {
    if (!entries.length) {
        return <></>;
    }
    return (
        <>
        <h2>entries</h2>
        <AddEntryForm
                onSubmit={onSubmit}
                onCancel={() => console.log('cancelling')}
            />
        <Card.Group>
            {entries.map(entry => 
                <EntryDetails entry={entry} key={entry.id}/>
            )}
        </Card.Group>
        </>
    );
};

export default Entries;