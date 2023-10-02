import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Diagnosis, Entry, Patient } from '../../types';
import patients from '../../services/patients';
import diagnoses from '../../services/diagnoses';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntriesList from './EntriesList';
import { Button } from '@mui/material';
import EntriesForm from '../EntriesForm';

const PatientInfo = () => {
  const [patient, setPatient] = useState<Patient>({} as Patient);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [diagnostic, setDiagnostic] = useState<Diagnosis[]>([]);
  const [newEntry, setNewEntry] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      const data = await patients.getPatientById(params.id);
      const dataDiagnoses = await diagnoses.getAllDiagnoses();
      setPatient(data);
      setDiagnostic(dataDiagnoses);
      setEntries(data.entries);
    };
    void fetchPatient();
  }, [params]);

  if (!patient || !diagnostic) {
    return <p>loading ...</p>;
  }

  return (
    <div>
      <h2>
        {patient.name}{' '}
        {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
      </h2>
      <div>
        <span>ssh: {patient.ssn}</span>
        <br />
        <span>occupation: {patient.occupation}</span>
      </div>
      {newEntry && (
        <EntriesForm
          onClose={setNewEntry}
          entries={entries}
          setEntries={setEntries}
          id={patient.id}
          diagnostic={diagnostic}
        />
      )}
      <EntriesList entries={entries} diagnostic={diagnostic} />
      <Button
        variant="contained"
        onClick={() => setNewEntry(true)}
        sx={{ marginTop: '1rem' }}
      >
        ADD NEW ENTRY
      </Button>
    </div>
  );
};

export default PatientInfo;
