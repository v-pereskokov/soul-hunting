import * as React from 'react';
import {Link} from 'react-router'
import {Field, reduxForm} from 'redux-form';

import {Button} from "../Button/Button";
import {FormDescription} from "./FormDescription/FormDescription";
import {FormHeader} from "./FormHeader/FormHeader";
import {FormError} from "./FormError/FormError";
import {FormInput} from "./FormInput/FormInput";
import {FormLabel} from "./FormLabel/FormLabel";
import {FormContent} from "./FormContent/FormContent";

import './Form.scss';

interface Props {
  fields?: Array<any>;
  error?: string;
  control: string;
  submit: any;
  type?: string;
}

const renderField = (
  { input, label, type, description,
    meta: {
    asyncValidating,
      touched,
      error
  }},
) => (
    <li className={ touched && error && 'error' }>
      <FormLabel title={ label }/>
      <FormInput
        name={ name }
        type={ type }
        input={ ...input }
      />
      <FormDescription
        touched={ touched }
        description={ description }
        error={ error }
      />
    </li>
);

class Form extends React.Component<Props, void> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {handleSubmit, fields, error, control} = this.props;

    const content = fields.map((item, index) => {
      return (
        <div key={ index }>
          <Field
            name={ item.name }
            type={ item.type }
            component={renderField}
            label={ item.title }
            description={ item.description }
          />
        </div>
      )
    });

    return (
      <div className="form__wrapper-elements">
        <div className="wrapper__form-center">
          <FormHeader />
          <form
            className="form"
            name="{data.title}"
            ref={ (form) => {
              this.form = form
            }}
            onSubmit={handleSubmit}
          >
            <FormError text={ error }/>
            <FormContent content={ content }/>
            <Button text={ control } isActive={ true }/>
          </form>
        </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.login) {
    errors.login = 'Required';
  }
  if (!values.password1) {
    errors.password1 = 'Required';
  }
  if (!values.password2) {
    errors.password2 = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  return errors;
};

export default validate;


export default reduxForm({
  form: 'asyncValidation',
  validate
})(Form);
