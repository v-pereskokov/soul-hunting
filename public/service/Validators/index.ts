import isFill from './isFill/isFill';
import isLogin from "./isLogin/isLogin";
import isEmail from "./isEmail/isEmail";
import isPassword from "./isPassword/isPassword";

const validate = (values: any) => {
  const errors: any = {};

  checkLogin(values.login, errors);

  checkEmail(values.email, errors);

  checkPassword1(values.password1, errors);

  if (values.password2) {
    checkPassword2(values.password2, errors);

    checkPasswords(values.password1, values.password2, errors);
  }

  return errors;
};

function checkLogin(login: string, errors: any) {
  if (isFill(login)) {
    errors.login = 'Required';
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

function checkPassword1(password: string, errors: any) {
  if (isFill(password)) {
    errors.password1 = 'Required';
  } else if (isPassword(password)) {
    errors.password1 = 'Input correct password';
  }
}

function checkPassword2(password: string, errors: any) {
  if (isFill(password)) {
    errors.password2 = 'Required';
  } else if (isPassword(password)) {
    errors.password2 = 'Input correct password';
  }
}

function checkPasswords(password1: string, password2: string, errors: any) {
  if (password1 && password2 && password1 !== password2) {
    errors.password2 = 'Passwords doesn\'t match' ;
  }
}

export default validate;
