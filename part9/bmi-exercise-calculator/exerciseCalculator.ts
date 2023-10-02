interface DataTraining {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValue {
  target: number;
  exercise: number[];
}

const parseArgumentsExercise = (arrArgs: string[]): ExerciseValue => {
  if (arrArgs.length < 4) throw new Error('Not enough arguments');

  const args = arrArgs.slice(2);
  const arrNumber = args.map((arr) => Number(arr));
  const check = arrNumber.find((arr) => isNaN(arr));
  if (check) throw new Error('Provided values were not numbers!');

  const [target] = arrNumber.slice(0, 1);
  const exercise = arrNumber.slice(1);
  return {
    target,
    exercise,
  };
};

const handleRating = (diff: number): number => {
  if (diff < 0.6) return 1;
  if (diff >= 0.7 && diff < 1) return 2;
  if (diff >= 1) return 3;
  return 0;
};

const handleDescription = (rating: number): string => {
  switch (rating) {
    case 1:
    case 0:
      return 'too bad, you have to exercise more n more';
    case 2:
      return 'not too bad but could be better';
    case 3:
      return 'thats good keep going n do better';
    default:
      return 'undefined';
  }
};

export const exerciseCalculator = (
  target: number,
  exercise: number[]
): DataTraining => {
  const totalHoursExercise = exercise.reduce((a, b) => a + b, 0);
  const totalHoursTarget = target * exercise.length;
  const differenceHours = totalHoursExercise / totalHoursTarget;
  const periodLength = exercise.length;
  const trainingDays = exercise.filter((e) => e).length;
  const success = totalHoursExercise >= totalHoursTarget;
  const rating = handleRating(differenceHours);
  const average = totalHoursExercise / exercise.length;
  const ratingDescription = handleDescription(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, exercise } = parseArgumentsExercise(process.argv);
  console.log(exerciseCalculator(target, exercise));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
