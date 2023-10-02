import data from '../../data/patients';
import {
  Entry,
  EntryWithoutId,
  NewPatientEntry,
  NonSensitivePatient,
  PatientsEntry,
} from '../types';
import { v1 as uuid } from 'uuid';
// const id = uuid();
const getAllPatients = (): NonSensitivePatient[] => {
  return data.map(({ id, name, occupation, gender, dateOfBirth }) => {
    return { id, name, occupation, gender, dateOfBirth };
  });
};

const getPatientById = (id: string): PatientsEntry | undefined => {
  return data.find((d) => d.id === id);
};

const addPatients = (object: NewPatientEntry): PatientsEntry => {
  const newPatients: PatientsEntry = {
    id: uuid(),
    ...object,
  };
  data.push(newPatients);
  return newPatients;
};

const addEntries = (object: EntryWithoutId, idPatient: string): Entry => {
  const newEntries: Entry = {
    id: uuid(),
    ...object,
  };
  const patient = data.find((d) => d.id === idPatient);
  patient?.entries.push(newEntries);
  return newEntries;
};

export default {
  getAllPatients,
  addPatients,
  getPatientById,
  addEntries,
};
