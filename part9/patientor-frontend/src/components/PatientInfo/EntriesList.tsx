import { Entry, Diagnosis } from '../../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import { List, ListItem, Stack } from '@mui/material';
import { ReactNode } from 'react';

interface EntriesProps {
  entries: Entry[];
  diagnostic: Diagnosis[];
}

const DiagnosisCodes = ({
  diagnosisCodes,
  diagnosis,
}: {
  diagnosisCodes: Entry['diagnosisCodes'];
  diagnosis: Diagnosis[];
}) => {
  return (
    <>
      {diagnosisCodes && diagnosisCodes.length !== 0 && (
        <List>
          Diagnoses:
          {diagnosisCodes.map((dc) => {
            const theDiag = diagnosis.find((d) => d.code === dc);
            return (
              <ListItem key={dc}>
                {dc} {theDiag && theDiag.name}
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
};

const StackEntries = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{
        padding: '0.75rem',
        borderRadius: '0.5rem',
        border: '1px solid black',
      }}
    >
      {children}
    </Stack>
  );
};

const EntriesList = ({ entries, diagnostic }: EntriesProps) => {
  const hanldeColorIconHeart = (number: number) => {
    switch (number) {
      case 0:
        return <FavoriteSharpIcon color="success" />;
      case 1:
        return <FavoriteSharpIcon color="warning" />;
      case 2:
        return <FavoriteSharpIcon color="warning" />;
      case 3:
        return <FavoriteSharpIcon color="error" />;
      default:
        return <FavoriteSharpIcon />;
    }
  };

  return (
    <div>
      <h3>Entries</h3>
      <Stack spacing={2} direction="column">
        {entries.map((entry) => {
          switch (entry.type) {
            case 'HealthCheck':
              return (
                <StackEntries key={entry.id}>
                  <div>
                    {entry.date} <MedicalServicesIcon />
                  </div>
                  <div>
                    <em>{entry.description}</em>
                  </div>
                  <div>{hanldeColorIconHeart(entry.healthCheckRating)}</div>
                  <DiagnosisCodes
                    diagnosisCodes={entry.diagnosisCodes}
                    diagnosis={diagnostic}
                  />
                  <div>{entry.specialist}</div>
                </StackEntries>
              );
            case 'OccupationalHealthcare':
              return (
                <StackEntries key={entry.id}>
                  <div>
                    {entry.date} <WorkIcon /> {entry.employerName}
                  </div>
                  <div>
                    <em>{entry.description}</em>
                  </div>
                  {entry.sickLeave?.startDate && entry.sickLeave?.endDate ? (
                    <div>
                      Sick Leave:
                      <div>Start date: {entry.sickLeave?.startDate}</div>
                      <div>End date: {entry.sickLeave?.endDate}</div>
                    </div>
                  ) : null}
                  <DiagnosisCodes
                    diagnosisCodes={entry.diagnosisCodes}
                    diagnosis={diagnostic}
                  />
                  <div>diagnose by {entry.specialist}</div>
                </StackEntries>
              );
            case 'Hospital':
              return (
                <StackEntries key={entry.id}>
                  <div>
                    {entry.date} <LocalHospitalIcon />
                  </div>
                  <div>
                    <em>{entry.description}</em>
                  </div>
                  {entry.discharge.date && entry.discharge.criteria && (
                    <div>
                      Discharge:
                      <div>Date: {entry.discharge.date}</div>
                      <div>Criteria: {entry.discharge.criteria}</div>
                    </div>
                  )}
                  <DiagnosisCodes
                    diagnosisCodes={entry.diagnosisCodes}
                    diagnosis={diagnostic}
                  />
                  <div>diagnose by {entry.specialist}</div>
                </StackEntries>
              );
            default:
              return null;
          }
        })}
      </Stack>
    </div>
  );
};

export default EntriesList;
