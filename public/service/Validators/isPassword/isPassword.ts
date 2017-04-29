const passwordRegular = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

const isPassword = (password => {
  return password.length < 8 && !passwordRegular.test(password);
});

export default isPassword;
