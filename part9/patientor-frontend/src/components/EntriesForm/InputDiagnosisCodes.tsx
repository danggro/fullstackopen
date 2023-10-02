import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Diagnosis } from '../../types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, diagnosisCode: string[], theme: Theme) {
  return {
    fontWeight:
      diagnosisCode.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
interface Props {
  diagnostic: Diagnosis[];
  setState: React.Dispatch<React.SetStateAction<Array<Diagnosis['code']>>>;
}
function InputDiagnosisCode({ diagnostic, setState }: Props) {
  const theme = useTheme();
  const [diagnosisCode, setDiagnosisCode] = React.useState<
    Array<Diagnosis['code']>
  >([]);

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCode>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCode(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    setState(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <InputLabel>Diagnosis Code</InputLabel>
      <FormControl hiddenLabel fullWidth>
        <Select
          multiple
          value={diagnosisCode}
          onChange={handleChange}
          MenuProps={MenuProps}
          size="small"
        >
          {diagnostic
            .map((d) => d.code)
            .map((code) => (
              <MenuItem
                key={code}
                value={code}
                style={getStyles(code, diagnosisCode, theme)}
              >
                {code}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default InputDiagnosisCode;
