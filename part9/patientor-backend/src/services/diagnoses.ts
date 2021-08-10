import diagnoses from "../../data/diagnoses";
import { Diagnoses } from "../types";

export const getAll = ():Array<Diagnoses> => {
    return diagnoses;
};

export default {
    getAll
};