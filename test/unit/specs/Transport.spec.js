import transport from '../../../public/service/Transport/Transoprt.js';

describe('Api tests', () => {
  it('Logout error', (done) => {
    transport.post('/logout')
      .then(response => {
        expect(response.status).toEqual(401);
        done(true);
      });
  });

  it('Register conflict', (done) => {
    transport.post('/signup', JSON.stringify({
      'login': 'passan228',
      'email': 'robiqt2281@mail.ru',
      'password': 'qwertyqwerty'
    }))
      .then(response => {
        expect(response.status).toEqual(409);
        done(true);
      });
  });

  it('Sign In', (done) => {
    transport.post('/signin', JSON.stringify({
      'username': 'robiqt2281@mail.ru',
      'password': 'qwertyqwerty'
    }))
      .then(response => {
        expect(response.status).toEqual(200);
        done(true);
      });
  });

  it('Users', (done) => {
    transport.get('/users')
      .then(response => {
        expect(response.status).toEqual(200);
        done(true);
      });
  });
});
