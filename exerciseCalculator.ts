interface ExerciseDetails {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export interface Arguments {
    target: number,
    daily_exercises: number[],
}

const selectNumbers = (args: string[])  : Arguments  => {
	if (args.length < 4) throw new Error("Please provide your training hours and your target goal.");

	if (!isNaN(Number(args[2]))) {
        
		const goal = Number(args[2]);

		const hours = [];
    
		for (let i = 3; i < args.length; i++) {
			if (!isNaN(Number(args[i]))) {
				hours.push(Number(args[i]));
			} else {
				throw new Error("Hours must be numbers");
			}            
		}
    
		return {target: goal, daily_exercises: hours};

	} else {
		throw new Error("Provided target must be a number!");
	}
};

export const calculateExercises = (target: number, daily: number[]) : ExerciseDetails => {

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
		if ((averageHours + 0.5) < target) {
			rating = 1;
			description = "You gotta pump up those numbers.";
		} else {
			rating = 2;
			description = "not too bad but could be better";
		}
	} else {
		rating = 3;
		description = "Target met! Yippee!";
		success = true;
	}

	const results = <ExerciseDetails>{
		periodLength: daysLength,
		rating,
		ratingDescription: description,
		success,
		target,
		trainingDays: validDays,
		average: averageHours
	};

	return results;
};

try {
	const {target, daily_exercises} = selectNumbers(process.argv);
	console.log(calculateExercises(target, daily_exercises));
    
} catch (error: unknown) {
	let errorMessage = "Something bad happened.";
	if (error instanceof Error) {
		errorMessage += " Error: " + error.message;
	}
	console.log(errorMessage);
}

/* console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1], ))

console.log(selectNumbers(process.argv)) */