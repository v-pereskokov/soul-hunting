import isFill from './isFill/isFill';
import isLogin from "./isLogin/isLogin";
import isEmail from "./isEmail/isEmail";
import isPassword from "./isPassword/isPassword";

const validate = (values: any) => {
  const errors: any = {};

  checkLogin(values.login, errors);

  checkEmail(values.email, errors);

  checkPassword(values.password1, errors, 'password1');

  if (values.password2) {
    if (checkPassword(values.password2, errors, 'password2')) {
      checkPasswords(values.password1, values.password2, errors);
    }
  } else {
    errors.password2 = 'Required';
  }

  return errors;
};

function checkLogin(login: string, errors: any) {
  if (isFill(login)) {
    errors.login = 'Required';
  } else if (login.length < 2) {
    errors.login = 'So short login';
  } else if (login.length > 25) {
    errors.login = 'So long login';
  } else if (!isLogin(login)) {
    errors.login = 'Input correct login';
  }
}

function checkEmail(email: string, errors: any) {
  if (isFill(email)) {
    errors.email = 'Required';
  } else if (!isEmail(email)) {
    errors.email = 'Input correct email';
  }
}

function checkPassword(password: string, errors: any, type: string) {
  if (isFill(password)) {
    errors[type] = 'Required';
    return false;
  } else if (password.length > 30) {
    errors.login = 'So long password';
  } else if (isPassword(password)) {
    errors[type] = 'Input correct password';
    return false;
  }

  return true;
}

function checkPasswords(password1: string, password2: string, errors: any) {
  if (password1 && password2 && password1 !== password2) {
    errors.password2 = 'Passwords doesn\'t match' ;
  }
}

export default validate;
