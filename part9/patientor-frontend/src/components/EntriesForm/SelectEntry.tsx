import { Button, Stack } from '@mui/material';
import { Type } from '../../types';

interface Props {
  setType: React.Dispatch<React.SetStateAction<Type>>;
}

const SelectEntry = ({ setType }: Props) => {
  return (
    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
      <Button
        size="small"
        variant="contained"
        onClick={() => setType(Type.Health)}
      >
        Health Check Entry
      </Button>
      <Button
        size="small"
        variant="contained"
        onClick={() => setType(Type.Occupation)}
      >
        Occupation Health Entry
      </Button>
      <Button
        size="small"
        variant="contained"
        onClick={() => setType(Type.Hospital)}
      >
        Hospital Entry
      </Button>
    </Stack>
  );
};

export default SelectEntry;
