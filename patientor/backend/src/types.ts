export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Discharge {
    date: string;
    criteria: string
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

export enum Types {
    HealthCheck = "HealthCheck",
    Hospital = "Hospital",
    OccupationalHealthcare = "OccupationalHealthcare"
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    }
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    }
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

  // Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: Gender;
    occupation: string;
    ssn: string;
    entries: Entry[];
}

export type EditedPatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = Omit<Patient, "id" >;

export type newHealthCheck = Omit<HealthCheckEntry, "id">;

export type newOccupationalHealthcare = Omit<OccupationalHealthcareEntry, "id">;

export type newHospital = Omit<HospitalEntry, "id">;