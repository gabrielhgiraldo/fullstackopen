import express from 'express';
import patientService from '../services/patients';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, resp) => {
    resp.status(200).send(patientService.getAll());
});

router.post('/', (req, resp) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        resp.status(201).json(addedPatient);
    }
    catch (error){
        resp.status(400).send(error.message);
    }
});

export default router;