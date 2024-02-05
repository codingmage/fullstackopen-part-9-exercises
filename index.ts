import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack");
})

app.get('/bmi', (req, res) => {

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
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Now running on port: ${PORT}`)
})