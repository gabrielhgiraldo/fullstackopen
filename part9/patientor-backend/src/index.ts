import express from 'express'
const cors = require('cors')

import diagnosesRouter from './routes/diagnoses'
import patientsRouter from './routes/patients'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/diagnoses', diagnosesRouter)
app.use('/api/patients', patientsRouter)

app.get('/api/ping', (_req, resp) => {
    resp.send('pong')
});

const PORT = 3001
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})