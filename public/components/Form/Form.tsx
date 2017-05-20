import * as React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import {FormDescription} from './FormDescription/FormDescription';
import {FormHeader} from './FormHeader/FormHeader';
import {FormError} from './FormError/FormError';
import {FormInput} from './FormInput/FormInput';
import {FormLabel} from './FormLabel/FormLabel';
import {FormContent} from './FormContent/FormContent';
import FormButton from './FormButton/FormButton';
import validate from '../../service/Validators/index';
import {send, setError} from '../../actions/Form/Form.actions';
import {setCurrentUser} from '../../actions/User/User.actions';
import {togglePreloader} from '../../actions/PreLoader/PreLoader.actions';

import './Form.scss';

const errors: any = {};

interface Props {
  fields?: Array<any>;
  error?: string;
  control: string;
  submit?: any;
  type?: string;
  send?: (url: string, data: any) => any;
  handleSubmit?: any;
  name?: string;
  setError?: (error: string) => void;
}

class Form extends React.Component<Props, void> {
  _errors: any;
  _form: any;

  constructor() {
    super();

    this._errors = {};
    this._form = {};
  }

  render() {
    const {handleSubmit, fields, error, control}: any = this.props;

    const content: Array<any> = fields.map((item: any, index: number) => {
      return (
        <div key={ index }>
          <Field
            name={ item.name }
            names={ item.name }
            type={ item.type }
            component={ this._renderField }
            label={ item.title }
            description={ item.description }
            placeholder={ item.placeholder }
          />
        </div>
      )
    });

    return (
      <div className='form__wrapper-elements'>
        <div className='wrapper__form-center'>
          <FormHeader />
          <form
            className='form'
            name='form'
            ref={ (form: any) => {
              this._form = form
            }}
            onSubmit={handleSubmit}>
            <FormError text={ error }/>
            <FormContent content={ content }/>
            <FormButton text={ control } click={ this.submit.bind(this) }/>
          </form>
        </div>
      </div>
    );
  }

  submit() {
    if (this._isValid()) {
      const fields = this._getFields();
      const isSignIn = fields.length === 2;

      let data: any = isSignIn ?
        this._signInPack(fields) :
        this._signUpPack(fields);

      data = JSON.stringify(data);

      isSignIn ? this._send('/signin', data)
        : this._send('/signup', data);
    }
  }

  _send(url: string, data: any): any {
    return this.props.send(url, data);
  }

  _isValid() {
    for (let error of Object.values(errors)) {
      if (error) {
        return false;
      }
    }

    return true;
  }

  _renderField({
                 input, label, type,
                 description, placeholder, names,
                 meta: {
                   touched,
                   error
                 }
               }: any) {
    errors[names] = !!error;
    return (
      <li className={ (touched && error && 'error ') || (touched && !error && 'ok') }>
        <FormLabel title={ label }/>
        <FormInput
          name={ names }
          type={ type }
          input={ ...input }
          placeholder={ placeholder }
        />
        <FormDescription
          touched={ touched }
          description={ description }
          error={ error }
        />
      </li>
    );
  }

  _getFields() {
    return this._form.querySelectorAll('input');
  }

  _signInPack(data: any) {
    return {
      'username': data[0].value,
      'password': data[1].value
    };
  }

  _signUpPack(data: any) {
    return {
      'login': data[0].value,
      'email': data[1].value,
      'password': data[2].value
    };
  }
}

const ReduxForm: any = reduxForm({
  form: 'form',
  validate,
  onSubmit: () => {
  }
})(Form);

const mapStateToProps = (state: any) => {
  return {
    error: state.error
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setError: (error: string) => {
      dispatch(setError(error));
    },

    send: (url: string, data: any) => {
      dispatch(togglePreloader());

      send(url, data)
        .then((response: any) => {
          data = JSON.parse(data);
          data = data.username ? data.username : data.login;

          switch (+response.status) {
            case 200:
              dispatch(setError(''));
              localStorage.setItem('token', data);
              dispatch(setCurrentUser(data));
              browserHistory.push('/');
              break;
            case 403:
            case 404:
              dispatch(setError(response.statusText));
              break;
            default:
              break;
          }

          dispatch(togglePreloader());
        });
    }
  }
};

export default connect<{}, {}, Props>(mapStateToProps, mapDispatchToProps)(ReduxForm);
