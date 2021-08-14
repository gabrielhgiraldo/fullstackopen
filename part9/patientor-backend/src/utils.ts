import { Gender, NewPatient, Entry, EntryType, Diagnosis, NewEntry, Discharge, HealthCheckRating, SickLeave } from "./types";

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

const isEntries = (entries: Array<unknown>): entries is Array<Entry> => {
    return entries.every(entry => 
        entry &&
        typeof entry === 'object' &&
        'type' in entry &&
        isString((<{type: unknown}>entry).type) &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.values(EntryType).includes((<{type: any}>entry).type)
    );
};

const parseEntries = (entries: unknown): Array<Entry> => {
    if(!entries || !Array.isArray(entries) || !isEntries(entries)) {
        throw new Error(`Incorrect or missing entries: ${entries}`);
    }
    return entries;

};

type patientFields = { 
    name: unknown,
    dateOfBirth: unknown,
    ssn: unknown,
    gender: unknown,
    occupation: unknown,
    entries: unknown
};

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries }: patientFields): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: parseEntries(entries)
    };
    return newPatient;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date: ${date}`);
    }
    return date;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error(`Incorrect or missing specialist: ${specialist}`);
    }
    return specialist;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)){
        throw new Error(`Incorrect or missing description: ${description}`);
    }
    return description;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (object: any): object is Discharge => {
    return (
        Boolean(object) &&
        typeof object === 'object' &&
        'date' in object &&
        isString(object.date) &&
        'criteria' in object &&
        isString(object.criteria)
    );
};

const parseDischarge = (discharge: unknown): Discharge => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error(`Incorrect or missing discharge: ${JSON.stringify(discharge)}`);
    }
    return discharge;
};

const parseType = (type: unknown): EntryType => {
    if(!type || !isString(type) || !Object.values<string>(EntryType).includes(type)) {
        throw new Error(`Incorrect or missing type: ${type}`);
    }
    return <EntryType>type;
};
const isNumber = (num: unknown): num is number => {
    return Number.isInteger(num);
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
    if(
        healthCheckRating === null || 
        healthCheckRating === undefined ||
        !isNumber(healthCheckRating) || 
        !(Object.values(HealthCheckRating).includes(healthCheckRating))
    ) {
        throw new Error(`Incorrect or missing healthCheckRating: ${healthCheckRating}`);
    }
    return healthCheckRating;
};

const parseEmployerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error(`Incorrect or missing employerName: ${employerName}`);
    }
    return employerName;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (sickLeave: any): sickLeave is SickLeave => {
    return (
        typeof(sickLeave) === 'object' &&
        'startDate' in sickLeave &&
        isString(sickLeave.startDate) && 
        ('endDate' in sickLeave) && 
        isString(sickLeave.endDate)
    );
};

const parseSickLeave = (sickLeave: unknown): SickLeave|undefined => {
    if (!sickLeave) return undefined;
    if(!isSickLeave(sickLeave)) {
        throw new Error(`Incorrect sickLeave: ${JSON.stringify(sickLeave)}`);
    }
    return sickLeave;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> => {
    if (!diagnosisCodes) return [];
    if (!Array.isArray(diagnosisCodes) || !diagnosisCodes.every(code => isString(code))){
        throw new Error(`Incorrect diagnosesCodes: ${diagnosisCodes}`);
    }
    return <string[]>diagnosisCodes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry => {
    const date = parseDate(object.date);
    const specialist = parseSpecialist(object.specialist);
    const description = parseDescription(object.description);
    const type = parseType(object.type);
    const diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    switch(type) {   
        case EntryType.Hospital:
            return {
                type,
                date,
                specialist,
                description,
                diagnosisCodes,
                discharge: parseDischarge(object.discharge)
            };
        case EntryType.HealthCheck:
            return {
                type,
                date,
                specialist,
                description,
                diagnosisCodes,
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
        case EntryType.OccupationalHealthcare:
            return {
                type,
                date,
                specialist,
                description,
                diagnosisCodes,
                employerName: parseEmployerName(object.employerName),
                sickLeave: parseSickLeave(object.sickLeave)
            };
        default:
            assertNever(type);
            return <never>{};
    }
};


/**
* Helper function for exhaustive type checking
*/
export const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};