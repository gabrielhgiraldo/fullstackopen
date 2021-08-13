import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { HospitalEntry } from '../types';

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }): JSX.Element => {
    const [{ diagnoses },] = useStateValue();
    return (
    <Card fluid>
        <Card.Content>        
            <Card.Header>{entry.date}<Icon name="hospital" size="big"></Icon></Card.Header>
            <Card.Description>{entry.description}</Card.Description>
            <Card.Meta>discharged {entry.discharge.date}: {entry.discharge.criteria}</Card.Meta>
                <ul>
                {entry.diagnosisCodes && entry.diagnosisCodes.map(code => 
                    <li key={code}>{code} <i>{diagnoses[code].name}</i></li>
                )}
                </ul>
            <Card.Meta>specialist: {entry.specialist}</Card.Meta>
        </Card.Content>
    </Card>
    );
};

export default HospitalEntryDetails;