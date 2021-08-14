export interface Diagnosis {
    code: string
    name: string
    latin?: string
}

export interface BaseEntry {
    id: string,
    date: string,
    specialist: string,
    description:string,
    diagnosisCodes?: Array<Diagnosis['code']>,
}

export enum EntryType {
    OccupationalHealthcare = 'OccupationalHealthcare',
    Hospital = 'Hospital',
    HealthCheck = 'HealthCheck'
}
export type SickLeave = {
    startDate: string,
    endDate: string
};

interface OccupationalHealthCareEntry extends BaseEntry {
    type: EntryType.OccupationalHealthcare,
    employerName: string,
    sickLeave?: SickLeave
}

export type Discharge = {
    date: string,
    criteria: string
};

interface HospitalEntry extends BaseEntry {
    type: EntryType.Hospital,
    discharge: Discharge,
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: EntryType.HealthCheck,
    healthCheckRating: HealthCheckRating
}


export type Entry = HospitalEntry | OccupationalHealthCareEntry | HealthCheckEntry;
// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type NewEntry = UnionOmit<Entry, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface Patient {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: Gender
    occupation: string,
    entries: Entry[]
}



export type NewPatient = Omit<Patient, 'id'>;
export type PublicPatient = Omit<Patient, 'ssn'|'entries'>;