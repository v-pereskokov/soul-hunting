const passwordRegular: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

const isPassword = (password: string) => {
  return password.length < 8 && !passwordRegular.test(password);
};

export default isPassword;
