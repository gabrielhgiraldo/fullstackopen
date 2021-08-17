import React from 'react';
import { Card, Icon, SemanticCOLORS} from 'semantic-ui-react';
import { useStateValue } from '../state';
import { HealthCheckEntry } from '../types';

const HealthCheckEntryDetails= ({ entry }: { entry: HealthCheckEntry }): JSX.Element => {
    const [{ diagnoses },] = useStateValue();
    const ratingColors: Array<SemanticCOLORS> = ["green", "yellow", "orange", "red"];
    return (
    <Card fluid>
        <Card.Content>        
            <Card.Header>{entry.date}<Icon name="user md" size="big"></Icon></Card.Header>
            <Card.Description>{entry.description}</Card.Description>
                <ul>
                {entry.diagnosisCodes && entry.diagnosisCodes.map(code => 
                    <li key={code}>{code} <i>{diagnoses[code].name}</i></li>
                )}
                </ul>
            <Icon name="heart" color={ratingColors[entry.healthCheckRating]}></Icon>
            <Card.Meta>specialist: {entry.specialist}</Card.Meta>
        </Card.Content>
    </Card>
    );
};

export default HealthCheckEntryDetails;