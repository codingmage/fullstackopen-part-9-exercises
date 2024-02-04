const calculateBmi = (height: number, kilos: number) => {
    const heightInMeters = height / 100;

    const squareHeight = heightInMeters ** 2;
    
    const bmi = kilos / squareHeight;

    // console.log(bmi)

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
}

console.log(calculateBmi(180, 74))