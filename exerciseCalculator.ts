interface ExerciseDetails {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (daily: number[], target: number) : ExerciseDetails => {

    const daysLength = daily.length;

    let validDays = 0;

    for(const day of daily) {
        if(day !== 0) {
            validDays++;
        }
    }
     //    for (let n = 0; n > daysLength; n++)

    const totalHours = daily.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const averageHours = totalHours / daysLength;

    let rating;

    let description;

    let success = false;

    if (averageHours < target) {
        if ((averageHours + 1) < target) {
            rating = 1;
            description = "You gotta pump up those numbers.";
        } else {
            rating = 2
            description = "not too bad but could be better";
        }
    } else {
        rating = 3
        description = "Target met! Yippee"
        success = true
    }

    let results = <ExerciseDetails>{
        periodLength: daysLength,
        rating,
        ratingDescription: description,
        success,
        target,
        trainingDays: validDays,
        average: averageHours
    };

    return results;
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))