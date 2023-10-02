import { InputLabel, TextField } from '@mui/material';
import { HealthCheckRating } from '../../types';

interface InputProps {
  label: string;
  value: HealthCheckRating;
  setState: React.Dispatch<React.SetStateAction<HealthCheckRating>>;
}

const InputHealth = ({ label, value, setState }: InputProps) => {
  return (
    <div>
      <InputLabel sx={{ fontSize: '0.9rem' }}>{label}</InputLabel>
      <TextField
        hiddenLabel
        variant="outlined"
        size="small"
        fullWidth={true}
        onChange={({ target }) => setState(parseInt(target.value))}
        value={value}
      />
    </div>
  );
};

export default InputHealth;
