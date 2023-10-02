import {
  Diagnosis,
  Discharge,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
  SickLeave,
  EntryWithoutId,
} from './types';
import { isString, parseDate } from './utils';

const parseDesc = (desc: unknown): string => {
  if (!isString(desc)) {
    throw new Error('Incorrect or missing Description');
  }
  return desc;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing Specialist');
  }
  return specialist;
};

const isArray = (param: unknown): param is unknown[] => {
  return param instanceof Array;
};

const isArrayString = (param: unknown[]): param is string[] => {
  return Boolean(!param.find((d) => !isString(d)));
};

const parseDiagnoses = (diagnoses: unknown): Array<Diagnosis['code']> => {
  if (!isArray(diagnoses) || !isArrayString(diagnoses)) {
    // throw new Error('Incorrect or missing Diagnoses');
  }
  return diagnoses as Array<Diagnosis['code']>;
};

const isNumber = (param: unknown): param is number => {
  return typeof param === 'number' || param instanceof Number;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((hcr) => hcr)
    .includes(param);
};

const parseHealthCheckRating = (param: unknown): HealthCheckRating => {
  if (!isNumber(param) || !isHealthCheckRating(param)) {
    throw new Error('Incorrect or missing data HealthCheckRating');
  }
  return param;
};

const parseEmployerName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing Employer Name');
  }
  return name;
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data Sick Leave');
  }
  if ('startDate' in object && 'endDate' in object) {
    if (!object.startDate && !object.endDate) return {} as SickLeave;
    return {
      startDate: parseDate(object.startDate),
      endDate: parseDate(object.endDate),
    };
  }
  throw new Error('Incorrect data: some fields at Sick Leave are missing');
};

const parseCriteria = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing Criteria');
  }
  return name;
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data Dicharge');
  }
  if ('date' in object && 'criteria' in object) {
    if (!object.date && !object.criteria) return {} as Discharge;
    return {
      date: parseDate(object.date),
      criteria: parseCriteria(object.criteria),
    };
  }
  throw new Error('Incorrect data: some fields at Dicharge are missing');
};

export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data entries');
  }
  if (
    'type' in object &&
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'diagnosisCodes' in object
  ) {
    const newEntry = {
      description: parseDesc(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnoses(object.diagnosisCodes),
    };
    if (object.type === 'HealthCheck' && 'healthCheckRating' in object) {
      const HealthEntry: Omit<HealthCheckEntry, 'id'> = {
        ...newEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
      return HealthEntry;
    }
    if (
      object.type === 'OccupationalHealthcare' &&
      'employerName' in object &&
      'sickLeave' in object
    ) {
      const OccupationalEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
        ...newEntry,
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
      };
      return OccupationalEntry;
    }
    if (object.type === 'Hospital' && 'discharge' in object) {
      const HospitalEntry: Omit<HospitalEntry, 'id'> = {
        ...newEntry,
        type: 'Hospital',
        discharge: parseDischarge(object.discharge),
      };
      return HospitalEntry;
    }
  }
  throw new Error('This is not Entry');
};

export default toNewEntry;
