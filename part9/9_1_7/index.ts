import express from 'express'
import { calculateBmi, validHeightWeight } from './bmiCalculator'

const app = express()

app.get('/hello', (_req, resp) => {
    resp.send('Hello Full Stack!')
})

app.get('/bmi', (req, resp) => {
    if (validHeightWeight(req.query.height, req.query.weight)) {
        const weight = Number(req.query.weight)
        const height = Number(req.query.height)
        
        const bmi = calculateBmi(weight, height)
        resp.json({
            weight,
            height,
            bmi
        })
    }
    else {
        resp
        .status(400)
        .json({
            error: "malformatted parameters"
        })
    }
})

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})