import express from 'express'
import diagnosesService from '../services/diagnoses'

const router = express.Router()

router.get('/', (_req, resp) => {
    resp.status(200).send(diagnosesService.getAll())
})

export default router