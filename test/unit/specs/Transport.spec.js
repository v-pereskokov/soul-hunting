import transport from '../../../public/service/Transport/Transoprt.js';

describe('Api tests', () => {
  it('Ошибка при logout', (done) => {
    transport.post('/logout')
      .then(response => {
        expect(response.status).toEqual(401);
        done(true);
      });
  });

  it('Конфликт при регистрации', (done) => {
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

  it('Вход', (done) => {
    transport.post('/signin', JSON.stringify({
      'username': 'robiqt2281@mail.ru',
      'password': 'qwertyqwerty'
    }))
      .then(response => {
        expect(response.status).toEqual(200);
        done(true);
      });
  });

  it('Юзеры', (done) => {
    transport.get('/users')
      .then(response => {
        expect(response.status).toEqual(200);
        done(true);
      });
  });
});
