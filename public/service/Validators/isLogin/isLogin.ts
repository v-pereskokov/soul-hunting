const loginRegular = /^[a-zA-Z](.[a-zA-Z0-9_-]*)$/;

const isLogin = (login => {
  return loginRegular.test(login);
});

export default isLogin;
