import isFill from '../../../public/service/Validators/isFill/isFill.js';
import isLogin from '../../../public/service/Validators/isLogin/isLogin.js';
import isEmail from '../../../public/service/Validators/isEmail/isEmail.js';
import isPassword from '../../../public/service/Validators/isPassword/isPassword.js';

describe('Validator tests', () => {
  it('Field required', (done) => {
    expect(isFill('')).toEqual(true);
    done(true);
  });

  it('Field not required', (done) => {
    expect(isFill('word')).toEqual(false);
    done(true);
  });

  it('Incorrect login', (done) => {
    expect(isLogin('()word')).toEqual(false);
    done(true);
  });

  it('Correct login', (done) => {
    expect(isLogin('topUser')).toEqual(true);
    done(true);
  });

  it('Incorrect email', (done) => {
    expect(isEmail('user.ru')).toEqual(false);
    expect(isEmail('user@q.r')).toEqual(false);
    done(true);
  });

  it('Correct email', (done) => {
    expect(isEmail('user@mail.ru')).toEqual(true);
    done(true);
  });

  it('Incorrect password', (done) => {
    expect(isPassword('')).toEqual(true);
    expect(isPassword('a')).toEqual(true);
    expect(isPassword('qwerty')).toEqual(true);
    done(true);
  });

  it('Correct password', (done) => {
    expect(isPassword('qwertyqwerty')).toEqual(false);
    done(true);
  });
});
