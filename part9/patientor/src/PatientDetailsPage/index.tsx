import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { updatePatient, useStateValue } from '../state';
import { Entry, Patient } from '../types';
import { EntryFormValues } from './AddEntryForm';
import Entries from './Entries';

const PatientDetailsPage = (): JSX.Element => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{id: string}>();
    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                dispatch(updatePatient(patient));
            }
            catch (e) {
                console.error(e);
            }
        };
        if (!patients[id].ssn) {
            void fetchPatient();
        }
    },[dispatch]);

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            const {data: newEntry} = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, values);
            const updatedPatient = {
                ...patients[id],
                entries: [
                    ...patients[id].entries,
                    newEntry
                ]
            };
            dispatch(updatePatient(updatedPatient));
        } catch (e) {
        console.error(e.response?.data || 'Unknown Error');
        // setError(e.response?.data?.error || 'Unknown error');
      }
    };

    if (!patients[id].ssn) {
        return <></>;
    }
    return (
        <Container>
            <h1>
                {patients[id].name}
                <Icon name={patients[id].gender === 'male'? 'mars' : 'venus'}></Icon>
            </h1>
            <div>ssn: {patients[id].ssn}</div>
            <div>occupation: {patients[id].occupation}</div>
            <Entries 
                entries={patients[id].entries}
                onSubmit={submitNewEntry}/>
        </Container>
    );
};

export default PatientDetailsPage;