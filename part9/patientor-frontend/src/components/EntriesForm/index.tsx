import { Alert, Button, Container, Stack } from '@mui/material';
import { useState } from 'react';
import {
  Diagnosis,
  Discharge,
  Entry,
  HealthCheckRating,
  OccupationalHealthcareEntry,
  Type,
} from '../../types';
import InputEntry from './InputEntry';
import InputHealth from './InputHealth';
import InputDiagnosisCode from './InputDiagnosisCodes';
import dayjs, { Dayjs } from 'dayjs';
import InputDate from './InputDate';
import SelectEntry from './SelectEntry';
import onSubmit from './utils/onSubmit';

interface EntriesFormProps {
  id: Entry['id'];
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  diagnostic: Diagnosis[];
}

const EntriesForm = ({
  id,
  entries,
  setEntries,
  onClose,
  diagnostic,
}: EntriesFormProps) => {
  const [description, setDescription] = useState<Entry['description']>('');
  const [date, setDate] = useState<Dayjs | null>(dayjs);
  const [specialist, setSpecialist] = useState<Entry['specialist']>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis['code']>
  >([]);
  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(0);
  const [employerName, setEmployerName] =
    useState<OccupationalHealthcareEntry['employerName']>('');
  const [error, setError] = useState('');
  const [type, setType] = useState<Type>(Type.Health);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [dateCriteria, setDateCriteria] = useState<Dayjs | null>(null);
  const [criteria, setCriteria] = useState<Discharge['criteria']>('');

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    onSubmit(
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
      type,
      e,
      id,
      setEntries,
      entries,
      setError
    );
  };

  return (
    <div
      style={{
        border: '2px dotted black',
        padding: '0.5rem 1rem',
        marginTop: '1rem',
      }}
    >
      <SelectEntry setType={setType} />
      {type === Type.Health && <h4>New Health Check Entry</h4>}
      {type === Type.Occupation && <h4>New Occupation Check Entry</h4>}
      {type === Type.Hospital && <h4>New Hospital Entry</h4>}
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleOnSubmit}>
        <Stack direction="column">
          <InputEntry
            label="Description"
            setState={setDescription}
            value={description}
          />
          <InputDate label="Date" setState={setDate} value={date} />
          <InputEntry
            label="Specialist"
            setState={setSpecialist}
            value={specialist}
          />
          {type === Type.Health && (
            <InputHealth
              label="Healthcheck Rating"
              setState={setHealthCheckRating}
              value={healthCheckRating}
            />
          )}
          {type === Type.Occupation && (
            <>
              <InputEntry
                label="Employer Name"
                setState={setEmployerName}
                value={employerName}
              />
              <span>Sick Leave</span>
              <Container>
                <InputDate
                  label="Start Date"
                  setState={setStartDate}
                  value={startDate}
                />

                <InputDate
                  label="End Date"
                  setState={setEndDate}
                  value={endDate}
                />
              </Container>
            </>
          )}
          {type === Type.Hospital && (
            <>
              <span>Discharge</span>
              <Container>
                <InputDate
                  label="Date"
                  setState={setDateCriteria}
                  value={dateCriteria}
                />
                <InputEntry
                  label="Criteria"
                  setState={setCriteria}
                  value={criteria}
                />
              </Container>
            </>
          )}
          <InputDiagnosisCode
            diagnostic={diagnostic}
            setState={setDiagnosisCodes}
          />
        </Stack>

        <Stack
          direction="row"
          sx={{
            width: '100%',
            justifyContent: 'space-between',
            marginBlock: '0.5rem',
          }}
        >
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => onClose(false)}
          >
            CANCEL
          </Button>
          <Button size="small" color="info" variant="contained" type="submit">
            ADD
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default EntriesForm;
