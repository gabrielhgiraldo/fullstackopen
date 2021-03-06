import express from 'express';
import patientService from '../services/patients';
import { toNewEntry, toNewPatient } from '../utils';

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

router.get('/:id', (req, resp) => {
    try {
        const patient = patientService.getPatient(req.params.id);
        resp.status(200).json(patient);
    }
    catch (error) {
        resp.status(404).send(error.message);
    }
});

router.post('/:id/entries', (req, resp) => {
    try {
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addPatientEntry(req.params.id, newEntry);
        resp.status(201).json(addedEntry);
    }
    catch (error) {
        resp.status(400).send(error.message);
    }
});

export default router;