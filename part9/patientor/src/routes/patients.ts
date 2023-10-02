import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientsEntry from '../utils';
import toNewEntry from '../utilsEntry';

const router = express.Router();

router.get('/', (_req, res) => {
  return res.send(patientsService.getAllPatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  return res.json(patientsService.getPatientById(id));
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientsEntry(req.body);
    const newPatient = patientsService.addPatients(newPatientEntry);
    return res.send(newPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id: string = req.params.id;
    const newEntriesEntry = toNewEntry(req.body);
    const newEntries = patientsService.addEntries(newEntriesEntry, id);
    return res.json(newEntries);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.status(400).send(errorMessage);
  }
});
export default router;
