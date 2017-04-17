import Block from '../Block/Block';
import userService from '../../services/UserService/UserService';
import formService from '../../services/FormService/FormService';
import viewService from '../../services/ViewService/ViewService';

import './Form.scss';
import template from './Form.tmpl.xml';

export default class Form extends Block {
  constructor(elements = {}) {
    super('div', {
      class: 'form__wrapper'
    });

    this._createForm(elements.data);
  }

  _createForm(elements) {
    this._getElement().innerHTML = template({
      title: elements.title,
      elements: elements.fields,
      control: elements.controls[0].text
    });

    this._submitButton(elements.controls[0].action);
    this._inputsFocusEvent(this._setFocus.bind(this));
  }

  _inputsFocusEvent(callback) {
    const form = this._getForm();

    this._getKeys(form).forEach(input => {
      callback(form[input]);
    });
  }

  _checkByButton(element) {
    const input = this._getInput(element);

    if (input) {
      const name = input.name;
      const value = input.value;

      const fill =
        formService.checkFill(value,
          this._getReadableNameByName(name)).response;

      this._validate(element, input, name, value, fill);
    }
  }

  _getForm() {
    return this.find('form').querySelector('ul').children;
  }

  _getInput(element) {
    return element.querySelector('input');
  }

  _setFocus(element) {
    const input = this._getInput(element);

    if (input) {
      input.onblur = (() => {
        const name = input.name;
        const value = input.value;

        this._checkForm(element, input, name, value);
      });

      input.onfocus = (() => {
        this._defaultError(element);
      });
    }
  }

  _checkForm(...info) {
    const [element, input, name, value] = info;

    const fill =
      formService.checkFill(value,
        this._getReadableNameByName(name)).response;

    this._validate(element, input, name, value, fill);
  }

  _validate(...settings) {
    const [element, input, name, value, isFill] = settings;

    if (isFill) {
      this._addError(element, isFill);
    } else {
      const checkName = this._checkByName(name, value).response;

      if (checkName) {
        this._addError(element, checkName);

        return;
      }

      if (name === 'password1') {
        this._checkPasswordsByFirst(element, input);
      }

      if (name === 'password2' &&
        !this._checkPasswordsByLast(element, input, value)) {

        return;
      }

      this._successCheck(element);
    }
  }

  _checkPasswordsByFirst(element, input) {
    const secondPassword = this._getNextPassword(element);

    if (secondPassword && secondPassword.classList.contains('error') &&
      formService.checkPasswords(input, secondPassword).response) {
      this._defaultError(secondPassword);
      this._addOK(secondPassword);

      return false;
    }

    return true;
  }

  _checkPasswordsByLast(element, value) {
    const firstPassword = this._getPreviousPassword(element).value;
    const compare = formService.checkPasswords(value.value, firstPassword).response;

    if (compare) {
      this._addError(element, compare);

      return false;
    }

    return true;
  }

  _successCheck(element) {
    this._addOK(element);
    this._letGoSubmit(this._getFormByList(element), element.parentNode.querySelectorAll('li'));
  }

  _checkAllForm() {
    const form = this._getForm();

    this._getKeys(form).forEach(input => {
      this._checkField(form[input]);
    });
  }

  _checkField(element) {

  }

  _getFormByList(element) {
    return element.parentNode.parentNode;
  }

  _addOK(element) {
    const span = element.querySelector('span');

    element.classList.remove('error');
    element.classList.add('ok');

    span.innerText = 'Excellent!';
  }

  _addError(element, errorText) {
    const span = element.querySelector('span');

    element.classList.add('error');
    span.classList.add('errorText');
    span.innerText = errorText;
  }

  _defaultError(element) {
    this._setErrorResponse(0);
    const span = element.querySelector('span');

    element.classList.remove('error');
    element.classList.remove('ok');

    span.classList.remove('errorText');
  }

  _checkByName(type, value) {
    switch (type) {
      case 'login':
        return formService.checkLogin(value);
      case 'email':
        return formService.checkEmail(value);
      case 'password1':
      case 'password2':
        return formService.checkPassword(value);
      default:
        return '';
    }
  }

  _getReadableNameByName(type) {
    switch (type) {
      case 'login':
        return 'Login';
      case 'email':
        return 'E-Mail';
      case 'password1':
      case 'password2':
        return 'Password';
      default:
        return '';

    }
  }

  _letGoSubmit(list) {
    for (let li of list) {
      if (li.classList.contains('error')) {
        return false;
      }
    }

    return true;
  }

  _submitButton(action) {
    const submit = this.find('.form-button');

    submit.addEventListener('click', event => {
      event.preventDefault();

      this._inputsFocusEvent(this._checkByButton.bind(this));

      this._send(event, action);
    });
  }

  _send(event, action) {
    if (this._letGoSubmit(this._getForm())) {
      formService.showPreLoader();

      this._submit(event, action)
        .then(response => {
          console.log(response);
          return +response.status;
        })
        .then(status => {
          const state = status === 200;

          userService.setState(state);
          state ? viewService.go('/') : this._setErrorResponse(status);
          formService.hidePreLoader();
        });
    }
  }

  _setErrorResponse(status) {
    this._writeError(this._getStringByErrorType(status));
  }

  _writeError(string) {
    const span = this.findAll('span')[2];

    span.innerHTML = string;
    span.style.display = 'block';
  }

  _getStringByErrorType(status) {
    switch (+status) {
      case 404:
        return 'User not found';
      case 409:
        return 'User already exist';
      default:
        return '';
    }
  }

  _submit(event, uri) {
    event.preventDefault();

    const data = this._getData();

    return formService.sendRequest(uri, this._getSendPack(uri, data));
  }

  _getSendPack(uri, data) {
    return uri === '/signin' ? this._signInPack(data) : this._signUpPack(data);
  }

  _signInPack(data) {
    return {
      'username': data.login,
      'password': data.password1
    };
  }

  _signUpPack(data) {
    return {
      'login': data.login,
      'email': data.email,
      'password': data.password1
    };
  }

  _getData() {
    const form = this.find('form').elements;
    const fields = {};

    this._getKeys(form).forEach(input => {
      const name = form[input].name;

      if (name) {
        fields[name] = form[input].value;
      }
    });
    return fields;
  }

  _getPreviousElement(input) {
    return input.previousElementSibling;
  }

  _getNextElement(input) {
    return input.nextElementSibling;
  }

  _getPreviousPassword(passwordInput) {
    const password = passwordInput.parentNode.children[2];
    return password ? password.querySelector('input') : null;
  }

  _getNextPassword(passwordInput) {
    const password = passwordInput.parentNode.children[3];
    return password ? password.querySelector('input') : null;
  }
}
