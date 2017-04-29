import isFill from './isFill/isFill';
import isLogin from "./isLogin/isLogin";
import isEmail from "./isEmail/isEmail";
import isPassword from "./isPassword/isPassword";

const validate = values => {
  const errors = {};

  checkLogin(values.login, errors);

  checkEmail(values.email, errors);

  checkPassword1(values.password1, errors);

  if (values.password2) {
    checkPassword2(values.password2, errors);

    checkPasswords(values.password1, values.password2, errors);
  }

  return errors;
};

function checkLogin(login, errors) {
  if (isFill(login)) {
    errors.login = 'Required';
  } else if (!isLogin(login)) {
    errors.login = 'Input correct login';
  }
}

function checkEmail(email, errors) {
  if (isFill(email)) {
    errors.email = 'Required';
  } else if (!isEmail(email)) {
    errors.email = 'Input correct email';
  }
}

function checkPassword1(password, errors) {
  if (isFill(password)) {
    errors.password1 = 'Required';
  } else if (isPassword(password)) {
    errors.password1 = 'Input correct password';
  }
}

function checkPassword2(password, errors) {
  if (isFill(password)) {
    errors.password2 = 'Required';
  } else if (isPassword(password)) {
    errors.password2 = 'Input correct password';
  }
}

function checkPasswords(password1, password2, errors) {
  if (password1 && password2 && password1 !== password2) {
    errors.password2 = 'Passwords doesn\'t match' ;
  }
}

export default validate;
