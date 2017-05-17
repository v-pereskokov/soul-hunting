import * as React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import {Button} from '../../components/Button/Button';
import {checkAuthentication, setCurrentUser} from '../../actions/User/User.actions';
import {setActive} from '../../actions/Buttons/Buttons.actions';
import {togglePreloader} from '../../actions/PreLoader/PreLoader.actions';

import * as style from './Home.scss';

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

interface Props {
  isAuthenticated: boolean;
  device: boolean;
  setActive: (button1: any, button2: any, button3: any, current: any) => void;
  button1: boolean;
  button2: boolean;
  button3?: boolean;
  current: boolean;
  checkAuth: () => void;
}

class Home extends React.Component<Props, void> {
  constructor() {
    super();

    this.setKeysButtons(auth ? 3 : 2);
  }

  componentWillMount() {
    this.props.checkAuth();
  }

  render() {
    const {isAuthenticated, device}: any = this.props;
    const buttons: Array<any> = this._setButtons(isAuthenticated);

    const buttonsRender: any = buttons.map((item, index) => {
      return (
        <div key={ index }>
          <Button
            text={ item.text }
            isActive={ item.isActive }
            mouseOver={ this.setActiveButton.bind(this, item.number) }
            pathTo={item.url}/>
        </div>
      );
    });

    return (
      <div
        className={ isAuthenticated && device ?
          style.wrapper__form1 :
          style.wrapper__form }>
        <div className={ isAuthenticated && device ?
          style.wrapper__main__form1 :
          style.wrapper__main__form }>
          <div className={style.main__form}>
            { buttonsRender }
          </div>
        </div>
      </div>
    );
  }

  setKeysButtons(max: any) {
    document.addEventListener('keydown', (event: any) => {
      let current: number = +this.props.current;

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

  setActiveButton(number: number) {
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

  _setButtons(auth: boolean) {
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

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    current: state.buttons[0].current,
    button1: state.buttons[1].button,
    button2: state.buttons[2].button,
    button3: state.buttons[3].button,
    device: state.device
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setActive: (button1: boolean,
                button2: boolean,
                button3: boolean,
                current: boolean) => {
      dispatch(setActive(button1, button2, button3, current));
    },

    checkAuth: () => {
      dispatch(togglePreloader());

      checkAuthentication()
        .then((response: any) => {
          return +response.status === 200 ? {
            data: response.json(),
            isLogin: true
          } : {
            isLogin: false
          };
        })
        .then((data: any) => {
          if (data.isLogin) {
            data.data
              .then((user: any) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Home as any);
