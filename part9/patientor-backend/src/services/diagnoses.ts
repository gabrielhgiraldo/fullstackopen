import diagnoses from "../../data/diagnoses";
import { Diagnosis } from "../types";

export const getAll = ():Array<Diagnosis> => {
    return diagnoses;
};

export default {
    getAll
};