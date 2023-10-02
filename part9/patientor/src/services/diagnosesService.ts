import data from '../../data/diagnoses';
import { DiagnosesEntry } from '../types';

const getAllDiagnoses = (): DiagnosesEntry[] => {
  return data;
};

export default {
  getAllDiagnoses,
};
