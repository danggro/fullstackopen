import { Dayjs } from 'dayjs';
import {
  BaseEntry,
  Diagnosis,
  Discharge,
  Entry,
  EntryWithoutId,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
  SickLeave,
  Type,
} from '../../../types';

const handleNewEntries = (
  description: Entry['description'],
  specialist: Entry['specialist'],
  diagnosisCodes: Entry['diagnosisCodes'],
  date: Dayjs | null,
  startDate: Dayjs | null,
  endDate: Dayjs | null,
  dateCriteria: Dayjs | null,
  healthCheckRating: HealthCheckRating,
  employerName: OccupationalHealthcareEntry['employerName'],
  criteria: Discharge['criteria'],
  type: Type
): EntryWithoutId => {
  let baseEntry: Omit<BaseEntry, 'id'> = {
    date: date ? date.format('YYYY-MM-DD') : ('' as Entry['date']),
    description,
    specialist,
    diagnosisCodes: diagnosisCodes
      ? diagnosisCodes
      : ([] as Array<Diagnosis['code']>),
  };

  switch (type) {
    case Type.Health:
      let newHealthEntry: Omit<HealthCheckEntry, 'id'> = {
        ...baseEntry,
        healthCheckRating,
        type: type as HealthCheckEntry['type'],
      };
      return newHealthEntry;

    case Type.Occupation:
      let newOccupationEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
        ...baseEntry,
        employerName,
        sickLeave: {
          startDate: startDate
            ? startDate.format('YYYY-MM-DD')
            : ('' as SickLeave['startDate']),
          endDate: endDate
            ? endDate.format('YYYY-MM-DD')
            : ('' as SickLeave['endDate']),
        },
        type: type as OccupationalHealthcareEntry['type'],
      };
      return newOccupationEntry;
    case Type.Hospital:
      let newHospitalEntry: Omit<HospitalEntry, 'id'> = {
        ...baseEntry,
        discharge: {
          date: dateCriteria
            ? dateCriteria.format('YYYY-MM-DD')
            : ('' as Discharge['date']),
          criteria,
        },
        type: type as HospitalEntry['type'],
      };
      return newHospitalEntry;
  }
};

export default handleNewEntries;
