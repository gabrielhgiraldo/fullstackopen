import patients from "../../data/patients";
import { NewPatient, Patient, PublicPatient } from "../types";
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
    if (patient) {
        return patient;
    }
    
    throw new Error('patient not found, check id.');
};

export default {
    getAll,
    addPatient,
    getPatient
};