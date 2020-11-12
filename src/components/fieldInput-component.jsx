import React from "react";
import TextField from "@material-ui/core/TextField";
import { Field } from "redux-form";
import { email, required, maxLength15 } from "./helper";

const validate = (id) => {
  switch (id) {
    case "email":
      return [required, email];
    case "password":
      return [required, maxLength15];
    case "firstName":
      return [required, maxLength15];
    case "lastName":
      return [required, maxLength15];
    default:
      return null;
  }
};

const renderField = (props) => {
  const {
    meta: { touched, error, warning },
  } = props;
  return (
    <>
      {touched ? (
        error || warning ? (
          <TextField
            error={!(error === "Required")}
            helperText={error || warning}
            {...props}
            {...props.input}
          />
        ) : (
          <TextField {...props} {...props.input} />
        )
      ) : (
        <TextField {...props} {...props.input} />
      )}
    </>
  );
};

export default function FieldInput(props) {
  return (
    <Field {...props} component={renderField} validate={validate(props.id)} />
  );
}
