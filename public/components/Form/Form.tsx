import * as React from 'react';
import { Link } from 'react-router'

import './Form.scss';
import {Button} from "../Button/Button";
import {FormDescription} from "./FormDescription/FormDescription";
import {FormHeader} from "./FormHeader/FormHeader";
import {FormError} from "./FormError/FormError";
import {FormInput} from "./FormInput/FormInput";
import {FormLabel} from "./FormLabel/FormLabel";
import {FormContent} from "./FormContent/FormContent";

interface Props {
  fields?: Array<any>;
  error?: string;
  control: string;
  submit: any;
  type?: string;
}

export class Form extends React.Component<Props, void> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { fields, error, control, type, submit } = this.props;

    const content = fields.map((item, index) => {
      return (
        <li key={index}>
          <FormLabel title={ item.title }/>
          <FormInput
            name={ item.name }
            type={ item.type }
            placeholder={ item.placeholder }
          />
          <FormDescription text={ item.description }/>
        </li>
      )
    });

    return (
      <div className="form__wrapper-elements">
        <div className="wrapper__form-center">
          <FormHeader />
          <form className="form" name="{data.title}" onSubmit={ submit }>
            <FormError text={ error }/>
            <FormContent content={ content }/>
            <Button text={ control } isActive={ true } type={ type }/>
            <button type="submit">tooooop</button>
          </form>
        </div>
      </div>
    );
  }
}
