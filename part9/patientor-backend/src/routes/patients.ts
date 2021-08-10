import express from 'express'
import patientService from '../services/patients'

const router = express.Router()

router.get('/', (_req, resp) => {
    resp.status(200).send(patientService.getAll())
})

export default router