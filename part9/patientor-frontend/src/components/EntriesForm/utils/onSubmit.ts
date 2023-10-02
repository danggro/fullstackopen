import { Dayjs } from 'dayjs';
import {
  Discharge,
  Entry,
  HealthCheckRating,
  OccupationalHealthcareEntry,
  Patient,
  Type,
} from '../../../types';
import handleNewEntries from './handleNewEntries';
import patients from '../../../services/patients';
import axios from 'axios';

const onSubmit = async (
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
  type: Type,
  e: React.SyntheticEvent,
  id: Patient['id'],
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>,
  entries: Entry[],
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  e.preventDefault();
  try {
    const addedEntry = await patients.addEntries(
      handleNewEntries(
        description,
        specialist,
        diagnosisCodes,
        date,
        startDate,
        endDate,
        dateCriteria,
        healthCheckRating,
        employerName,
        criteria,
        type
      ),
      id
    );
    setEntries(entries.concat(addedEntry));
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      if (e?.response?.data && typeof e?.response?.data === 'string') {
        const message = e.response.data.replace(
          'Something went wrong. Error: ',
          ''
        );
        console.error(message);
        setError(message);
        setTimeout(() => {
          setError('');
        }, 3000);
      } else {
        setError('Unrecognized axios error');
      }
    } else {
      console.error('Unknown error', e);
      setError('Unknown error');
    }
  }
};

export default onSubmit;
