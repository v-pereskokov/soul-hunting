const loginRegular: RegExp = /^[a-zA-Z](.[a-zA-Z0-9_-]*)$/;

const isLogin = (login: string) => {
  return loginRegular.test(login);
};

export default isLogin;
