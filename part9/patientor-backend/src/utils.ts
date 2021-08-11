import { Gender, NewPatient } from "./types";

const isString = (string: unknown): string is string => {
    return typeof string === 'string' || string instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing name: ${name}`);
    }
    return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error(`Incorrect or missing dateOfBirth: ${dateOfBirth}`);
    }
    return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect or missing ssn: ${ssn}`);
    }
    return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Incorrect or missing occupation: ${occupation}`);
    }
    return occupation;
};

type Fields = { 
    name: unknown,
    dateOfBirth: unknown,
    ssn: unknown,
    gender: unknown,
    occupation: unknown
};

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: []
    };
    return newPatient;
};