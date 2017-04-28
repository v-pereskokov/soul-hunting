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
  { input, label, type, meta: { asyncValidating, touched, error } },
) => (
    <li>
      <FormLabel title={ label }/>
      <FormInput
        name={ name }
        type={ type }
        input={ ...input }
      />
      <FormDescription
        touched={ touched }
        description={ 'hey' }
        error={ error }/>
    </li>
  // <div>
  //   <label>{label}</label>
  //   { console.log(touched) }
  //   <div className={asyncValidating ? 'async-validating' : ''}>
  //     <input {...input} type={type} placeholder={label} />
  //     {touched && error && <span>{error}</span>}
  //   </div>
  // </div>
);

class Form extends React.Component<Props, void> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {handleSubmit, fields, error, control} = this.props;

    const content = fields.map((item, index) => {
      return (
        <li key={index}>
          <FormLabel title={ item.title }/>
          <FormInput
            name={ item.name }
            type={ item.type }
            placeholder={ item.placeholder }
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
          <FormDescription text={ item.description }/>
        </li>
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
            {/*<FormContent content={ top }/>*/}
            <Field
              name="login"
              type="text"
              component={renderField}
              label="Login"
            />
            <Field
              name="password"
              type="password"
              component={renderField}
              label="Password"
            />
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
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.username) {
    errors.username = 'Required';
  }
  return errors;
};

export default validate;


export default reduxForm({
  form: 'asyncValidation',
  validate
})(Form);
