import patients from "../../data/patients";
import { 
    NewPatient,
    Patient,
    PublicPatient,
    Entry,
    NewEntry
} from "../types";
import { v1 as uuid } from 'uuid';

const getAll = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

const getPatient = (id: string): Patient => {
    const patient = patients.find(patient => patient.id === id);
    if (!patient) throw new Error('patient not found, check id');

    return patient;
};

const addPatientEntry = (id: string, entry: NewEntry): Entry => {
    const patientIndex = patients.findIndex(patient => patient.id === id);
    if (patientIndex === -1) throw new Error('patient not found, check id');
    const newEntry = {
        ...entry,
        id: uuid()
    };

    patients[patientIndex] = {
        ...patients[patientIndex],
        entries: [
            ...patients[patientIndex].entries,
            newEntry
        ]
    };
    return newEntry;
};

export default {
    getAll,
    addPatient,
    getPatient,
    addPatientEntry
};