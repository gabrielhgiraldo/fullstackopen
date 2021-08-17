import { Field, Form, Formik } from 'formik';
import moment from 'moment';
import React from 'react';
import { Button } from 'semantic-ui-react';
import { DiagnosisSelection, NumberField, SelectField, TextField, Option } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { EntryType, NewEntry } from '../types';
import { assertNever } from '../utils';

export type EntryFormValues = NewEntry;

type Props = {
    onSubmit: (values: EntryFormValues) => void,
    onCancel: () => void
};


const typeOptions: Option[] = [
    { value: EntryType.HealthCheck, label: EntryType.HealthCheck },
    { value: EntryType.Hospital, label: EntryType.Hospital },
    { value: EntryType.OccupationalHealthcare, label: EntryType.OccupationalHealthcare }
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();
  
    return (
      <Formik
      initialValues={{
          date: '',
          specialist: '',
          description: '',
          healthCheckRating: 0,
          diagnosisCodes:[],
          type:EntryType.HealthCheck
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const formatError = "Field is formatted incorrectly";

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errors: {[field: string]: any} = {};

        if (!values.date) {
            errors.date = requiredError;
        }
        else if (!moment(values.date, "MM-DD-YYYY", true).isValid()) {
            errors.date = formatError;
        }

        if (!values.specialist) {
            errors.specialist = requiredError;
        }
        if (!values.description) {
            errors.description = requiredError;
        }
        switch(values.type) {
            case EntryType.HealthCheck:
                if (values.healthCheckRating !== 0 && !values.healthCheckRating){
                    errors.healthCheckRating = requiredError;
                }
                break;
            case EntryType.Hospital:
                if (values.discharge) {
                    errors.discharge = {};
                    if (!values.discharge.date) {
                        errors.discharge.date = requiredError;
                    }
                    else if (!moment(values.discharge.date, "MM-DD-YYYY", true).isValid()) {
                        errors.discharge.date = formatError;
                    }

                    if (!values.discharge.criteria) {
                        errors.discharge.criteria = requiredError;
                    }
                    // necessary for isValid check to pass
                    if (Object.keys(errors.discharge).length === 0){
                        delete errors.discharge;
                    }
                }
                break;
            case EntryType.OccupationalHealthcare:
                if (!values.employerName) {
                    errors.employerName = requiredError;
                }

                if (values.sickLeave) {
                    errors.sickLeave = {};
                    if (values.sickLeave.endDate && !values.sickLeave.startDate) {
                        errors.sickLeave.startDate = requiredError;
                    }
                    else if (values.sickLeave.startDate && !moment(values.sickLeave.startDate, 'MM-DD-YYYY', true).isValid()) {
                        errors.sickLeave.startDate = formatError;
                    }

                    if (values.sickLeave.startDate && !values.sickLeave.endDate) {
                        errors.sickLeave.endDate = requiredError;
                    }
                    else if (values.sickLeave.endDate && !moment(values.sickLeave.endDate, 'MM-DD-YYYY', true).isValid()) {
                        errors.sickLeave.endDate = formatError;
                    }

                    if (Object.keys(errors.sickLeave).length === 0) {
                        delete errors.sickLeave;
                    }
                }
                break;
            default:
                assertNever(values);
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
  
        return (
          <Form className="form ui">
            <SelectField
                name="type"
                label="type"
                options={typeOptions}
            />
            <Field
                label="date"
                placeholder="mm-dd-yyyy"
                name="date"
                component={TextField}
            />
            <Field
                label="specialist"
                placeholder="specialist"
                name="specialist"
                component={TextField}
            />
            <Field
                label="description"
                placeholder="description"
                name="description"
                component={TextField}
            />
            {values.type === EntryType.HealthCheck && <Field
                name="healthCheckRating"
                label="health check rating"
                placeholder={0}
                component={NumberField}
                min={0}
                max={3}
            />}
            {values.type === EntryType.Hospital && <Field
                name="discharge.date"
                label="discharge date"
                placeholder="mm-dd-yyyy"
                component={TextField}
            />}
            {values.type === EntryType.Hospital && <Field
                name="discharge.criteria"
                label="discharge criteria"
                placeholder="criteria"
                component={TextField}
            />}
            {values.type === EntryType.OccupationalHealthcare && <Field
                name="employerName"
                label="employer name"
                placeholder="employer name"
                component={TextField}
            />}
            {values.type === EntryType.OccupationalHealthcare && <Field
                name="sickLeave.startDate"
                label="sick leave start"
                placeholder="mm/dd/yyyy"
                component={TextField}
            />}
            {values.type === EntryType.OccupationalHealthcare && <Field
                name="sickLeave.endDate"
                label="sick leave end"
                placeholder="mm/dd/yyyy"
                component={TextField}
            />}


            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            /> 
            <Button
                onClick={onCancel}
            >Cancel</Button>
            <Button
                disabled={!isValid || !dirty}
                type="submit"
            >Add</Button>
          </Form>
        );
      }}
    </Formik>
    );
  };

export default AddEntryForm;