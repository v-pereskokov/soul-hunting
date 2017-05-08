import * as React from 'react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';

import {Button} from '../../components/Button/Button';
import {checkAuthentication, setCurrentUser} from '../../actions/User/User.actions';
import {setActive} from '../../actions/Buttons/Buttons.actions';
import {togglePreloader} from '../../actions/PreLoader/PreLoader.actions';

import './Home.scss';

const auth = localStorage.token;

const urls = auth ? [
  '/game',
  '/scoreboard',
  '/about'
] : [
  '/signin',
  '/signup'
];

// Error test:
// click enter -> esc -> don't work

class Home extends React.Component<void, void> {
  constructor() {
    super();

    this.setKeysButtons(auth ? 3 : 2);
  }

  componentWillMount() {
    this.props.checkAuth();
  }

  render() {
    const {isAuthenticated, device} = this.props;
    const buttons = this._setButtons(isAuthenticated);

    const buttonsRender = buttons.map((item, index) => {
      return (
        <Link to={ item.url } key={ index }>
          <Button
            text={ item.text }
            isActive={ item.isActive }
            mouseOver={ this.setActiveButton.bind(this, item.number) }
          />
        </Link>
      );
    });

    return (
      <div
        className={ isAuthenticated && device ?
          'wrapper__form1' :
          'wrapper__form' }>
        <div className={ isAuthenticated && device ?
          'wrapper__main__form1' :
          'wrapper__main__form' }>
          <div className='main__form'>
            { buttonsRender }
          </div>
        </div>
      </div>
    );
  }

  setKeysButtons(max) {
    document.addEventListener('keydown', event => {
      let current = +this.props.current;

      switch (event.keyCode) {
        case 13:
          browserHistory.push(urls[--current]);
          break;
        case 38:
          if (current === 1) {
            this.setActiveButton(max);
          } else {
            this.setActiveButton(--current);
          }
          break;
        case 40:
          if (current === max) {
            this.setActiveButton(1);
          } else {
            this.setActiveButton(++current);
          }
          break;
        default:
          break;
      }
    });
  }

  setActiveButton(number) {
    switch (+number) {
      case 1:
        this.props.setActive(true, false, false, number);
        break;
      case 2:
        this.props.setActive(false, true, false, number);
        break;
      case 3:
        this.props.setActive(false, false, true, number);
        break;
      default:
        break;
    }
  }

  _setButtons(auth) {
    return auth ? [
      {
        number: 1,
        text: 'GAME',
        url: '/game',
        isActive: this.props.button1
      },
      {
        number: 2,
        text: 'SCOREBOARD',
        url: '/scoreboard',
        isActive: this.props.button2
      },
      {
        number: 3,
        text: 'ABOUT',
        url: '/about',
        isActive: this.props.button3
      }
    ] : [
      {
        number: 1,
        text: 'SIGN IN',
        url: '/signin',
        isActive: this.props.button1
      },
      {
        number: 2,
        text: 'REGISTER',
        url: '/signup',
        isActive: this.props.button2
      }
    ];
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    current: state.buttons[0].current,
    button1: state.buttons[1].button,
    button2: state.buttons[2].button,
    button3: state.buttons[3].button,
    device: state.device
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setActive: (button1, button2, button3, current) => {
      dispatch(setActive(button1, button2, button3, current));
    },

    checkAuth: () => {
      dispatch(togglePreloader());

      checkAuthentication()
        .then(response => {
          return +response.status === 200 ? {
            data: response.json(),
            isLogin: true
          } : {
            isLogin: false
          };
        })
        .then(data => {
          if (data.isLogin) {
            data.data
              .then(user => {
                localStorage.setItem('token', user.login);
                dispatch(setCurrentUser(user.login));
                dispatch(togglePreloader());
              });
          } else {
            localStorage.removeItem('token');
            dispatch(setCurrentUser(''));
            dispatch(togglePreloader());
          }
        });
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
