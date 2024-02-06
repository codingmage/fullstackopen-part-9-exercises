import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { Arguments, calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
	res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {

	try {
		const height = Number(req.query.height);

		const weight = Number(req.query.weight);
    
		if (isNaN(height) || isNaN(weight) || !height || !weight) {
			throw new Error("malformatted parameters");
		}

		const bmi = calculateBmi(height, weight);

		res.json({ weight, height, bmi});
        
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log(error.message);
			res.status(400).json({error: error.message});
		}
	}
});

app.post("/exercises", (req, res) => {

	// if necessary: 
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument

	const {target, daily_exercises} = req.body as Arguments;

	if (!target || !daily_exercises) {
		return res.status(400).json({error: "missing parameters"});
	}

	if (isNaN(target) || !Array.isArray(daily_exercises)) {
		return res.status(400).json({error: "malformatted parameters"});
	}

	const result = calculateExercises(target, daily_exercises);

	return res.send({ result });
});

const PORT = 3002;

app.listen(PORT, () => {
	console.log(`Now running on port: ${PORT}`);
});