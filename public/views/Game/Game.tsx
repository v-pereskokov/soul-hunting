import * as React from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';

import {setActive} from '../../actions/Buttons/Buttons.actions';

import {Background} from '../../components/Background/Background';
import {Mobile} from '../Mobile/Mobile';
import {Button} from '../../components/Button/Button';
import {Back} from '../../components/Back/Back';

const urls = [
  '/game/singleplayer',
  '/game/singleplayer'
];

class Game extends React.Component<void, void> {
  constructor() {
    super();

    this.setKeysButtons(2);
  }

  render() {
    const {isAuthenticated, device} = this.props;

    const buttons = this._setButtons();

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
      <div>
        { !isAuthenticated ?
          browserHistory.push('/')
          : <div>
            { device ?
              <div>
                <Back path="/" />
                <div className='wrapper__form'>
                  <div className='wrapper__main__form'>
                    { buttonsRender }
                  </div>
                </div>
              </div> : <div className='wrapper__mobile'>
                <Background closed={ false }/>
                <Mobile />
              </div>
            }
          </div>
        }
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
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    current: state.buttons[0].current,
    button1: state.buttons[1].button,
    button2: state.buttons[2].button,
    device: state.device
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setActive: (button1, button2, button3, current) => {
      dispatch(setActive(button1, button2, button3, current));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
