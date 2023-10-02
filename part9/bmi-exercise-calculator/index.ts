import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
const app = express();
app.use(express.json());
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (isNaN(Number(height)) || isNaN(Number(weight)))
    res.send({ error: 'malformatted parameters' });
  const bmi = calculateBmi(Number(height), Number(weight));

  res.send({
    weight,
    height,
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  const dailyExercises = daily_exercises as string[];
  const exercise: number[] = dailyExercises.map((arr: never): number =>
    Number(arr)
  );
  const checkExercise: number | undefined = exercise.find(
    (arr: never): boolean => isNaN(arr)
  );

  if (checkExercise || isNaN(Number(target))) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  const exerciseValue = exerciseCalculator(Number(target), exercise);

  return res.send(exerciseValue);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});
