interface PersonDetails {
    height: number
    kilos: number
}

const selectValues = (args: string[]) : PersonDetails => {
    if (args.length < 4) throw new Error('Please provide your details');
    if (args.length > 4) throw new Error('Please input only your height and weight');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
          height: Number(args[2]),
          kilos: Number(args[3])
        }
      } else {
        throw new Error('Provided values were not numbers!');
      }
}

export const calculateBmi = (height: number, kilos: number) : string => {
    const heightInMeters = height / 100;

    const squareHeight = heightInMeters ** 2;
    
    const bmi = kilos / squareHeight;

    switch (true) {
        case (bmi < 18.5):
            return "Not healthy (underweight)";
        case (bmi >= 18.5 && bmi <= 24.9):
            return "Normal (healthy weight)";
        case (bmi >= 25 && bmi <= 29.9):
            return "Not healhty (overweight)";
        case (bmi >= 30):
            return "Not health (obese)";
    }

    return "Unable to calculate BMI"
}

try {
    const { height, kilos } = selectValues(process.argv);
    console.log(calculateBmi(height, kilos));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }