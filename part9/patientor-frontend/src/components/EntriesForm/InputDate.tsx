import { InputLabel } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
interface InputProps {
  label: string;
  value: Dayjs | null;
  setState: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}

const InputDate = ({ label, value, setState }: InputProps) => {
  return (
    <div>
      <InputLabel sx={{ fontSize: '0.9rem' }}>{label}</InputLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={value}
          onChange={(newValue) =>
            newValue ? setState(newValue) : setState(null)
          }
          format="YYYY-MM-DD"
          sx={{ width: '100%' }}
          slotProps={{ textField: { size: 'small' } }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default InputDate;
