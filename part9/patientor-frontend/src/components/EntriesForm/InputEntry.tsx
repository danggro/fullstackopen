import { InputLabel, TextField } from '@mui/material';
import { Entry, OccupationalHealthcareEntry } from '../../types';

interface InputProps {
  label: string;
  value:
    | Entry['description' | 'diagnosisCodes' | 'specialist']
    | OccupationalHealthcareEntry['employerName'];
  setState: React.Dispatch<
    React.SetStateAction<Entry['description' | 'specialist']>
  >;
}

const InputEntry = ({ label, value, setState }: InputProps) => {
  return (
    <div>
      <InputLabel sx={{ fontSize: '0.9rem' }}>{label}</InputLabel>
      <TextField
        hiddenLabel
        variant="outlined"
        size="small"
        fullWidth={true}
        onChange={({ target }) => setState(target.value)}
        value={value}
      />
    </div>
  );
};

export default InputEntry;
