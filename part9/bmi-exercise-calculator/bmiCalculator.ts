interface BMIValue {
  height: number;
  weight: number;
}

const parseArgumentsBMI = (arrArgs: string[]): BMIValue => {
  if (arrArgs.length < 4) throw new Error('Not enough arguments');
  if (arrArgs.length > 4) throw new Error('Too many arguments');

  const height = Number(arrArgs[2]);
  const weight = Number(arrArgs[3]);

  if (isNaN(height) || isNaN(weight))
    throw new Error('Provided values were not numbers!');

  return {
    height,
    weight,
  };
};

export const calculateBmi = (height: number, weight: number): string => {
  height = height / 100;
  const BMI = weight / (height * height);
  if (BMI < 16) return 'Underweight (Severe thinness) ';
  if (BMI >= 16 && BMI < 17) return 'Underweight (Moderate thinness) ';
  if (BMI >= 17 && BMI < 18.5) return 'Underweight (Mild thinness) ';
  if (BMI >= 18.5 && BMI < 25) return 'Normal (Healthy weight)';
  if (BMI >= 25 && BMI < 30) return 'Overweight (Pre-obese)';
  if (BMI >= 30 && BMI < 35) return 'Obese (Class I)';
  if (BMI >= 35 && BMI < 40) return 'Obese (Class II)';
  if (BMI >= 40) return 'Obese (Class III)';
  return 'undefined';
};

try {
  const { height, weight } = parseArgumentsBMI(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong : ';
  if (error instanceof Error) {
    errorMessage += errorMessage;
  }
  console.log(errorMessage);
}
