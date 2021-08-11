import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient } from '../types';

const PatientDetailsPage = (): JSX.Element => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{id: string}>();
    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                dispatch({ type: 'UPDATE_PATIENT', payload: patient });
            }
            catch (e) {
                console.error(e);
            }
        };
        if (!patients[id].ssn) {
            void fetchPatient();
        }
    },[dispatch]);

    return (
        <Container>
            <h1>
                {patients[id].name}
                <Icon name={patients[id].gender === 'male'?'mars': 'venus'}></Icon>
            </h1>
            <div>ssn: {patients[id].ssn}</div>
            <div>occupation: {patients[id].occupation}</div>
        </Container>
    );
};

export default PatientDetailsPage;