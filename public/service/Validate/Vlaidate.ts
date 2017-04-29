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
