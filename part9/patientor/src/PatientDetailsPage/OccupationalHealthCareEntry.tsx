import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { OccupationalHealthCareEntry } from '../types';

const OccupationalHealthCareEntryDetails = ({ entry }: { entry:  OccupationalHealthCareEntry}): JSX.Element => {
    const [{ diagnoses },] = useStateValue();
    return (
    <Card fluid>
        <Card.Content>        
            <Card.Header>{entry.date}<Icon name="stethoscope" size="big"></Icon>{entry.employerName}</Card.Header>
            <Card.Description>{entry.description}</Card.Description>
            {entry.sickLeave && <Card.Meta>sick leave: {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}</Card.Meta>}
                <ul>
                {entry.diagnosisCodes && entry.diagnosisCodes.map(code => 
                    <li key={code}>{code} <i>{diagnoses[code].name}</i></li>
                )}
                </ul>
            <Card.Meta>Specialist: {entry.specialist}</Card.Meta>
        </Card.Content>
    </Card>
    );
};

export default OccupationalHealthCareEntryDetails;