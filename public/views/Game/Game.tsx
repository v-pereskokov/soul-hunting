import * as React from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';

import {setActive} from '../../actions/Buttons/Buttons.actions';

import Background from '../../components/Background/Background';
import {Mobile} from '../Mobile/Mobile';
import {Button} from '../../components/Button/Button';
import {Back} from '../../components/Back/Back';
import {setScore} from '../../actions/User/User.actions';

import './Game.scss';

const urls = [
  '/game/singleplayer',
  '/game/singleplayer'
];

interface Props {
  isAuthenticated: boolean;
  user?: string;
  device: boolean;
  setActive: (button1: any, button2: any, button3: any, current: any) => void;
  button1: boolean;
  button2: boolean;
  button3?: boolean;
  current: boolean;
}

class Game extends React.Component<Props, any> {
  constructor() {
    super();

    this.setKeysButtons(2);
  }

  componentWillMount() {
    if (!this.props.isAuthenticated) {
      browserHistory.push('/');
    }

    this._sendScoreToBack();
  }

  render() {
    const {device} = this.props;

    const buttons: Array<any> = this._setButtons();

    const buttonsRender: Array<any> = buttons.map((item, index) => {
      return (
        <div key={index}>
          <Button
            text={ item.text }
            isActive={ item.isActive }
            mouseOver={ this.setActiveButton.bind(this, item.number) }
            pathTo={item.url}/>
        </div>
      );
    });

    return (
      <div>
        { device ?
          <div>
            <Back path="/"/>
            <div className='wrapper__form'>
              <div className='wrapper__main__form'>
                { buttonsRender }
              </div>
            </div>
          </div> :
          <div className='wrapper__mobile'>
            <Background closed={ false }/>
            <Mobile />
          </div>
        }
      </div>
    );
  }

  setKeysButtons(max: number) {
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
      default:
        break;
    }
  }

  _setButtons() {
    return [
      {
        number: 1,
        text: 'SINGLEPLAYER',
        url: '/game/singleplayer',
        isActive: this.props.button1
      },
      {
        number: 2,
        text: 'MULTIPLAYER',
        url: '/game/MULTIPLAYER',
        isActive: this.props.button2
      },
    ]
  }

  _sendScoreToBack() {
    const userData: string = localStorage.getItem('singlePlayerScore');
    if (userData) {
      const {user} = this.props;

      if (userData) {
        setScore(JSON.stringify({
          login: user,
          sScore: userData
        }));

        localStorage.removeItem('singlePlayerScore');
      }
    }
  }
}

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    user: state.authentication.user,
    current: state.buttons[0].current,
    button1: state.buttons[1].button,
    button2: state.buttons[2].button,
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
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game as any);
