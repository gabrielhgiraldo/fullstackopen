import React from 'react';
import { Entry, EntryType } from '../types';
import { assertNever } from '../utils';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthCareEntry from './OccupationalHealthCareEntry';

const EntryDetails = ({ entry }: { entry: Entry }): JSX.Element => {
    switch(entry.type) {
        case EntryType.HealthCheck: 
            return <HealthCheckEntry entry={entry}></HealthCheckEntry>;
        case EntryType.Hospital:
            return <HospitalEntry entry={entry}></HospitalEntry>;
        case EntryType.OccupationalHealthcare:
            return <OccupationalHealthCareEntry entry={entry}></OccupationalHealthCareEntry>;
        default:
            assertNever(entry);
            return <></>;
    }
};

export default EntryDetails;