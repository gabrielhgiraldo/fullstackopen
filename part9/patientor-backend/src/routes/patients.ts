import express from 'express'
import patientService from '../services/patients'

const router = express.Router()

router.get('/', (_req, resp) => {
    resp.status(200).send(patientService.getAll())
})

router.post('/', (req, resp) => {
    resp.status(201).send(patientService.addPatient(req.body))
})

export default router