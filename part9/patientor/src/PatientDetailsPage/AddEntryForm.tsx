import { Field, Form, Formik } from 'formik';
import moment from 'moment';
import React from 'react';
import { Button } from 'semantic-ui-react';
import { DiagnosisSelection, NumberField, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { EntryType, NewEntry } from '../types';
import { assertNever } from '../utils';

export type EntryFormValues = NewEntry;

type Props = {
    onSubmit: (values: EntryFormValues) => void,
    onCancel: () => void
};

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

        const errors: { [field: string]: string } = {};
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
                console.log("hospital");
                break;
            case EntryType.OccupationalHealthcare:
                console.log("occupationalHealthcare");
                break;
            default:
                assertNever(values);
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
  
        return (
          <Form className="form ui">
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
            <Field
                name="healthCheckRating"
                label="health check rating"
                placeholder={0}
                component={NumberField}
                min={0}
                max={3}
            />
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