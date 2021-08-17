import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button } from 'semantic-ui-react';
import { DiagnosisSelection, NumberField, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { EntryType, NewEntry } from '../types';

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
          date: (new Date()).toLocaleDateString(),
          specialist: '',
          description: '',
          healthCheckRating: 0,
          diagnosisCodes:[],
          type:EntryType.HealthCheck
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.specialist) {
            errors.specialist = requiredError;
        }
        if (!values.description) {
            errors.description = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
  
        return (
          <Form className="form ui">
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