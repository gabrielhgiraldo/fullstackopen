import express from 'express';
import { calculateBmi, validHeightWeight } from './bmiCalculator';
import { calculateExercises, validExerciseArguments } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, resp) => {
    resp.status(200).send('Hello Full Stack!');
});

app.get('/bmi', (req, resp) => {
    if (validHeightWeight(req.query.height, req.query.weight)) {
        const weight = Number(req.query.weight);
        const height = Number(req.query.height);

        const bmi = calculateBmi(weight, height);
        resp.status(200).json({
            weight,
            height,
            bmi
        });
    }
    else {
        resp
        .status(400)
        .json({
            error: "malformatted parameters"
        });
    }
});

app.post('/exercises', (req, resp) => {
    //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if(req.body.daily_exercises && req.body.target) {
        //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { target, daily_exercises } = req.body;
        if (validExerciseArguments(target, daily_exercises)) {
            const result = calculateExercises(Array(daily_exercises).map((val: string) => Number(val)), Number(target));
            resp.status(200).send(result);
        }
        else {
            resp.status(400).send({
                error: 'invalid parameters'
            });
        }
    }
    else {
        resp.status(400).json({
            error: 'missing parameters'
        });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});